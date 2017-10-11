pipeline {
  agent any
  environment {
    AGENT_BUILD_CONTAINER = 'oscardhdz/node-bower-gulp:alpine'
    ARTIFACT_IMAGE = 'oscardhdz/carpool:latest'
  }
  stages {

    stage('Preparation') {
      steps {
        sh 'docker pull $AGENT_BUILD_CONTAINER'
      }
    }
    stage('Build'){
      agent {
        docker {
          image '$AGENT_BUILD_CONTAINER'
          args ''
        }
      }
      steps {
        sh 'npm install'
        sh 'bower install --allow-root'
        sh 'npm run build-prod'
      }
    }
    stage ('Dockerize') {
      steps {
        sh 'docker build -t $ARTIFACT_IMAGE -f Dockerfile_Jenkinsfile .'
      }
    }


  }

}
