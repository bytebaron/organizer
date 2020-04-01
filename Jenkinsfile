pipeline {
    agent {
        docker {
            image 'node:12-alpine'
            args '-p 3000:3000'
        }
    }
    environment {
        CI = 'true' 
        SSH_KEY = credentials('SSH-KEY')
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
            sshagent (credentials: SSH_KEY) { 
                sh ('scp build apache:/var/www/') 
            }
        }
    }
    }
}

def runDockerCommand() {
    sh('printenv')
}