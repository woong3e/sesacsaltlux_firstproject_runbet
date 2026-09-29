import { Icon } from "@/components/ui/icon";

const days = ["월", "화", "수", "목", "금", "토", "일"];
const distances = [3, 5.8, 3.2, 6.4, 0, 0, 0];
export function WeeklyRecords() {
  return (
    <>
      <section aria-labelledby="weekly-records-heading">
        <h2 id="weekly-records-heading" className="text-[18px] font-bold">
          이번 주 기록
        </h2>
        <div className="mt-5 grid grid-cols-7 text-center">
          {days.map((day, index) => (
            <div
              key={day}
              className="flex flex-col items-center gap-3 text-[13px]"
            >
              <span className="text-muted">{day}</span>
              <span>{18 + index}</span>
              <span
                aria-label={index < 3 ? "기록 완료" : "기록 없음"}
                className={`flex size-[27px] items-center justify-center rounded-full ${index < 3 ? "bg-brand text-white" : "bg-[#f0f1f5] text-[#a8afc0]"}`}
              >
                {index < 3 ? (
                  <Icon name="check" className="size-4" />
                ) : (
                  <span
                    aria-hidden="true"
                    className="size-1 rounded-full bg-current"
                  />
                )}
              </span>
            </div>
          ))}
        </div>
      </section>
      <dl className="mt-9 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-[#f6f6fa] px-5 py-6">
          <dt className="text-[15px] text-muted">총 거리</dt>
          <dd className="mt-2 whitespace-nowrap text-[28px] font-bold tracking-[-1px] text-brand">
            18.4<span className="ml-1 text-sm font-medium">km</span>
          </dd>
        </div>
        <div className="rounded-2xl bg-[#f6f6fa] px-5 py-6">
          <dt className="text-[15px] text-muted">평균 페이스</dt>
          <dd className="mt-2 whitespace-nowrap text-[26px] font-bold tracking-[-1px]">
            4′52″<span className="ml-1 text-[13px] font-medium">/ km</span>
          </dd>
        </div>
      </dl>
      <svg
        viewBox="0 0 340 194"
        role="img"
        aria-label="3월 18일부터 24일까지 러닝 거리: 3km, 5.8km, 3.2km, 6.4km, 이후 기록 없음"
        className="mt-6 w-full"
      >
        <defs>
          <linearGradient id="record-bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#3770ff" />
            <stop offset="100%" stopColor="#9abbff" />
          </linearGradient>
        </defs>
        {[0, 5, 10].map((tick) => (
          <g key={tick}>
            <line
              x1="35"
              x2="331"
              y1={146 - tick * 10}
              y2={146 - tick * 10}
              stroke="#eceff5"
            />
            <text x="13" y={150 - tick * 10} fontSize="13" fill="#798197">
              {tick}
            </text>
          </g>
        ))}
        <rect x="165" y="36" width="20" height="110" rx="4" fill="#d3e1ff" />
        {distances.map((distance, index) => (
          <g key={index}>
            {distance > 0 && (
              <rect
                x={42 + index * 41}
                y={146 - distance * 10}
                width="20"
                height={distance * 10}
                rx="4"
                fill={
                  index === 0 || index === 2 ? "#d9e5ff" : "url(#record-bar)"
                }
              />
            )}
            <text
              x={52 + index * 41}
              y="172"
              fontSize="11"
              fill="#777f95"
              textAnchor="middle"
            >
              3.{18 + index}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-4 flex items-center gap-4 rounded-xl bg-[#f5f5f9] px-5 py-5">
        <Icon name="lock" className="size-7 shrink-0 text-[#333b4d]" />
        <p className="text-[12px] leading-[1.8] tracking-[-0.4px] text-muted">
          나만 볼 수 있는 기록이에요.
          <br />
          다른 참가자들은 내 기록을 볼 수 없어요.
        </p>
      </div>
    </>
  );
}
