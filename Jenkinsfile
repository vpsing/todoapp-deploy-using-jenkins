// =============================================
// TaskFlow Todo App - Jenkins Pipeline
// Ye pipeline automatically:
// 1. Code checkout karega
// 2. Dependencies install karega
// 3. Tests chalayega
// 4. Docker image build karega
// 5. Deploy karega
// =============================================

pipeline {

    agent any

    environment {
        APP_NAME     = 'taskflow-todo-app'
        IMAGE_NAME   = 'taskflow-todo'
        IMAGE_TAG    = "${BUILD_NUMBER}"   // Har build ka alag tag
        CONTAINER_PORT = '3000'
    }

    stages {

        // ---- Stage 1: Code Lao ----
        stage('📥 Checkout') {
            steps {
                echo '🔄 Code checkout ho raha hai...'
                checkout scm
            }
        }

        // ---- Stage 2: Dependencies Install ----
        stage('📦 Install Dependencies') {
            steps {
                echo '📦 npm install chal raha hai...'
                sh 'node --version'
                sh 'npm --version'
                sh 'npm install'
            }
        }

        // ---- Stage 3: Tests Chalao ----
        stage('🧪 Run Tests') {
            steps {
                echo '🧪 Tests chal rahe hain...'
                sh 'npm test -- --watchAll=false --passWithNoTests'
            }
        }

        // ---- Stage 4: Production Build ----
        stage('🏗️ Build React App') {
            steps {
                echo '🏗️ React production build ban raha hai...'
                sh 'npm run build'
                echo '✅ Build complete!'
            }
        }

        // ---- Stage 5: Docker Image Build ----
        stage('🐳 Docker Build') {
            steps {
                echo "🐳 Docker image build ho rahi hai: ${IMAGE_NAME}:${IMAGE_TAG}"
                sh "docker build -t ${IMAGE_NAME}:${IMAGE_TAG} ."
                sh "docker tag ${IMAGE_NAME}:${IMAGE_TAG} ${IMAGE_NAME}:latest"
                echo '✅ Docker image ready!'
            }
        }

        // ---- Stage 6: Deploy ----
        stage('🚀 Deploy') {
            steps {
                echo '🚀 App deploy ho rahi hai...'

                // Purana container band karo (agar chal raha hai)
                sh """
                    docker stop ${APP_NAME} || true
                    docker rm   ${APP_NAME} || true
                """

                // Naya container chalao
                sh """
                    docker run -d \
                        --name ${APP_NAME} \
                        -p ${CONTAINER_PORT}:80 \
                        --restart unless-stopped \
                        ${IMAGE_NAME}:latest
                """

                echo "✅ App deploy ho gayi! http://localhost:${CONTAINER_PORT} pe dekho"
            }
        }

        // ---- Stage 7: Purani Images Saaf Karo ----
        stage('🧹 Cleanup') {
            steps {
                echo '🧹 Purani Docker images clean kar rahe hain...'
                sh 'docker image prune -f'
            }
        }
    }

    // ---- Pipeline ke baad kya karna hai ----
    post {
        success {
            echo """
            ✅ ====================================
               PIPELINE SUCCESS! 🎉
               App chal rahi hai: http://localhost:${CONTAINER_PORT}
               Build Number: ${BUILD_NUMBER}
            ====================================
            """
        }
        failure {
            echo """
            ❌ ====================================
               PIPELINE FAIL HO GAYI!
               Logs dekho upar
            ====================================
            """
        }
        always {
            echo '🔔 Pipeline khatam hui.'
        }
    }
}
