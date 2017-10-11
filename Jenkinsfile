pipeline {
  agent any
  stages {

    stage('Preparation') {
      steps {
        sh 'docker pull $BUILD_CONTINAER'
      }
    }
    stage('Build'){
      agent {
        docker {
          image '${env.BUILD_CONTINAER}'
          args '--pull'
        }
      }
      steps {
        sh 'npm install'
        sh 'bower install --allow-root'
        sh 'npm run build-prod'
      }
    }


  }
  environment {
    BUILD_CONTINAER = 'oscardhdz/node-bower-gulp:alpine'
  }

}
