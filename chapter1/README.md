# Some notes

## Mechanism for isolation of containers
- *Linux Namespaces*
    - Making processes think as if it is using its own machine.
    
    The following namespaces exist:
    - Mount (mnt)
    - Process ID (pid)
    - Network (net)
    - Inter-process communication (ipc)
    - UTS
    - User ID (user)
- *Linux Control Groups*(cgroups)
    - Limiting the resources a process can access.

## Docker
- Images
- Registries
- Containers

## Image layers
- Distribution more efficient.
- Reduce storage footprint of images.

## Portability limitation of container images
- Kernel modules/Kernel version requirements.
- Same architecture is needed for containerized applications.

## rkt
- Docker is a part of Open Container Initiative (OCI), as is *rkt*.
- Also a Linux container engine.
- It puts a strong emphasis on security, composability and conforming to open container standards =>
capable of running Docker-based images.

# Kubernetes

- Acting as OS for the clusters.
- Abstract the infrastructure-related servuces away from developers' apps. (
    - service discovery,
    - scaling,
    - load-balancing,
    - self-healing,
    - leader election, etc...
)
- Maximizing resource utilization (by switching and mixing apps).

## Bird view

Developer ->(Description) App List ->(Input) Kubernetes Master -> Master Nodes(all worker nodes with each
node having the specific container(s) as stipulated in the App List.) 

## Architecture view

- Master nodes: host Kubernetes Control Plane that controls and manages the whole Kubernetes system,
consisting of multiple components in a single master node or be splitted into many master nodes and replicated
to ensure high availability.
    - **API server**: let the developer(s) and the other Control Plane components communicate with.
    - **Scheduler**: schedules apps (assign a worker node to each
    deployable component).
    - **Controller Manager**: performs cluster-level functions, such as replicating components,
    keeping track of worker nodes, handling nodes failures, etc...
    - **etcd**: persistent data storage that stores the cluster configuration.

=> Hold and control the state of the cluster

- Worker nodes: the machines that run containerized apps. The task of running, monitoring,
and providing services to the app is done by the following components:
    - **Container runtime**: Docker, or rkt, etc... that runs the containers.
    - **kubelet**: communicates with API server and manages the containers on its node.
    - **kube-proxy**: Kubernetes Service Proxy, which load-balances network traffic
    between application components.

## Benefits of Kubernetes

- Simplification of deployment: abstraction of infrastructure eases the need to know/manage apps in worker nodes
since they are in a big computational resource waiting to be interacted with.
- Utilization of resources: Kubernetes manages resources taken by containers in a cluster with maximum efficiency.
- Health checking && Self-healing: Kubernetes auto switches the app to a new node when the current node fails,
allowing the devs to pay attention to fixing the node rather than to worry about migrating to a new node.
- Auto scaling: Kubernetes auto replicates the apps when necessary (spiking). When in the cloud
environment, it auto scales the cluster when necessary.
- Simplification of development
    - Allowing the discovery of bugs faster.
    - Querying Kubernetes API server for services without the need for leader election.
    - Increasing confidence in rolling out new version since Kubernetes auto stops failed version rolling out.