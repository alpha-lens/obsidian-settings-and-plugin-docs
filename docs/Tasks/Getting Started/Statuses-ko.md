---
publish: true
---

# 상태

## 소개

> [!released]
사용자 정의 상태는 Tasks 1.23.0에서 도입되었습니다.

이 페이지는 **사용자 정의 상태**(Custom Statuses)를 사용하는 Tasks에 대한 개요를 제공합니다. 일부 사람들은 이를 사용자 정의 체크박스 또는 대체 체크박스로 부르기도 합니다.

다음과 같은 작업을 수행할 수 있습니다:

![Minimal 테마에서 선택된 체크박스](../images/theme-minimal-reading-view-sample.png) ![ITS 테마에서 선택된 체크박스](../images/theme-its-reading-view-sample.png)

### 관련 페이지

이 페이지의 배경 정보에 익숙해지면, 다음과 같은 관련 페이지에서 자세한 정보를 얻을 수 있습니다.

- [[Style custom statuses-ko|사용자 정의 상태 스타일링 방법]].
- [[Set up custom statuses-ko|사용자 정의 상태 설정 방법]].
- [[About Status Collections-ko|상태 컬렉션에 대해]]

## 상태 설정이 필요한가요?

모든 작업이 `[ ]`와 `[x]`로 시작하는 것으로 만족한다면, **아니오**, Tasks의 상태 기능을 무시하셔도 됩니다.

## 상태에 대하여

### 상태란 무엇인가요?

Tasks 플러그인의 모든 작업은 이제 상태를 가지고 있습니다.

상태는 다음과 같은 Tasks의 용어입니다:

1. 작업 라인의 `[`와 `]` 사이에 있는 문자(`기호`)
2. 그리고 해당 문자로 시작하는 모든 작업을 어떻게 처리할지 알려주기 위해 사용자 정의할 수 있는 일부 옵션

일부 Obsidian 사용자들은 이를 '대체 체크박스'와 같은 다른 이름으로 부르지만, 실제로는 특정 상태를 가진 작업의 *동작*과 관련된 것보다는 어떻게 표시되는지에 대한 것입니다.

### 상태에 포함되는 내용

각 상태마다 수정할 수 있는 옵션은 다음과 같습니다:

![작업 상태 모달](../images/settings-custom-statuses-dialog-2.png)

여기에 더 자세한 내용이 있습니다.

- **상태 기호**
  - 작업 시작 부분의 `[]` 안에 있는 단일 문자.
  - 이 문자는 테마나 CSS 스니펫에서 작업을 어떻게 렌더링할지 제어합니다.
- **상태 이름**
  - 상태에 대한 이름.
  - 유연하게 사용 가능합니다: 사용자 정의 상태에서 원하는 이름을 사용할 수 있습니다.
  - `status.name`으로 검색 가능하며, 예를 들어 `status.name includes My custom in-progress status`와 같이 사용할 수 있습니다.
- **다음 상태 기호**
  - 작업이 토글될 때 사용할 상태 기호입니다.
- **상태 유형**
  - `TODO`, `IN_PROGRESS`, `DONE`, `CANCELLED`, `NON_TASK` 중 하나입니다.
  - Tasks는 각 상태의 유형을 알아야 하므로, 검색 시 어떻게 처리해야 할지 및 해당 상태가 토글됐을 때 어떻게 처리해야 할지를 알 수 있습니다.
  - 유형은 `status.type`으로 검색 가능하며, 예를 들어 `status.type is IN_PROGRESS`와 같이 사용할 수 있습니다.
  - 다음과 같은 옵션도 제공됩니다:
    - `sort by status.type`
    - `group by status.type`
  - 자세한 내용은 [[Status Types-ko|상태 유형]]을 참조하세요.

### 알 수 없는 상태

Tasks가 인식하지 못하는 상태 기호가 있는 줄을 읽으면 어떻게 될까요?

그러한 모든 작업에는 "Unknown"라는 이름의 상태가 지정되며, 다음과 같은 속성을 가집니다:

| 속성             | 값                                                               |
| ---------------- | ---------------------------------------------------------------- |
| 상태 기호        | 작업 라인의 `[`와`]` 사이에 있는 인식되지 않은 문자                |
| 상태 이름        | **Unknown**                                                       |
| 다음 상태 기호   | `x`                                                               |
| 상태 유형        | `TODO`                                                            |

### 완료 날짜, 반복 및 상태

작업의 상태 유형이 `DONE`으로 변경되면 다음 사항을 제어합니다:

- 작업이 완료 날짜를 얻는 시점 (완료 날짜가 설정에서 활성화된 경우)
- 반복 작업의 새로운 복사본이 생성되는 시점

작업의 상태 유형이 `DONE`에서 변경될 때 다음 사항을 제어합니다:

- 작업이 완료 날짜를 **잃는** 시점 (완료 날짜가 설정에서 활성화된 경우)

## 상태가 무엇을 할 수 있나요?

이제 상태에 대한 내용을 알아보았으니, 상태로 어떤 작업을 할 수 있는지 살펴보겠습니다.

상태를 사용하여 작업의 체크박스를 클릭하거나 토글할 때 Tasks가 어떻게 동작하는지 제어할 수 있습니다.

[[Example Statuses-ko|예시 상태]] 페이지에는 다양한 예시가 있으며 참고할 수 있습니다.

## 상태에 대해 더 알아보기

### 기본 상태

기본 상태는 일반적인 마크다운 작업을 나타냅니다:

```text
- [ ] 아직 완료되지 않은 작업입니다.
- [x] 완료된 작업입니다.
```

이러한 기본 상태는 Tasks 블록이나 실시간 미리보기에서 올바르게 표시되기 위해 추가적인 사용자 정의 CSS 스타일링이나 테마가 필요하지 않습니다.

Tasks 1.23.0 이전에는 이러한 기본 상태만 Tasks에서 인식했습니다.

자세한 내용은 [[Core Statuses-ko|기본 상태]]를 참조하세요.

### 사용자 정의 상태

사용자 정의 상태는 비표준 마크다운 작업을 나타냅니다.

다음은 사용자 정의 상태를 가진 예제 작업입니다. 즉, `[`와 `]` 사이에 비표준 문자가 있는 경우입니다:

```text
- [X] 체크된 항목
- [-] 중단/취소된 항목
- [?] 질문 항목
- [/] 반 완료/진행 중인 항목
```

이러한 사용자 정의 상태는 **추가적인 사용자 정의 CSS 스타일링이나 테마**가 필요합니다. 그렇지 않으면 Tasks 블록이나 실시간 미리보기에서 올바르게 표시되지 않습니다.

### 그렇게 중요한 이유는?

사람들은 오래 전부터 Obsidian에서 테마와 CSS 스니펫을 사용하여 사용자 지정 체크박스를 스타일링해왔습니다.

Tasks의 사용자 정의 상태를 사용하면 **작업의 동작도 커스터마이즈**할 수 있게 됩니다.

### 사용자 정의 상태 설정하기

<!-- force a blank line --><!-- include: snippet-statuses-overview.md -->

> [!info]
> Statuses (or "Alternate Checkboxes") 설정을 이해하고 설정하는 넓은 단계:
>
> - Statuses(상황)가 무엇인지 이해하기:
>   - [[Statuses-ko|상태]]
>   - [[Custom Statuses-ko|커스텀 상태]]
> - 원하는 스타일링 체계 선택: 여기서 이름과 심볼 등과 같은 커스텀 status 설정됩니다:
>   - 일부 일반적인 것들은 [[About Status Collections-ko|About Status Collections]] 에서 확인 가능합니다.
> - 원하는 스타일링 체계 설치하기
>   - [[Style custom statuses-ko|How to style custom statuses]]
> - Tasks 구성하여 커스텀 status 활용하기
>   - [[Set up custom statuses-ko|How to set up your custom statuses]]
>- 원한다면, 유연성을 활용하기 위해 tasks 검색 업데이트하기 
>-[[Filters#Filters for Task Statuses-ko|Filters for Task Statuses]]

<!-- force a blank line --><!-- endInclude -->

### 작업 상태 사용하기

### 작업 편집

[[Create or edit Task-ko#Status|'작업 생성 또는 편집' 모달]]을 사용하여 작업의 상태를 변경할 수 있습니다.

### 관련 명령어

> [!info]
사용자 정의 상태를 적용하는 새로운 명령어는 아직 없습니다.
이에 대해서는 [이슈 #1486](https://github.com/obsidian-tasks-group/obsidian-tasks/issues/1486)에서 추적하고 있습니다.

### 관련 검색

- `done` - `TODO` 및 `CANCELLED` 상태 유형과 일치합니다.
- `not done` - `TODO` 및 `IN_PROGRESS` 상태 유형의 작업과 일치합니다.
- **상태 이름**
  - `status.name` 텍스트 검색
  - `sort by status.name`
  - `group by status.name`
- **상태 유형**
  - `status.type` 텍스트 검색
  - `sort by status.type`
  - `group by status.type`

자세한 내용은 [[Filters-ko#작업 상태에 대한 필터|작업 상태에 대한 필터]]를 참조하세요.

> [!info]
저희는 'status.symbol'을 추가할 계획입니다. 이에 대해서는 [이슈 #1630](https://github.com/obsidian-tasks-group/obsidian-tasks/issues/1630)에서 추적하고 있습니다.

## 크레딧: Sytone과 'Tasks SQL Powered' 플러그인

이 플러그인은 사용자 정의 상태를 읽고, 검색하고, 편집하는 구현을 가능하게 한 [Sytone](https://github.com/sytone)의 작업과 ['Tasks SQL Powered'](https://github.com/sytone/obsidian-tasks-x)라고 불리는 Tasks 포크의 공헌으로 인해 가능해졌습니다. [^task-x-version]

Tasks에서 'Tasks SQL Powered'로부터 코드가 복사된 경우, Sytone은 공동 저자로 명시되어 있으며, 이러한 커밋은 GitHub 사이트에서 확인할 수 있습니다: [Commits "Co-Authored-By: Sytone"](https://github.com/search?q=repo%3Aobsidian-tasks-group%2Fobsidian-tasks+%22Co-Authored-By%3A+Sytone%22&type=commits&s=committer-date&o=desc).

그 후 Tasks에서 사용자 정의 상태 구현은 'Tasks SQL Powered'와 크게 다르게 발전되어 왔습니다. 그러나 새로운 기능과 수정 사항은 Sytone의 기초 작업 없이는 불가능했습니다. 이에 대해 매우 감사드립니다.

[^task-x-version]: 'Tasks SQL Powered' 버전 정보: [revision 2c0b659](https://github.com/sytone/obsidian-tasks-x/tree/2c0b659457cc80806ff18585c955496c76861b87), 날짜: 2022년 8월 2일