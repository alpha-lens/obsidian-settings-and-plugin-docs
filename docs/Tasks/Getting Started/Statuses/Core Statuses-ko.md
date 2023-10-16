---
publish: true
---

# 핵심 상태

## 개요

핵심 상태는 전통적인 마크다운 작업을 나타냅니다:

```text
- [ ] 아직 완료되지 않은 작업입니다.
- [x] 완료된 작업입니다.
```

이러한 상태는 특별한 CSS 스타일링이나 테마가 필요하지 않으며, Tasks 블록이나 실시간 미리보기에서 올바르게 표시됩니다.

## 설정에서의 핵심 상태

Tasks의 설정에서 초기에 핵심 상태는 다음과 같습니다:

![핵심 상태](../../images/settings-core-statuses.png)

`Todo` 다음에 `Done`으로 나오도록 되어 있어 이전 Tasks 버전과의 호환성을 유지합니다.

> [!info]
만약 원한다면 'Todo' 핵심 상태를 편집하여 Next Status Symbol을 `/`로 변경하고 `Todo` -> `In Progress` -> `Done`으로 활성화할 수 있습니다.

## 핵심 상태 편집하기

핵심 상태를 편집하는 유일한 제약은 그들의 Status Symbol을 변경할 수 없다는 것입니다.

그들의 이름을 변경하거나 다음 문자를 변경하고 싶다면 자유롭게 할 수 있습니다. 실제로 Status Type도 변경할 수 있습니다.

## 자세한 내용

아래는 핵심 상태의 사용 방법입니다:

<!-- placeholder to force blank line before included text --><!-- include: DocsSamplesForStatuses.test.DefaultStatuses_core-statuses.approved.md -->

| 상태 기호 | 다음 상태 기호 | 상태 이름<br>`status.name includes...`<br>`sort by status.name`<br>`group by status.name` | 상태 유형<br>`status.type is...`<br>`sort by status.type`<br>`group by status.type` | 사용자 정의 스타일 필요 |
| ----- | ----- | ----- | ----- | ----- |
| `space` | `x` | Todo (할 일) 	| `TODO` 	| 아니요 |
| `x` 	| `space` 	| Done (완료) 	| `DONE` 	| 아니요 |

<!-- placeholder to force blank line after included text --><!-- endInclude -->
