---
marp: true
paginate: true
---

# AI Studios API를 활용한 CMS(Wordpress) 연동 웹 앱

---

## 개요

AI Studios의 TTV(Text to Video) API를 활용하여 CMS(Wordpress)에 저장되어 있는 원본 텍스트 데이터를 불러오고, 텍스트를 편집 및 저장하여 영상을 제작 후 다시 CMS 사이트에 업로드 하는 과정을 간단히 구성

### 왜 워드프레스인가요?

1. 전 세계에서 가장 많이 쓰이고 있는 CMS(Contents Management System)[^1]
2. 기존 워드프레스 기반의 언론매체 사이트, 뉴스레터를 발행하는 사이트 등 영상 제작 수요층이 다수 존재
3. 워드프레스는 사이트 데이터를 JSON형식으로 불러올 수 있는 REST API가 이미 구현되어 있으며[^2], 추가적으로 GraphQL, Next.js 기반의 프레임워크도 활용 가능(Faust.js)
4. 추후 다른 CMS도 고려하여 시장 확대 가능[^3]

---

## 활용 기술 스택

### 기존 워드프레스 사이트

Nothing. 플러그인만 추가적으로 설치하여 Headless CMS로 활용

> 개발 환경 구축을 위한 Docker (@wordpress/env 노드 패키지 활용)

#### Headless CMS?

<!-- 장 단점? 사용 사례? -->

---

### 신규 Next.js 사이트

- Faust.js Framework
  - Next.js
  - GQty (GraphQL Client)
  - React Hooks
    - 워드프레스 사이트 인증
    - 워드프레스 사이트 데이터 연동 등등
- Mongo DB

---

## 서버 구성

![서버 구성도 임시 이미지](./_images/wp3913837-1920px-wallpapers.png)

---

### 단계별 추가 설명

1. AAA
2. BBB
3. CCC
4. DDD
5. EEE
6. FFF

---

## 개발 환경 구성

### 워드프레스 사이트

[@wordpress/env](https://developer.wordpress.org/block-editor/reference-guides/packages/packages-env/) 노드 패키지를 활용하여 구성 가능

```shell
npm i @wordpress/env --save-dev
```

그러나, Next.js 위주의 개발을 진행 할 예정이므로 실제 배포가 이미 완료 된 사이트를 바탕으로 진행
<!-- TODO: 사이트 기본 구성 소개 필요. 콘텐츠 내용 등 -->

---

### Next.js 사이트

<!-- TODO: local env 구성, docker with mongoDB? -->
---

## 기능 구현 계획

- 글 목록 데이터 불러오기
- 글 목록 필터링
  - 포스트 타입별
- 글 목록 정렬
  - 날짜순
  - ??
- 선택된 글 상세 내용 불러오기
  - N개 글 선택 상세 내용 불러오기
    - 1개일 경우? 또는 N개일 경우
  - 선택된 글의 텍스트 내용을 분석하여 TTV 대상 언어 탐지
  - 포함된 이미지 불러오기, 이미지 리스트 별도 표시
    - Featured image
    - 본문 이미지
    - 이미지 타입 외의 미디어 콘텐츠?
    - SVG 허용?
- TTV용 텍스트 편집
  - Copy & Paste 지원?
  - 편집 내용 임시 저장?
  - 편집 내용 저장 (MongoDB)
- 저장된 TTV용 글 목록 불러오기
- 저장된 TTV용 글 상세 조회
  - 리스트 혹은 상세 조회시 AIStudios API 호출 하여 비디오 저장
    - 포스트?
    - 미디어 라이브러리?
  - 비디오 저장 상태값 저장
  - 비디오 파일명 변경 필요할지도?
- 저장된 비디오를 바탕으로 새 글 발행 (커스텀 포스트 타입?)
  - 혹은 기존 워드프레스 관리 페이지로 이동하여 저장된 내용 확인

<!-- TODO: 필요한 페이지는? -->
---

## 시연

---

## 활용 사례

기존 사이트는 콘텐츠 관리 도구로 계속 활용

<!-- TODO: 기술적 이점? -->

---

## Q&A

---

[^1]: [Usage Statistics and Market Share of Content Management Systems, May 2022](https://w3techs.com/technologies/overview/content_management)에 따르면 전체 웹 사이트 중 약 42.9%가, CMS 중에서는 약 64.1%의 점유율을 차지하고 있습니다.
