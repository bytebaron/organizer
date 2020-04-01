if [[ $(/usr/bin/id -u) -ne 0 ]]; then
    echo "Aborting: run as root user!"
    exit 1
fi

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
		   sh '''
		   	cd client
			../jenkins/scripts/deliver.sh
			mv build /var/www
		   '''
		}
	}
    }
}
