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

- `docker exec -it kubia-container bash`