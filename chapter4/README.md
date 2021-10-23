## Replication and other controllers: deploying
## managed pods.

- Never create pods directly; instead, creating other services: Replication Controllers/Deployments
- Kubernetes can manage pods, not just nodes (unmanaged pods).

## Keeping pods healthy

- Kubernetes monitors main process. If the main process breaks, Kubernetes restarts the app.
- However, app stops working without process crashes (e.g, memory leaks,...). Stopping
the process when the error is caught may not be enough since many "errors" are not easily caught(e.g, looping/deadlock).

=> Need outside process.

### Liveness probes
- An *HTTP GET* probe => container's IP address, a port and path. (2xx,3xx vs 4xx, 5xx)
    - To see why previous container terminated, `kubectl logs <pod_name> --previous`
    - Exit code: `128+x`; `128` is an external signal, `x` is the signal in question.
    (e.g, `137=128+9`, `9` is SIGKILL)
    - A container is killed (=> completely new created) !== a container is restarted.
- A *TCP Socket* probe => establish TCP connection to container's port.
- An *Exec* probe executes arbitrary commands inside the container
and checks its exit status code.

### Creating effective liveness probes
- Checking critical components, not affected by an external factor (e.g, checking web server internals, not database failure).
- Keeping probles light.
- Don't bother loops for probes.

### To manage pods, independent of Kubelet (should nodes fail), we need ReplicationControllers (ReplicationState)

## ReplicationControllers(RC)
- ReplicationController is a K8s resource to ensure that pods are always kept running,
both in availability and in quantity of a "type"(i.e, label selector).
- ReplicationController has 3 essential parts:
    - A *label selector*: What pods are in RC's scope
    - A *replica count*: The number of pods running
    - A *pod template*: Used for creating **new** pod replicas
- RC provides these features:
    - Ensures quantity of pods.
    - Ensures availability of pods should a node fails.
    - Ensures scaling horizontally.
- *Pod Selector is required in RS(RC) setup.*

We test the role of RS by shutting off its node.
- To disconnect the node, `gcloud compute ssh <node_name>` then `sudo ifconfig eth0 down`.
- To reset the node, `gcloud compute instances reset <node_name>`.

### Moving pods in and out of the scope of RS
- Use labels, changing them.

*TIPS*: A pod controlled by a RS can realize its RS with `metadata.ownerReferences`

### Removing pods from RS
- Use this to easily interact with specific pods, then delete it.

### Changing RS's label selector
- Question: What would happen if we change the RS's label selector?
- My answer: RS will create `x` brand-new pods infinitely since the 3 new pods
created did not have a specific label. But then API server should have reported an error
due to mistach configurations.
- The book's answer: 3 new pods will be created.
- Never change its label selector, even though it's possible, but its template can be changed.

### Changing the pod template
- Edit RS: `kubectl edit rs <rs_name>`
- Can be used to upgrade new pods.
- `export KUBE_EDITOR='your_editor_location'` in `./bashrc` to change the editor.

### Scaling pods horizontally
- `kubectl scale rs <rs_name> --replicas=x` where `x is in N`.
- Or `kubectl edit rs <rs_name>`.
- The latter is called `declarative` approach, and it's less error-prone.
- `kubectl delete rs <rs_name> --cascade=false` to prevent deletion of pods.

## ReplicationSets
- Is an upgraded version of ReplcationControllers, making RC oudated.
- vs RC: has more expansive pods selector (multiple selector, label exists, etc...)

## DaemonSets (one pod on each and every node)
- Example 1: running infra-related pods that perform system-level operations, e.g,
a log-collector and a resource monitor on every node.
- Example 2: kube-proxy on all nodes to make services work (network).

### DeamonSet to run a pod on every node.
- Setup much like RS; however, it doesn't need replicas.(skipped Kubernetes Scheduler => bypass unscheduled nodes)
- When node goes down, it doesn't replace pods.
- Deamon Set makes sure that every node has a pod running.

### DeamonSet to run pods on a subset of nodes.
- Using `nodeSelector` property in the pod template.
- `k get ds`