pipeline {
    agent any

    tools {
        nodejs 'NodeJS'
    }
    environment {
        CI = 'true'
        NODE_ENV = 'production'
    }
    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install Dependencies') {
            steps { sh 'npm ci' } // or 'yarn install --frozen-lockfile', 패키지 설치
        }
        stage('Lint') {
            steps { sh 'npm run lint' } // 코드 규칙 검사
        }
        stage('Build') {
            steps { sh 'npm run build' } // 빌드 산출물 생성
        }
        stage('Test') {
            steps { sh 'npm test -- --watchAll=false' } // 테스트 실행, 감시 모드 끔(테스트가 끝나지 않으면 빌드가 무한 대기 상태로 멈춤)
        }
    }
    post {
        success { 
          archiveArtifacts artifacts: 'build/**', fingerprint: true // 빌드된 파일을 Jenkins에 보관
          echo 'Build and tests passed successfully!' 
        }
        failure { echo 'Build or tests failed.' }
        always { cleanWs() }
    }
}