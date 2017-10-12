pipeline {
  agent any
  environment {
    AGENT_BUILD_CONTAINER = 'oscardhdz/node-bower-gulp:alpine'
    ARTIFACT_DOCKER_IMAGE = 'oscardhdz/carpool:latest'
    PROD_CONTAINER_NAME = 'carpool'
    POSTGRES_CONTAINER_NAME = 'carpool-pg'
    POSTGRES_DATABASE = 'carpool_db'
    POSTGRES_CRED = credential('prod-pg-user')
    INITIAL_WORKSPACE = '$WORKSPACE'
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
        /* Validate Postgres container is running */
        script {
          try {
            sh 'ssh -i ~/.ssh/id_rsa ubuntu@manxdev.com "CONTAINER_STATE=$(docker inspect -f '{{.State.Status}}' $POSTGRES_CONTAINER_NAME)" && \
            if [ "$VAL" != "running" ]; \
            then docker run \
            --name $POSTGRES_CONTAINER_NAME \
            -p 5432:5432 \
            -v $POSTGRES_CONTAINER_NAME:/var/lib/postgresql/data \
            -e POSTGRES_DB=$POSTGRES_DATABASE \
            -e POSTGRES_USER=$POSTGRES_CRED_USR \
            -e POSTGRES_PASSWORD=$POSTGRES_CRED_PSW \
            -d postgres:alpine  \
            -d $PROD_CONTAINER_NAME; \
            fi
            '
          }
          catch (err) {
            sh 'echo An error ocurred'
          }
        }
        script {
            withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'admin-app-user', usernameVariable: 'ADMIN_USER', passwordVariable: 'ADMIN_PASSWORD']]) {
              withCredentials([[$class: 'UsernamePasswordMultiBinding', credentialsId: 'public-app-user', usernameVariable: 'PUBLIC_USER', passwordVariable: 'PUBLIC_PASSWORD']]) {
                sh 'ssh -i ~/.ssh/id_rsa ubuntu@manxdev.com "docker pull $ARTIFACT_DOCKER_IMAGE && \
                docker run -d --network=nginx-proxy -p 3000:3000 --name=$PROD_CONTAINER_NAME  \
                -v carpool:/home/app \
                -e VIRTUAL_HOST=$TARGET_HOST -e VIRTUAL_NETWORK=nginx-proxy -e VIRTUAL_PORT=3000 \
                -e LETSENCRYPT_HOST=$TARGET_HOST -e LETSENCRYPT_EMAIL=oscardavid.hernandez.mx@gmail.com  \
                -e ADMIN_USER=$ADMIN_USER -e ADMIN_PASS=$ADMIN_PASSWORD \
                -e PUBLIC_USER=$PUBLIC_USER -e PUBLIC_PASS=$PUBLIC_PASSWORD \
                -e DB_CLIENT=pg \
                -e DB_HOST=$POSTGRES_CONTAINER_NAME -e DB_NAME=$POSTGRES_DATABASE \
                -e DB_USER=$POSTGRES_CRED_USR -e DB_PASWORD=$POSTGRES_CRED_PSW \
                $ARTIFACT_DOCKER_IMAGE"'
              }
            }
        }


      }
    }


  }

}
