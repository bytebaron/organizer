pipeline {
    agent {
        docker {
            image 'node:12'
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
            sh '''
                cd client
                ../jenkins/scripts/deliver.sh
            '''
		}
	}
    stage('Release') {
        steps {
            sshagent (credentials: ['SSH_KEY']) { 
                sh ('scp build 0.0.0.0:/var/www/') 
            }
        }
    }
  }
}

