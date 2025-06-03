pipeline {
    agent any

    tools {
        jdk 'jdk21'
    }

    environment {
        SCANNER_HOME = tool 'Sonar-scanner'
    }

    stages {
        stage('Git checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/nikes303/devopsproject1.git'
            }
        }

        stage('Sonarqube Analysis') {
            steps {
                bat """
                ${SCANNER_HOME}/bin/Sonar-Scanner ^
                -Dsonar.projectName=devopsproject1 ^
                -Dsonar.host.url=http://localhost:9000 ^
                -Dsonar.login=squ_ce1917f1fc0a7ffc00865816a54adb4bf5d2b476 ^
                -Dsonar.java.binaries=. ^
                -Dsonar.projectKey=devopsproject1
                """
            }
        }

        stage('OWASP Dependency Check') {
            steps {
                dependencyCheck additionalArguments: '-scan .', odcInstallation: 'DP'
                dependencyCheckPublisher pattern: 'dependency-check-report.xml'
            }
        }

        stage("Docker Build & Push"){
            steps{
                script{
                    withDockerRegistry(credentialsId: 'docker') {
                        bat "docker build -t todoapp:latest -f backend/Dockerfile backend"
                        bat "docker tag todoapp:latest nikes303/todoapp13:latest"
                        bat "docker push nikes303/todoapp13:latest"
                    }
                }
            }
        }
        stage('Trivy Docker Scan'){
            steps{
                bat "trivy image nikes303/todoapp13:latest"
            }
        }
        stage("Docker deploy (on Agent)"){ // It's good to be specific about where it's deploying
            steps{
                script{
                    withDockerRegistry(credentialsId: 'docker'){
                        // Stop existing container if it exists (|| true prevents failure if it doesn't exist)
                        bat "docker stop todoapp13 || true"
                        // Remove existing container if it exists (|| true prevents failure if it doesn't exist)
                        bat "docker rm todoapp13 || true"
                        // Run the new container
                        bat "docker run -d --name todoapp13 -p 4000:4000 nikes303/todoapp13:latest"
                    }
                }
            }
        }
    }
}
