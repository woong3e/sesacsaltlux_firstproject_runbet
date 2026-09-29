# AGENTS.md

## 프로젝트 개요

- 이 프로젝트는 Next.js App Router를 사용합니다.
- TypeScript를 사용합니다.
- 스타일링은 Tailwind CSS를 사용합니다.
- Mock REST API로 json-server를 사용합니다.
- 서버 상태 관리를 위해 TanStack Query를 사용할 수 있습니다.
- Zustand는 전역 클라이언트 상태가 필요한 경우에만 사용합니다.

## 개발 명령어

- 의존성 설치: `npm install`
- Next.js 개발 서버 실행: `npm run dev`
- ESLint 실행: `npm run lint`
- json-server 실행: `npm run server`

## 프로젝트 구조

- `app/`: 페이지, 레이아웃 및 라우트 단위 컴포넌트
- `components/`: 재사용 가능한 UI 컴포넌트
- `lib/`: API 요청 함수 및 유틸리티 함수
- `types/`: 여러 파일에서 공유하는 TypeScript 타입
- `public/`: 이미지 등의 정적 파일

## 코드 스타일

- TypeScript를 사용합니다.
- React 컴포넌트는 함수형 컴포넌트를 사용합니다.
- `let`보다 `const`를 우선적으로 사용합니다.
- 비동기 코드는 `async/await` 사용을 우선합니다.
- 특별한 이유가 없다면 `any` 사용을 피합니다.
- 컴포넌트는 작게 유지하고 하나의 역할에 집중하도록 작성합니다.
- 중복되는 로직이 생기면 재사용할 수 있도록 분리합니다.
- 불필요하게 복잡한 추상화는 피하고 읽기 쉬운 코드를 우선합니다.

## React / Next.js

- App Router를 사용합니다.
- 기본적으로 Server Component를 사용합니다.
- 클라이언트 기능이 필요한 경우에만 `"use client"`를 추가합니다.
- 불필요하게 `"use client"`를 추가하지 않습니다.
- `useState`, `useEffect` 등의 React Hook이나 이벤트 핸들러가 필요한 경우 Client Component를 사용합니다.

## API

- HTTP 요청에는 `fetch` 대신 Axios를 사용합니다.
- 가능한 경우 API 요청 로직과 UI 컴포넌트를 분리합니다.
- Axios 인스턴스를 생성하여 공통 설정과 Base URL을 한 곳에서 관리합니다.
- 로딩, 에러, 성공 상태를 처리합니다.
- json-server와 통신할 때 REST 규칙을 따릅니다.
- API URL을 여러 파일에 반복해서 하드코딩하지 않습니다.

## TanStack Query

- 서버 상태 관리에는 TanStack Query를 사용합니다.
- GET 요청에는 `useQuery`를 사용합니다.
- POST, PATCH, PUT, DELETE 요청에는 `useMutation`을 사용합니다.
- Query Key는 명확하고 일관된 규칙으로 작성합니다.

## Zustand

- 서버 상태를 관리하기 위해 Zustand를 사용하지 않습니다.
- 여러 컴포넌트에서 공유해야 하는 클라이언트 상태가 있는 경우에만 Zustand를 사용합니다.

## TypeScript

- API 응답 데이터에는 명확한 `interface` 또는 `type`을 정의합니다.
- 여러 파일에서 공통으로 사용하는 타입은 `src/types/` 폴더에 정의합니다.
- 공통 타입 파일은 가능한 경우 도메인별로 분리합니다.
  - 예: `src/types/user.ts`
  - 예: `src/types/challenge.ts`
  - 예: `src/types/record.ts`
- 특정 컴포넌트에서만 사용하는 Props 타입은 해당 컴포넌트 파일 내부에 정의합니다.
- 타입만 import하는 경우 `import type`을 사용합니다.
- 특별한 이유가 없다면 `any` 타입을 사용하지 않습니다.
- 지나치게 복잡한 TypeScript 패턴은 피합니다.
- TypeScript를 학습 중인 개발자가 이해하기 쉬운 타입을 우선합니다.
- 명확한 이점이 없는 경우 고급 Generic을 도입하지 않습니다.

## 작업 완료 전 확인

- TypeScript 오류가 없는지 확인합니다.
- ESLint를 실행하여 오류를 확인합니다.
- 사용하지 않는 import와 변수를 제거합니다.
- 기존 기능이 정상적으로 동작하는지 확인합니다.
- 작업과 관련 없는 파일은 수정하지 않습니다.
