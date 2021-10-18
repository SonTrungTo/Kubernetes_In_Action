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

## ReplicationControllers

