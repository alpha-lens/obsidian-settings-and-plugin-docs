---
publish: true
---

# 상태 유형

## 개요

다양한 [[Custom Statuses-ko|사용자 정의 상태]]를 생성할 수 있는 새로운 기능을 통해, Tasks는 각 상태에 대해 충분한 정보를 알아야 합니다. 이를 통해 다음과 같은 결정을 내릴 수 있습니다:

- 검색 시 작업을 어떻게 처리할 것인지,
- 해당 상태를 가진 작업이 토글될 때 어떤 동작을 수행할 것인지 (완료 날짜 추가 또는 제거, 반복 작업 생성 등).

이러한 문제는 '상태 유형'의 도입으로 해결되었습니다. '상태 유형'은 다음 5가지 종류의 상태로 구성됩니다:

- `TODO`
- `IN_PROGRESS`
- `DONE`
- `CANCELLED`
- `NON_TASK`

## 각 유형

### TODO

당연히 이해하기 쉽습니다. '아직 시작되지 않은 것'으로 생각할 수 있습니다.

### IN_PROGRESS

이것의 사용은 완전히 선택적입니다. 이미 시작된 작업을 우선적으로 완료하는 것이 유용할 수 있습니다.

### DONE

`DONE` 유형은 다음 사항을 결정하는 데 사용됩니다:

- 작업을 토글할 때 완료 날짜를 추가하거나 제거해야 하는지 여부.
- 반복 작업이 완료되었을 때 새로운 인스턴스를 생성해야 하는지 여부.

### CANCELLED

일반적으로 처음에는 수행해야 할 작업으로 생각했지만, 이후 어떤 이유로 인해 필요하지 않음을 발견한 작업에 대해 사용됩니다.

이전에는 이러한 작업을 완료로 표시하는 것만 가능했습니다. 하지만 이는 오해를 불러일으킬 수 있었습니다. 또한, 그들에게 완료 날짜를 추가할 수도 있어서 더욱 오해의 소지가 있었습니다.

### NON_TASK

사용자 정의 체크박스 스타일은 종종 'Pro'와 'Con' 목록과 같은 비-작업 개념에 사용됩니다.

상태 중 일부에 이 유형을 할당하여 작업 검색에서 제외할 수 있는 필터를 작성할 수 있도록 할 수도 있습니다.

## 상태 유형 관련 지침

- `status.type`은 검색 가능합니다. 예를 들어 `status.type is IN_PROGRESS`와 같이 사용할 수 있습니다.
  - 동일한 상태 유형을 가진 상태들을 여러 개 가질 수 있으며, `status.type`으로 편리하게 검색할 수 있습니다.
- 다음과 같은 명령도 사용할 수 있습니다:
  - `sort by status.type`
  - `group by status.type`

`status.type` 필터는 Tasks 코드에서 새로운 패턴을 사용하고 있으며, 일부는 '[오류 메시지 대신 도움말 메시지 작성](https://twitter.com/travis_simon/status/1069074730211135488)'라고 부르기도 합니다.

만약 Tasks가 `status.type` 지시문을 이해하지 못하는 경우, 다음과 같은 메시지가 표시됩니다:

```text
Tasks query: Invalid status.type instruction: 'status.type in progress'.
    Allowed options: 'is' and 'is not' (without quotes).
    Allowed values:  TODO DONE IN_PROGRESS CANCELLED NON_TASK
                     Note: values are case-insensitive,
                           so 'in_progress' works too, for example.
    Example:         status.type is not NON_TASK
```

### Tasks 필터에서의 상태 유형

상태 유형의 이러한 추가적인 유연성으로 인해 Tasks 검색에 어떤 영향을 미칠까요?

예를 들어, 기존의 `done` 및 `not done` 필터는 어떻게 사용되는 걸까요?

자세한 내용에 관심이 있다면, 다음 표는 각 상태 유형이 Tasks에서의 동작을 보여줍니다. 각 열은 해당 상태 유형을 가진 대표적인 예제 작업을 보여줍니다.

표시된 작업은 맥락을 이해하기 위한 예시입니다. `~` 열은 `NON_TASK`의 동작을 보여주기 위한 임의의 예시입니다. 이러한 유형을 사용자 정의 상태 중 어떤 것에 할당할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: DocsSamplesForStatuses.test.Status_Transitions_status-types.approved.md -->

아래는 주어진 표의 번역입니다.

| 작업 및 상태 유형 | TODO | 진행 중 | 완료 | 취소됨 | 비 작업 |
| ----- | ----- | ----- | ----- | ----- | ----- |
| 예시 작업 | `- [ ] 데모` | `- [/] 데모` | `- [x] 데모` | `- [-] 데모` | `- [~] 데모` |
| `not done`와 일치                          | 예 | 예 | 아니요 | 아니요 | 아니요 |
| `done`와 일치                             | 아니요 | 아니요 | 예 | 예 | 예 |
| `status.type is TODO`와 일치              | 예 | 아니요 | 아니요 | 아니요 | 아니요 |
| `status.type is IN_PROGRESS`와 일치       | 아니요 | 예 | 아니요 | 아니요 | 아니요 |
| `status.type is DONE`와 일치              | 아니요 | 아니요 | 예 | 아니요 | 아니요 |
| `status.type is CANCELLED`와 일치         | 아니요 | 아니요 | 아니요 | 예 | 아니요 |
| `status.type is NON_TASK`와 일치          | 아니요 | 아니요 | 아니요 | 아니요 | 예 |
| `status.name includes todo`와 일치        | 예 | 아니요 | 아니요 | 아니요 | 아니요 |
| `status.name includes in progress`와 일치 | 아니요 | 예 | 아니요 | 아니요 | 아니요 |
| `status.name includes done`와 일치        | 아니요 | 아니요 | 예 | 아니요 | 아니요 |
| `status.name includes cancelled`와 일치   | 아니요 | 아니요 | 아니요 | 예 | 아니요 |
| `group by status`                 | 할 일 | 완료 | 완료 | 완료 | 완료 |
| `group by status.type`            | TODO | 진행 중 | 완료 | 취소됨 | 비 작업 |
| `group by status.name`            | 할 일 | 진행 중 | 완료 | 취소됨 | 나만의 사용자 정의 상태 |

<!-- placeholder to force blank line after included text --><!-- endInclude -->

