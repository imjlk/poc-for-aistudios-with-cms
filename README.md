# AI Studios API를 활용한 CMS(Wordpress) 연동 웹 앱

## 시작 스크립트

### 워드프레스 컨테이너 실행

```shell
npm i
npm run wp-env start
```

컨테이너 실행과 관련된 설정 값은 `.wp-env.json`에서 관리

### WP-CLI 활용하여 초기 데이터 임포트

```shell
npm run wp-env run cli "wp acm blueprint import https://github.com/wpengine/atlas-blueprint-portfolio/raw/main/acm-blueprint.zip"
```

WP-CLI 컨테이너가 실행되면서 로컬 환경의 워드프레스 사이트의 Atlas Contents Modeler 플러그인에서 지원하는 커맨드를 바탕으로 데이터가 임포트 됨

### 몽고 DB 실행

```shell

```

### .env 구성

`.env.local.sample` 참고

### Next.js 실행

```shell
npm run dev
```

## 배포

Vercel 활용
