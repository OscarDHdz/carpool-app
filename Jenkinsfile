pipeline {
  agent any
  stages {


    stage('Build'){
      agent {
        docker {
          image 'oscardhdz/node-bower-gulp:alpine'
          args ''
          additionalBuildArgs '--pull'
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
