# 사용자 정의 상태

## 소개

> [!released]
사용자 정의 상태는 Tasks 1.23.0에서 도입되었습니다.

사용자 정의 상태는 표준이 아닌 마크다운 작업을 나타냅니다.

다음은 일부 예시 사용자 정의 상태로, 즉 `[`와 `]` 사이에 표준이 아닌 문자가 있는 작업입니다:

```text
- [X] 체크된 작업
- [-] 취소된/중단된 작업
- [?] 질문
- [/] 진행 중인 작업
```

이러한 상태는 **사용자 지정 CSS 스타일링 또는 테마**가 필요합니다. 이를 통해 Tasks 블록이나 실시간 미리보기에서 올바르게 표시됩니다.

다음은 사용자 정의 상태와 스타일링으로 할 수 있는 일부 예시입니다:

![Minimal 테마에서 선택한 체크박스](../../images/theme-minimal-reading-view-sample.png) ![ITS 테마에서 선택한 체크박스](../../images/theme-its-reading-view-sample.png)

## 왜 중요한가요?

지금까지 사람들은 Obsidian에서 사용자 지정 체크박스를 스타일링하기 위해 테마와 CSS 코드 조각을 사용해왔습니다.

Tasks의 사용자 정의 상태를 사용하면 작업의 동작을 **사용자 정의**할 수도 있습니다.

## 기본 사용자 정의 상태

Tasks 설정에서 초기에 나타나는 기본 사용자 정의 상태는 다음과 같습니다:

![기본 사용자 정의 상태](../../images/settings-custom-statuses-initial.png)

이를 활용하는 방법은 다음과 같습니다:

<!-- placeholder to force blank line before included text --><!-- include: DocsSamplesForStatuses.test.DefaultStatuses_custom-statuses.approved.md -->

| 상태 기호 | 다음 상태 기호 | 상태 이름<br>`status.name includes...`<br>`sort by status.name`<br>`group by status.name` | 상태 유형<br>`status.type is...`<br>`sort by status.type`<br>`group by status.type` | 사용자 지정 스타일 필요 |
| ----- | ----- | ----- | ----- | ----- |
| `/` 	| `x` 	| In Progress (진행 중) 	| `IN_PROGRESS` 	| 예 |
| `-` 	| `space` 	| Cancelled (취소됨) 	| `CANCELLED` 	| 예 |

<!-- placeholder to force blank line after included text --><!-- endInclude -->

## 사용자 정의 상태 설정하기

<!-- force a blank line --><!-- include: snippet-statuses-overview.md -->

> [!info]
> Statuses(또는 "대체 체크박스")를 이해하고 설정하는 전체적인 절차:
>
> - Status가 무엇인지 이해하기:
>   - [[Statuses]]
>   - [[Custom Statuses]]
> - 스타일링 체계 선택하기: 이는 사용자 정의 상태의 이름과 기호를 결정합니다.
>   - 몇 가지 일반적인 예는 [[About Status Collections]]에서 확인할 수 있습니다.
> - 스타일링 체계 설치하기
>   - [[사용자 정의 상태 스타일링|사용자 정의 상태를 스타일링하는 방법]]을 따릅니다.
> - Tasks를 사용자 정의 상태에 맞게 구성하기
>   - [[사용자 정의 상태 설정|사용자 정의 상태 설정하는 방법]]을 참조하세요.
> - 선택적으로, 새로운 유연성을 활용하기 위해 작업 검색 업데이트하기
>   - [[Filters#작업 상태 필터|작업 상태 필터]]를 참조하세요.

<!-- force a blank line --><!-- endInclude -->

### 먼저 스타일링 체계 선택하기

원하는 CSS 코드 조각이나 테마를 사용할 수 있습니다. 이미 "사용자 지정 체크박스"를 지원하는 코드 조각이나 테마를 사용 중이라면 해당 항목을 계속 사용하시면 됩니다.

하지만 기본 테마나 "사용자 지정 체크박스" 스타일을 지원하지 않는 테마를 사용하고 있다면 다른 스타일링 체계를 선택해야 합니다.

[[About Status Collections]]에는 Tasks에서 이미 지원하는 것 중에서 선택할 수 있는 목록이 있어 도움이 될 것입니다.

### 스타일링 체계 설치하기

예를 들어, [[사용자 정의 상태 스타일링|사용자 정의 상태를 스타일링하는 방법]]을 따라 진행할 수 있습니다.

### 사용자 정의 상태 편집하기

스타일링 기능을 선택한 후에는 사용자 정의 상태에 어떤 문자와 기호를 사용할지 결정해야 합니다.

그런 다음 [[사용자 정의 상태 설정|사용자 정의 상태 설정하는 방법]]을 따르십시오.

> [!warning]
사용자 정의 상태 설정 전에 선택한 CSS 코드 조각이나 테마를 설정해야 합니다.