# 🚀 프로젝트 시작

## 260929 프로젝트 초기세팅

## 로컬 실행

의존성을 설치한 뒤, 터미널 두 개에서 각각 실행합니다.

```bash
npm install
```

```bash
# 터미널 1: Mock REST API (http://localhost:9999)
npm run server
```

```bash
# 터미널 2: Next.js (http://localhost:3000)
npm run dev
```

홈 화면은 루트 `db.json`의 `challenges` 데이터를 `GET /challenges`로 조회합니다.
Axios 공통 설정은 `src/lib/api/client.ts`에서 관리하고, TanStack Query로
목록 조회와 로딩·에러·빈 목록 상태를 처리합니다.

API 주소를 변경하려면 `.env.local`에 다음 값을 설정하고 Next.js를 재시작합니다.

```dotenv
NEXT_PUBLIC_API_BASE_URL=http://localhost:9999
```

## 디자인 UI 화면

`docs/design/ui.png`의 3~12번 화면은 디자인 확인용 UI입니다. 화면 이동,
탭 선택, 입력과 달력 상태를 확인할 수 있으며 초대 전송·기록 저장·집계·정산 API는
후속 구현 대상입니다. 표시되는 참가자, 기록, 순위와 금액은 디자인 예시 값입니다.
새 화면의 사진은 제공된 `public/images/9.PNG`를 사용합니다.

| 번호 | 화면            | 경로                                       |
| ---- | --------------- | ------------------------------------------ |
| 1    | 홈              | `/`                                        |
| 2    | 새 챌린지 추가  | `/challenges/new`                          |
| 3    | 친구 초대       | `/challenges/weekend-running/invite`       |
| 4    | 챌린지 대시보드 | `/challenges/weekend-running`              |
| 5    | 러닝 기록 추가  | `/challenges/weekend-running/records/new`  |
| 6    | 내 기록         | `/challenges/weekend-running/records`      |
| 7    | 참가자 현황     | `/challenges/weekend-running/participants` |
| 8    | 일정            | `/challenges/weekend-running/calendar`     |
| 9    | 결과 대기       | `/challenges/weekend-running/waiting`      |
| 10   | 결과 공개       | `/challenges/weekend-running/results`      |
| 11   | 상금 정산       | `/challenges/weekend-running/settlement`   |
| 12   | 챌린지 히스토리 | `/challenges/history`                      |

홈의 챌린지 카드에서 대시보드로 이동합니다. 대시보드의 설정 아이콘은 초대,
날짜는 일정, D-3 배지는 결과 대기 화면으로 연결됩니다. 결과 대기의 집계 카드,
결과 화면의 내 순위 또는 정산 요약을 누르면 다음 화면을 확인할 수 있습니다.
기존 챌린지 생성이 완료되면 새 챌린지의 초대 화면으로 이동합니다.
