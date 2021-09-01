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
- `kubectl logs <pod_name> -c <container_name>` => logs for multiple container inside a pod (logs centralized and saved after pods deleted in ch17), 
like `kubectl logs kubia-name -c kubia`

## Sending requests to pod (post-forward) for testing and debugging
- Another way is services (already in chapter 2)
- `kubectl post-forward <pod_name> 8888:8080` (e.g, `kubectl post-forward kubia-manual 8888:8080`) => try `curl localhost:8888`
- curl -> (8888)kubectl post-forward -------> (8080)Pod

## The need for grouping pods
- Using `labels`.
- A `label` is an arbitrary, non-unique key:value pair attached to a resource,
which is then utilized when selecting resources using *label selectors*.
- Even though *label* isn't unique, its key is.
- `kubectl get po <pod_name> --show-labels` => output labels for each pod.
- Interested in certain labels ? `kubectl get po -L key1,key2,...` e.g, `kubectl get po -L creation_method,env`

## Modifying labels of existing pods
- Adding labels to exisitng pods: `kubectl label po <pod_name> key=value`
- Modifying: `kubectl label po <pod_name> key=value --overwrite`

## Listing subsets of pods through LABEL SELECTORS
- *Label selectors* allows one to select a subset of pods tagged with certain labels
and perform an operation on those pods. Its criteria bases on whether the resource contains:
    - Key
    - Key=Value
    - Key!=Value
- `kubectl get po -l creation_method=manual`
- `kubectl get po -l env`
- `kubectl get po -l '!env'`
- `kubectl get po -l creation_method!=manual`
- `kubectl get po -l 'env in (prod,debug,devel)'` (env is one of prod, debug or devel,etc...)
- `kubectl get po -l 'env notin (prod,debug,devel)'`
- **Multiple selectors**: needs to be separated by `,`. Resources need to match all of them to
match the selector, e.g, `kubectl get po -l creation_method=manual,env!=debug`
- This shows that groups can be overlapped.

## Using labels and selectors to constrain pod scheduling
- Some situations require some pods to be scheduled to some specific nodes.
- Using `label` to achieve this.
- `kubectl label node <node_name> gpu=true`
- `kubectl get nodes -l gpu=true`, `kubectl get nodes -L gpu`, etc...
- Example: When assigning a pod to a node with label `gpu=true`, add
`nodeSelector` property in `spec` in the yaml file. (`nodeSelector: gpu: "true"`)

## Annotations
- They are also key-value pairs, but it's not the same use as labels.
- Used mainly by tools for larger pieces of information.
- To see them, use `k get po <po_name> -o yaml` or `k describe`
- **They are deprecated in v1.9, so no longer be seen in yaml be default.**

## Adding annotations
- `k annotate pod <pod_name> dishwasher92.com/testingpod="Testing annotations on K8s pods"`
- Then `k describe po <pod_name>`

## Using namespaces to group resources
- If we want to group resources into non-overlapping groups, use namespaces.
- Separating groups enables the use of the same resources across different
environment (multi-tenant environment, e.g, QA, Development, Production,etc...).
- Providing scopes for naming resources.
- A few resouces are not namespaced, e.g, the Node resource.
- List all namespaces: `kubectl get ns`
- Normally, `k get po` default to `default` namespace, but now...
- `k get po --namespace kube-system` === `k get po -n kube-system`
=> Allow to restrict access to resources and even to limit computational resources available
to individual users.

### Namespace is a resource
- Hence, createable.
- `k create namespace <namespace_name>`
- To create resource into a namespace, `k create -f <yaml_file> -n <namespace_name>`
- To quickly switch namespaces,
    - `alias kcd='kubectl config set-context $(kubectl config current-context) --namespace '` in `~/.bashrc`
- Note that namespaces separate resouces, but they do isolate running resouces, e.g,
pods in namespace A can connect to pods in namespace B

## Stopping and removing pods.
- 