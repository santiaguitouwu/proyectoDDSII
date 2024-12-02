Project Structure
.github/workflows
Contains configuration files for GitHub Actions.
These configurations automate processes such as testing, code analysis, and deployments.

petcareAPI
Main directory for the project's backend.
Includes:
- API source code.
- Server-specific configurations.
- Dependencies required to run the backend.

petcareCLIENT
Folder dedicated to the project's frontend.
Contains:
- Client files, likely developed with React.
- Resources required for the user interface.
- Configurations to connect with the API.

.gitignore
File that lists the files and folders that should not be tracked by Git.
Used to prevent sensitive or unnecessary files from being uploaded to the repository.

docker-compose.yml
Configuration file for Docker Compose.
Orchestrates the project's services (e.g., containers for the backend, frontend, and database).
Facilitates running the project in a Dockerized environment.

sonar-project.properties
Configuration file for SonarQube.
Defines properties for static code analysis, helping to identify quality issues and vulnerabilities.

Prerequisites
Docker: Required to run the services defined in docker-compose.yml.
Node.js and npm/yarn (optional): To work directly on the frontend (petcareCLIENT) or backend (petcareAPI) without Docker.
SonarQube: To perform static code analysis.

Clone this repository:
git clone https://github.com/<user>/<repository>.git

Set up dependencies and services with Docker:
docker-compose up --build