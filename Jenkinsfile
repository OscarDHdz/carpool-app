pipeline {
  agent any
  environment {
    AGENT_BUILD_CONTAINER = 'oscardhdz/node-bower-gulp:alpine'
    ARTIFACT_DOCKER_IMAGE = 'oscardhdz/carpool:latest'
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
          image '$AGENT_BUILD_CONTAINER'
          args ''
        }
        customWorkspace '$WORKSPACE'
      }
      steps {
        sh 'npm install'
        sh 'bower install --allow-root'
        sh 'npm run build-prod'
      }
    }
    stage ('Build Docker Image') {
      steps {
        sh 'pwd'
        sh 'ls -lh'
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
