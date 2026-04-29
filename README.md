# Todo App — Feature-first Architecture Example

Next.js 15 (App Router) + TypeScript + Tailwind CSS 기반의 Todo 앱.
Feature-first(Vertical Slice) 아키텍처를 적용한 예시 프로젝트입니다.

## 실행 방법

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 접속.

## 폴더 구조

```
src/
├── app/                          # Next.js 라우팅 (얇게 유지)
│   ├── layout.tsx
│   ├── page.tsx                  # / → /todos 리다이렉트
│   ├── todos/
│   │   └── page.tsx              # features 조립만
│   └── globals.css
│
├── features/                     # 기능 단위 모듈
│   ├── todo/
│   │   ├── components/           # UI
│   │   ├── hooks/                # 상태 + 비즈니스 로직
│   │   ├── api/                  # 데이터 계층
│   │   ├── types.ts
│   │   └── index.ts              # public API
│   │
│   └── theme/                    # 다크모드
│       ├── components/
│       ├── hooks/
│       └── index.ts
│
└── shared/                       # 공통 (도메인 무관)
    ├── ui/                       # Button, Input, Checkbox
    ├── lib/                      # cn (className merger)
    └── config/                   # 상수
```

## 핵심 원칙

### 1. `app/`은 라우팅 진입점만
페이지 컴포넌트는 features에서 import해서 조립만 한다.
비즈니스 로직, 상태, API 호출은 절대 `app/`에 두지 않는다.

### 2. Feature는 `index.ts`로만 외부에 노출
외부 코드는 `@/features/todo`로만 import.
`@/features/todo/hooks/use-todos` 같은 deep import는 금지.

### 3. Feature 간 직접 참조 금지
`features/theme`이 `features/todo`를 import 하면 안 된다.
협력이 필요하면 `app/` 레이어에서 조립하거나, 공통 부분을 `shared/`로 내린다.

## 의존성 흐름

```
app/  ─────▶  features/  ─────▶  shared/
                  │
                  └─ 같은 feature 내부:
                     components/ ─▶ hooks/ ─▶ api/ ─▶ types
```

- `app/`은 features와 shared만 import
- `features/[name]`은 같은 feature 내부 + shared만 import
- `shared/`는 외부를 import 하지 않음 (가장 아래 레이어)

## 확장 예시

### TanStack Query로 갈아끼우기
`features/todo/hooks/use-todos.ts` 내부만 `useQuery` / `useMutation`으로 변경.
컴포넌트는 손대지 않음.

### 백엔드 추가
`features/todo/api/todo.api.ts`에서 `localStorage` 대신 `fetch('/api/todos')`로 변경.
hooks도 컴포넌트도 손대지 않음.

### 새 기능 추가 (예: 카테고리)
`features/category/` 폴더를 통째로 추가. 기존 코드는 손대지 않음.
todo와의 협력이 필요하면 페이지 레이어에서 조립.

## 데이터 저장

이 예시는 단순화를 위해 `localStorage`에 데이터를 저장합니다.
실제 프로젝트에서는 `features/todo/api/todo.api.ts`만 교체하면 됩니다.
