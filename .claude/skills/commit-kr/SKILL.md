---
name: commit-kr
description: Udacity 스타일 한글 커밋 메시지를 생성하고 커밋한다
disable-model-invocation: true
allowed-tools: Bash(git *), Read, Grep
argument-hint: "[--push]"
---

현재 변경사항을 분석해서 Udacity 스타일 한글 커밋 메시지를 생성한다.

## 절차

1. `git status`로 변경된 파일 확인
2. `git diff`와 `git diff --staged`로 변경 내용 분석
3. 변경 단위별로 잘게 쪼개서 각각 커밋
4. `git log --oneline -5`로 기존 커밋 스타일 참고

## 커밋 메시지 규칙

```
<prefix>(<scope>): <한글 subject>

- 변경 내용 1
- 변경 내용 2
```

### prefix
- `feat`: 기능 추가
- `fix`: 버그 수정
- `refactor`: 리팩토링
- `style`: UI/스타일/포맷팅
- `chore`: 설정/빌드/패키지
- `docs`: 문서 수정

### 규칙
- subject는 한글, 50자 이내, 마침표 없음
- scope는 선택사항 (컴포넌트명, 모듈명)
- body는 불릿 나열 (2~5줄)
- **Co-Authored-By 절대 금지**
- 파일 단위로 최대한 잘게 쪼개서 커밋

## 인자

- `--push`: 커밋 후 `git push origin main` 실행
- 인자 없으면 커밋만 하고 푸시하지 않음
