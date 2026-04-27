# CollabMate - 협업 관리 플랫폼

**CollabMate**는 팀원들과 프로젝트를 관리하고, 일정을 조율하며, 소통할 수 있는 협업 플랫폼입니다. 
본 리포지토리는 프론트엔드와 백엔드가 함께 구성된 모노레포(Monorepo) 형태로 관리되며, 환경 변수(`.env`)를 통해 **로컬 개발 환경과 실제 서버 배포 환경을 동적으로 지원**하도록 설계되었습니다.

## 🛠 Tech Stack (기술 스택)
- **Frontend**: React.js, Axios
- **Backend**: Node.js, Express.js, Socket.io
- **Database**: MySQL (연결은 `mysql2` 모듈 사용)

## 📌 주요 특징
1. **환경 분리 (Environment Separation)**
   - 소스코드 하나로 로컬 환경(Localhost)과 서버 환경(AWS EC2, Render 등)을 모두 유연하게 통제할 수 있습니다.
   - 데이터베이스 접속 정보, API 엔드포인트 등을 `.env` 파일로 주입하여 관리의 효율성을 높였습니다.
2. **보안 (Security & Auth)**
   - JWT 기반의 토큰 인증 방식을 구현하였으며, Axios Interceptor를 통해 클라이언트 요청 시 헤더에 토큰을 자동으로 주입합니다.

---

## 🚀 프로젝트 실행 방법 (Getting Started)

이 프로젝트는 `frontend`와 `backend` 두 개의 폴더로 나뉘어 있습니다. 
실행 전, 각 폴더에 환경 변수(`.env`)를 먼저 설정해야 합니다.

### 1. 환경 변수 설정
각 폴더 내부에 있는 `.env.example` 파일을 복사하여 `.env` 파일을 생성하고, 본인의 환경에 맞게 값을 채워 넣습니다.

* **Backend (`backend/.env`)**
  ```env
  DB_HOST=localhost # 또는 AWS RDS 주소
  DB_USER=root
  DB_PASSWORD=your_db_password
  DB_NAME=collabmate
  PORT=5000
  CORS_ORIGIN=http://localhost:3000 # 프론트엔드 주소
  ```
* **Frontend (`frontend/.env`)**
  ```env
  REACT_APP_API_URL=http://localhost:5000 # 또는 백엔드 배포 주소
  ```

### 2. 패키지 설치 및 실행
터미널을 2개 열어서 각각 프론트엔드와 백엔드를 실행합니다.

#### Backend (백엔드 서버 구동)
```bash
cd backend
npm install
npm start
```
> 서버가 정상적으로 실행되면 `Server running on http://localhost:5000` 문구가 출력됩니다.

#### Frontend (리액트 클라이언트 구동)
```bash
cd frontend
npm install
npm start
```
> 프론트엔드가 실행되면 브라우저에서 `http://localhost:3000` 으로 접속할 수 있습니다.

---

## 💡 개발 시 겪었던 문제와 해결 과정 (Trouble Shooting)

- **CORS 오류 및 API 주소 하드코딩 문제 개선**
  - 초기 버전에서는 로컬 테스트용(localhost)과 서버 배포용(IP 주소) 코드가 분리되어 있어 유지보수에 큰 어려움이 있었습니다. 이를 해결하기 위해 `dotenv`를 도입하였고, 코드 변경 없이 `.env` 파일의 교체만으로 로컬 개발과 실제 서버 배포를 모두 매끄럽게 지원하도록 구조를 개선했습니다.

- **인증 토큰 누락 현상 수정**
  - 클라이언트 사이드에서 매 요청마다 헤더에 JWT 토큰을 실어 보내야 했으나, 개별 API 호출 함수마다 토큰을 넣는 것은 비효율적이었습니다. 이를 해결하기 위해 **Axios Interceptor**를 적용하여 중앙에서 모든 API 요청 전에 `localStorage`의 토큰을 자동으로 주입하도록 개선했습니다.
