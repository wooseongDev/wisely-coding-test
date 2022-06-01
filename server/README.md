# 와이즐리 사전과제 server

Nest.js + TypeORM + SQLite 기반 프로젝트입니다.

## Demo

> Railway 를 통해 자동배포 되고있습니다

https://wisely-coding-test.up.railway.app/

## 로컬 환경에서 실행하기

### 1. 깃 저장소 클론

```shell
# 이미 clone 된 상태라면 git clone 은 넘어가도 됩니다
git clone https://github.com/wooseongDev/wisely-coding-test.git
cd wisely-coding-test/server
```

### 2. 의존성 패키지 설치

```shell
yarn install
```

### 3. 실행

```shell
# development 환경 watch mode 로 실행
yarn start:dev

# production 환경 실행
yarn build
yarn start:prod
```

- 브라우저를 열고 http://localhost:4000 접속 후 `Hello World!`를 확인합니다
