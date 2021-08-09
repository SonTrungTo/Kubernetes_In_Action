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