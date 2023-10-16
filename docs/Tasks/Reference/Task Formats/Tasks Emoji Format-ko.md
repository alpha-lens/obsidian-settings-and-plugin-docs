---
publish: true
---

# 작업 이모지 형식

<span class="related-pages">#task-formats #task-format/tasks</span>

이 예시에서는 Tasks 플러그인의 자체 이모지 표시를 파싱하는 데 지원되는 모든 필드를 보여줍니다.

## 날짜용 작업 이모지 형식

```markdown
- [ ] #task 만들어진 날짜가 있는 작업 ➕ 2023-04-13
- [ ] #task 예정 날짜가 있는 작업 ⏳ 2023-04-14
- [ ] #task 시작 날짜가 있는 작업 🛫 2023-04-15
- [ ] #task 마감 날짜가 있는 작업 📅 2023-04-16
- [x] #task 완료 날짜가 있는 작업 ✅ 2023-04-17
```

자세한 정보는 [[Dates-ko|날짜]]를 참조하세요.

## 우선순위용 작업 이모지 형식

<!-- 스니펫: DocsSamplesForTaskFormats.test.Serializer_Priorities_tasksPluginEmoji-snippet.approved.md -->
```md
- [ ] #task 가장 낮은 우선순위 ⏬
- [ ] #task 낮은 우선순위 🔽
- [ ] #task 보통 우선순위
- [ ] #task 중간 우선순위 🔼
- [ ] #task 높은 우선순위 ⏫
- [ ] #task 가장 높은 우선순위 🔺
```
<!-- endSnippet -->

자세한 정보는 [[Priority-ko|우선순위]]를 참조하세요.

## 재발용용 작업 이모지 형식

```markdown
- [ ] #task 반복 작업입니다 🔁 매일 작업 완료 시
```

자세한 정보는 [[Recurring Tasks-ko|재발용 작업]]을 참조하세요.

## Tasks 이모지 형식의 제한 사항

### 띄어쓰기: NBSP 문자

웹사이트에서 텍스트를 복사하여 붙여넣을 때 때로는 공백을 `NBSP` 문자로 붙여넣는 경우가 있습니다.

이러한 문자는 일반적으로 텍스트 편집기에서 볼 수 있지만 Obsidian에서는 보통 공백처럼 보입니다.

Tasks는 현재 이러한 문자를 공백으로 처리하지 않으므로 이모지와 해당 값이 올바르게 읽어지지 않을 수 있습니다.

이 문제는 [이슈 #606](https://github.com/obsidian-tasks-group/obsidian-tasks/issues/606)에서 추적되고 있습니다.

### 수동으로 추가한 '이중 화살표' 이모지 인식되지 않음

[[작업 이모지 형식#유니코드 변형 선택기]]를 참조하세요.

### 유니코드 변형 선택기

Tasks는 유니코드 [변형 선택기](https://en.wikipedia.org/wiki/Variation_Selectors_(Unicode_block))를 이해하지 못합니다.

수동으로 추가한 경우 Tasks가 고우선순위 이모지 (⏫)를 올바르게 읽는 데 방해가 될 수 있습니다.

이 문제는 [이슈 #2273](https://github.com/obsidian-tasks-group/obsidian-tasks/issues/2273)에서 추적되고 있습니다.