# Pods: running containers in Kubernetes
Why do we need pods?
- **Running multiple containers is better** than running a container with multiple processes.

If the latter, we have to manually handle every single process inside the containers,
and each of which are possibly indistinguishable when logging out outputs.

=> each process in its own container.

- Network: same (because same Linux namespace and UTS) => same hostname and network interface.
- Filesystem: internal for containers => connected through volume

Consequences of same network namespace? IP address, port space, and loopback network interface(same localhost) are shared.

## FLAT INTER-POD NETWORK
Each pod is accessible to all other pods via its IP address, regardless of its association with nodes (flat network).

Unless there is a specific reason, run containers in separate pods.

## Creating pods from YAML or JSON descriptors
- `kubectl get po <pod_name> -o yaml` => log YAML on the terminal.
- `kubectl get po <pod_name> -o json`
- First there is Kubenertes API version, then there is its `kind` (e.g, Pod), then (always 3 main sections)
    - *Metadata*: name, namespace, label and other options of `kind`
    - *Spec*: the contents of `kind`. For Pod, its containers, volumes and other data.
    - *Status*: the status of `kind` and its *spec*. Namely, the state of the pod, its containers, pod internal IP and other info.
    (when create, no need!)
- Ports in Pod is purely information, since its default port is bound to 0.0.0.0
- `kubectl explain <API_Object>` => get manual explanation (e.g, `kubectl explain pods`, `kubectl explain pods.spec`, etc...)
- `kubectl create -f <yaml/json file>` => create a resource from YAML/JSON file.
- `docker logs <container_id>` => retrieving log files from docker container
- `kubectl logs <pod_name>` => retrieving pod's log (i.e, container's log for `kubectl logs kubia-manual`)
- 