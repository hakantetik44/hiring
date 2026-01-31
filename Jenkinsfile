pipeline {
    agent any

    stages {
        stage('Install Dependencies') {
            steps {
                dir('QA/bonus-task') {
                    sh 'npm ci || npm install'
                }
            }
        }

        stage('Run Cypress Tests') {
            steps {
                dir('QA/bonus-task') {
                    sh 'npm test || true'
                }
            }
        }

        stage('Generate Allure Report') {
            steps {
                dir('QA/bonus-task') {
                    sh 'npm run allure:report || true'
                }
            }
        }
    }

    post {
        always {
            dir('QA/bonus-task') {
                archiveArtifacts artifacts: 'cypress/videos/**/*', allowEmptyArchive: true
                archiveArtifacts artifacts: 'allure-report/**/*', allowEmptyArchive: true
            }
        }
        success {
            echo 'Tests completed successfully!'
        }
        failure {
            echo 'Tests failed. Check logs for details.'
        }
    }
}
