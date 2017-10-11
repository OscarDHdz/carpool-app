pipeline {
  agent any
  environment {
    AGENT_BUILD_CONTAINER = 'oscardhdz/node-bower-gulp:alpine'
    ARTIFACT_DOCKER_IMAGE = 'oscardhdz/carpool:latest'
    INITIAL_WORKSPACE = '$WORKSPACE'
    PROD_CONTAINER_NAME = 'carpool'
    TARGET_HOST = 'carpool.manxdev.com'
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
          args ''
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
                sh 'docker push $ARTIFACT_DOCKER_IMAGE'
                sh 'docker logout'
            }
        }
      }
    }
    stage ('Deploy') {
      steps {

        script {
            try {
                sh 'ssh -i ~/.ssh/id_rsa ubuntu@manxdev.com "docker rm -f $PROD_CONTAINER_NAME"'
            }
            catch (err) {
                sh 'echo Docker: Unexisting container: $PROD_CONTAINER_NAME'
            }
        }
        sh 'ssh -i ~/.ssh/id_rsa ubuntu@manxdev.com "docker pull $DOCKER_IMAGE_NAME && docker run -d --network=nginx-proxy -p 3000:3000 --name=carpool  -e VIRTUAL_HOST=$TARGET_HOST -e VIRTUAL_NETWORK=nginx-proxy -e VIRTUAL_PORT=3000  -e LETSENCRYPT_HOST=$TARGET_HOST -e LETSENCRYPT_EMAIL=oscardavid.hernandez.mx@gmail.com  $ARTIFACT_DOCKER_IMAGE"'


      }
    }


  }

}
