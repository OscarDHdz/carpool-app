pipeline {
  agent any
  stages {


    stage('Build'){
      agent {
        docker {
          image 'oscardhdz/node-bower-gulp:alpine'
          args ''
        }
      }
      steps {
        sh 'npm install'
        sh 'bower install'
        sh 'npm run build-prod'
      }
    }


  }

}
