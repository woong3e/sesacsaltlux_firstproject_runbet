// 새 화면의 디자인 확인용 표시값입니다. 실제 데이터 연동은 후속 작업에서 진행합니다.
export const previewImage = "/images/9.PNG";
export const previewTitle = "이번 주 러닝  챌린지";
export const previewPeriod = "3.18 (월) ~ 3.24 (일)";

export const previewParticipants = [
  { id: "me", name: "나", isMe: true },
  { id: "minsu", name: "민수", isMe: false },
  { id: "jihyun", name: "지현", isMe: false },
  { id: "hyunwoo", name: "현우", isMe: false },
];

export const previewRankings = [
  { id: "minsu", name: "민수", rank: 1, distance: "28.7", isMe: false },
  { id: "me", name: "나", rank: 2, distance: "24.3", isMe: true },
  { id: "jihyun", name: "지현", rank: 3, distance: "18.6", isMe: false },
  { id: "hyunwoo", name: "현우", rank: 4, distance: "12.4", isMe: false },
];

export const previewHistory = [
  {
    id: "weekend-running",
    title: "이번 주 러닝  챌린지",
    period: "3.18 - 3.24",
    rank: 2,
    distance: "24.3",
    prize: "13,905",
  },
  {
    id: "spring-running",
    title: "봄맞이 러닝 챌린지",
    period: "3.1 - 3.7",
    rank: 1,
    distance: "31.2",
    prize: "42,000",
  },
  {
    id: "weekend-run",
    title: "주말 런런 챌린지",
    period: "2.15 - 2.21",
    rank: 3,
    distance: "18.7",
    prize: "6,480",
  },
];
