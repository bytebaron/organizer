pipeline {
    agent {
        docker {
            image 'node:12-alpine'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true' 
    }
    stages {
        stage('Build') {
            steps {
                sh '''
			cd client
			npm install
		'''
            }
        }
        stage('Test') { 
            steps {
                sh '''
			node --version
			cd client
			../jenkins/scripts/test.sh
		'''
            }
        }
	stage('Deliver') {
		steps {
            sh 'cd client'
            sh './jenkins/scripts/deliver.sh' 
            input message: 'Finished using the web site? (Click "Proceed" to continue)' 
            sh './jenkins/scripts/kill.sh'
		}
	}
    }
}
