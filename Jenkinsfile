pipeline {
  agent any
  environment {
    BUILD_CONTINAER = 'oscardhdz/node-bower-gulp:alpine'
  }
  stages {

    stage('Preparation') {
      steps {
        sh 'docker pull $BUILD_CONTINAER'
      }
    }
    stage('Build'){
      agent {
        docker {
          image '$BUILD_CONTINAER'
          args ''
        }
      }
      steps {
        sh 'npm install'
        sh 'bower install --allow-root'
        sh 'npm run build-prod'
      }
    }


  }

}
