# Codes + its results in the text.

- `docker run busybox echo "I AM THE KING!"`

`
Unable to find image 'busybox:latest' locally
latest: Pulling from library/busybox
b71f96345d44: Pull complete 
Digest: sha256:0f354ec1728d9ff32edcd7d1b8bbdfc798277ad36120dc3dc683be44524c8b60
Status: Downloaded newer image for busybox:latest
I AM THE KING!
`

`busybox` is one time executable with many UNIX-like commands.

- `docker run <image>/<image>:<tag>`

- `docker build -t kubia .`

- `docker images`

- `docker run --name kubia-container -p 8080:8080 -d kubia`
    - Docker Deamon is not in the localhost if OS is not Linux-based (Mac OS, Windows)
    => DOCKER_HOST (hostname or IP of the VM running Deamon): need to connect it to Docker client.
    - Port 8080 from the local machine will be mapped to port 8080 inside the container.

- `curl <url>` => check if the response from that url. (see the ID of the Docker Container in this case)

- `docker ps`: listing basic info of all running containers.

- `docker inspect <container_name>`: returns JSON of low-level info about the container.

- `docker exec -it kubia-container bash`: running bash inside container environment
    - `-i`: STDIN is kept open (for entering commands into the shell)
    - `-t`: allocates a pseudo terminal (TTY)
    - Notice that a process is running both in a container and on its host OS, yet its PID
    is difference in each because of the container having its own Linux Namespace.
    - Similarly, the filesystem is isolated.

- `docker stop <container_name>`, `docker ps -a`, `docker rm <container_name>`

- `docker tag <old_tag_name> <new_tag_name>`: creates a new image tag pointing to the same image ID.

- `docker login`, `docker push <image_name>`(Docker hub namerule: dockerID/image_name), `docker pull <image_name>`

## Kubernetes

### Minikube

### GKE (installing)

- Install GKE
- `gcloud components install kubectl`
- Creating a cluster with 3 nodes: `gcloud container clusters create <cluster_name> --num-nodes 3
--machine-type e2-standard-2 --region europe-north1-a`
- `gcloud container clusters delete <cluster_name>`
- `gcloud config set compute/region europe-north1-a`
- `gcloud config list compute/region`

`[]` :== optional

- `kubectl get [nodes]`: list all of the nodes (worker) (`kubectl get` is used a lot).
- `kubectl compute ssh <worker_node_name>`: to login one of the worker nodes and see what is in it.
- `kubectl describe node [<node_name>]`: describe the node in details.

### Some tips
- Put `alias k=kubectl` inside `~/.bashrc`
- Install `bash-completion` package then `source <(kubectl completion bash | sed s/kubectl/k/g)`

- `kubectl create deployment kubia --image=011092295y/kubia --port=8080` (`--generator=run/v1` is deprecated, has no effect and will be removed)
=> pod/kubia created.

### Pods
- Uses concept of multiple co-located containers.
- A pod is a group of one or multiple tightly-related containers running together on the same worker node
and sharing the same Linux namespace(s).
- `kubectl get pods`
- `kubectl describe pods`
-  The process of creating a pod (`pod/kubia`):
    - `k create deployment...` creating a new ReplicationController through the API server.
    - This ReplicationController orders a new pod.
    - The Scheduler receives this information via API server and schedules a new pod to a worker node.
    - Kubelet (inside the pod) saw this (via API server) and instructed Docker to pull its image from DockerHub.
    - Docker runs its container.

### Acessing web application
- Abbreviation: `services=svc, pods=po, replicationset=rs, ...`
- Objects: `Pods, Nodes, Services`
- Pods IP are internal to its cluster and needs a Service Object to connect. (e.g, `--type=LoadBalancer`)
- `kubectl expose deployment kubia --type=LoadBalancer --name=kubia-http`
- `kubectl get svc`

### Logical view of the system
- Incoming ---> (8080) Service ---> (8080) Pod ---> ReplicationController:kubia, replicas=1

### Scaling horizontally
- `k scale deployment kubia --replicas=3`
- `k get rs`

### Which nodes pods are allocated?
- Isn't important
- `k get po -o wide`

### Dashboard link
(deprecated, substituted by GKE console.)

=> always static IP thanks to Services.