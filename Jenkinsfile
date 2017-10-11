pipeline {
  agent any
  environment {
    AGENT_BUILD_CONTAINER = 'oscardhdz/node-bower-gulp:alpine'
    ARTIFACT_DOCKER_IMAGE = 'oscardhdz/carpool:latest'
    INITIAL_WORKSPACE = '$WORKSPACE'
  }
  stages {

    stage('Preparation') {
      steps {
        sh 'docker pull $AGENT_BUILD_CONTAINER'
      }
    }
    stage('Build Project'){
      agent {
        docker {
          reuseNode true 
          image '$AGENT_BUILD_CONTAINER'
          args '-v var/jenkins'
        }
      }
      steps {
        sh 'npm install'
        sh 'bower install --allow-root'
        sh 'npm run build-prod'
      }
    }
    stage ('Build Docker Image') {
      steps {
        sh 'docker build -t $ARTIFACT_DOCKER_IMAGE -f Dockerfile_Jenkinsfile .'
      }
    }
    stage ('Artifact') {
      steps {
        script {
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'docker-hub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD']]) {
                sh 'echo uname=$USERNAME pwd=$PASSWORD'
                sh 'docker login -u $USERNAME -p $PASSWORD'
                // sh 'docker push $ARTIFACT_DOCKER_IMAGE'
                sh 'docker logout'
            }
        }
      }
    }


  }

}
