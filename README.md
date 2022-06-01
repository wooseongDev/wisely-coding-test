# 와이즐리 사전과제

와이즐리 프론트엔드 사전과제를 수행한 repository 입니다. server 와 client 프로젝트가 포함돼 있습니다.

## Project Stack

### Server

`./server/README.md` 에서 더 자세히 확인 할 수 있습니다.

- Nest.js
- Typescript
- TypeORM
- SQLite
- Railway

### Client

`./client/README.md` 에서 더 자세히 확인 할 수 있습니다.

- React.js
- Typescript
- React-query
- Mantine
- Vercel

## Todo list

Github 이슈는 todo list 로 대체합니다.

- [x] Github repository init
- [ ] Server
    - [x] Nest.js 보일러 플레이트 세팅
    - [x] Railway 배포 연동
    - [x] Database 연결
        - [x] TypeORM + SQLite 설정
    - [ ] todo 도메인 작성
        - [x] create new todo
        - [x] get many todos
        - [x] get one todo
        - [x] update todo
        - [ ] delete todo
    - [ ] relatedTodo 도메인 작성
        - [ ] create todo 에 관계된 todo 같이 작성되도록 수정
        - [ ] get many todos 에 relatedTodo join 해서 보여주기
        - [ ] get one todo 에 related todo join 해서 보여주기
        - [ ] update todo 에 관계된 todo 추가, 삭제 가능하도록 수정
        - [ ] delete todo 에 관계된 todo 여부 체크, 관계 삭제 후 삭제하도록 수정
    - [ ] 검색 도메인 작성
- [ ] Client
    - [ ] React.js 보일러 플레이트 세팅
    - [ ] Vercel 자동 배포 연동
    - [ ] TBD
