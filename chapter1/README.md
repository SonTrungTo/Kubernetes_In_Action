## Some notes

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

## Kubernetes

## Bird view

Developer -> 