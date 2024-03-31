import {
  DockerComposeEnvironment,
  StartedDockerComposeEnvironment,
  DownedDockerComposeEnvironment,
} from "testcontainers";

let docker: DockerComposeEnvironment;
let startedDocker: StartedDockerComposeEnvironment;
let downedDocker: DownedDockerComposeEnvironment;

async function startDocker() {
  docker = new DockerComposeEnvironment(".", "docker-compose.yml");
  console.log("Docker started");
  startedDocker = await docker.up();
  console.log("Timer started");

  await new Promise((resolve) => setTimeout(resolve, 100000));
  downedDocker = await startedDocker.down();
  console.log("Docker downed");
}
startDocker();
