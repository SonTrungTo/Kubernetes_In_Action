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

- `docker login`, `docker push <image_name>`(Docker hub namerule: dockerID/image_name)

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