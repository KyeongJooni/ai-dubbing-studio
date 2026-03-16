---
name: check-deploy
description: Vercel 배포 상태를 확인하고 빌드 에러가 있으면 수정한다
disable-model-invocation: true
allowed-tools: Bash, Read, Edit, Grep, Glob, WebFetch
---

Vercel 배포 상태를 확인하고 문제가 있으면 해결한다.

## 절차

1. `pnpm build`로 로컬 빌드 먼저 확인
2. 빌드 에러 발생 시:
   - 에러 메시지 분석
   - 원인 파일 찾아서 수정
   - 다시 빌드해서 확인
3. 빌드 성공 시:
   - 타입 에러 없는지 확인
   - 환경변수 누락 여부 체크

## 주의사항

- Next.js 16에서 `reactCompiler`는 최상위 설정 (experimental 아님)
- `maxDuration`은 API Route 파일 최상위에 export
- 서버 컴포넌트에서 "use client" 훅 사용하지 않았는지 확인
