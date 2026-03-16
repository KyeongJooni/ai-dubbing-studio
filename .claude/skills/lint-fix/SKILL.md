---
name: lint-fix
description: ESLint + Prettier로 코드 포맷팅 및 린트 수정
disable-model-invocation: true
allowed-tools: Bash, Read, Edit, Glob
argument-hint: "[파일경로 또는 디렉토리]"
---

코드 품질을 점검하고 자동 수정한다.

## 절차

1. 인자로 경로가 주어지면 해당 경로만, 없으면 전체 프로젝트 대상
2. `pnpm lint` 실행해서 ESLint 에러 확인
3. 자동 수정 가능한 항목 처리:
   - import 정렬 (외부 → 내부, 알파벳 순)
   - 미사용 import 제거
   - `type` import는 `import type`으로 통일
4. Prettier 포맷팅 확인
5. 자동 수정 불가능한 항목은 목록으로 보고

## 규칙 참조

- ESLint 설정: `eslint.config.mjs`
- Prettier 설정: `.prettierrc`
- import 순서: 외부 패키지 → `@/` 내부 모듈
