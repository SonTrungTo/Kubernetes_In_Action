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