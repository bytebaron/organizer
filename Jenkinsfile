pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        stage('Test') { 
            steps {
		dir("${env.WORKSPACE}/client"){
   			 sh './jenkins/scripts/test.sh'
		}
                #sh './client/jenkins/scripts/test.sh' 
            }
        }
    }
}
