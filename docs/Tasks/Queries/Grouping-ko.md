---
publish: true
---

# 그룹화

<span class="related-pages">#feature/grouping</span>

## 목차

이 페이지는 길다. 주요 섹션에 대한 몇 가지 링크는 다음과 같습니다.

- [[#기본사항]]
- [[#사용자 정의 그룹]]
- [[#작업 상태별 그룹]]
- [[#작업에서 날짜별 그룹]]
- [[#다른 작업 속성별 그룹]]
- [[#파일 속성별 그룹]]
- [[#여러 그룹]]
- [[#그룹 세분화]]
- [[#노트]]
- [[#스크린샷]]
- [[#예제]]

## 기본사항

> [!released]
Tasks 1.6.0에서 도입되었습니다.

기본적으로 Tasks는 작업을 단일 목록으로 표시합니다.

일치하는 작업을 제목으로 나누려면 쿼리에 `group by` 라인을 추가할 수 있습니다.

## 사용자 정의 그룹

> [!released]
> `group by function`은 Tasks 4.0.0에서 도입되었습니다.

Tasks는 많은 내장 그룹화 옵션을 제공하지만 모든 사용자가 원하는 대로 작동하지 않을 수 있습니다.

이제 Tasks에는 놀라운 유연성을 제공하는 자신만의 **사용자 정의 그룹**을 만들 수 있는 강력한 메커니즘이 있습니다.

Tasks가 사용자의 기본 설정을 충족시키지 못할 때를 위한 설명이 포함된 많은 `group by function` 사용 예제가 아래 설명서에 있습니다.

[[Custom Grouping]]에서 이 강력한 기능에 대해 자세히 알아보세요.

## 작업 상태별 그룹

자세한 정보 및 사용자 지정 상태 추가에 대한 자세한 내용은 [[Statuses]]를 참조하십시오.

### 상태

- `group by status` (대문자로 표시된 Done 또는 Todo)
  - "Done" 그룹은 기본으로 "Todo" 그룹 앞에 표시됩니다.
    - "Done"은 작업 상태 유형 `DONE`, `CANCELLED` 및 `NON_TASK`에 사용됩니다.
    - "Todo"는 유형 `TODO` 및 `IN_PROGRESS`를 갖는 상태 유형에 사용됩니다.

Tasks 4.0.0부터 **상태별 사용자 정의 그룹**을 생성할 수 있습니다.

```text
group by function task.isDone ? "Action Required" : "Nothing To Do"
```

- 참일 경우 (?: 이후), 참일 경우와 거짓일 경우 값 선택을 위해 JavaScript의 삼항 연산자를 사용합니다.

### 상태 이름

- `group by status.name`
  - 사용자 정의 상태에 지정한 이름별로 그룹화합니다.

> [!released]
`group by status.name`은 Tasks 1.23.0에 도입되었습니다.

Tasks 4.0.0부터 **상태 이름별 사용자 정의 그룹**을 생성할 수 있습니다.

```text
group by function task.status.name
```

- "group by status.name"과 동일합니다.

```text
group by function task.status.name.toUpperCase()
```

- 상태 이름을 대문자로 변환합니다.

### 상태 유형

- `group by status.type`
  - 사용자 지정 상태에 지정한 유형으로 그룹화합니다.
  - 그룹은 다음과 같은 순서로 표시되며 이 그룹명을 갖습니다.
    - `IN_PROGRESS`
    - `TODO`
    - `DONE`
    - `CANCELLED`
    - `NON_TASK`

> [!released]
`group by status.type`은 Tasks 1.23.0에 도입되었습니다.

Tasks 4.0.0에서는 **상태 유형별 사용자 정의 그룹**을 생성할 수 있습니다.

Tasks 4.9.0에 `task.status.typeGroupText`가 추가되었습니다.

```text
group by function task.status.type
```

- "group by status.type"과 다르게 상태 유형을 알파벳순으로 정렬합니다.

```text
group by function task.status.typeGroupText
```

- "group by status.type"과 같은 순

서로 상태 유형을 정렬합니다.

### 상태 기호

기본적으로 상태 기호로 그룹화하는 지시문이 없습니다.

Tasks 4.0.0에서 **상태 기호별 사용자 정의 그룹**을 생성할 수 있습니다.

```text
group by function "Status symbol: " + task.status.symbol.replace(" ", "space")
```

- 공백 문자를 표시하고 상태 기호로 그룹화합니다.

### 다음 상태 기호

기본적으로 다음 상태 기호로 그룹화하는 지시문이 없습니다.

Tasks 4.0.0에서 **다음 상태 기호별 사용자 정의 그룹**을 생성할 수 있습니다.

```text
group by function "Next status symbol: " + task.status.nextSymbol.replace(" ", "space")
```

- 공백 문자를 표시하고 다음 상태 기호로 그룹화합니다.

## 작업에서 날짜별 그룹

### 마감일

- `group by due`
  - 작업의 마감일, 요일 또는 `마감일 없음`을 포함합니다.

> [!released]
>
> - `due` 그룹화 옵션이 Tasks 1.7.0에 도입되었습니다.

Tasks 4.0.0에서는 **마감일별 사용자 정의 그룹**을 생성할 수 있습니다.

이러한 예는 모두 `task.due` 속성을 사용하는데, 이 속성은 `TasksDate` 객체입니다. 이 객체의 기능을 탐색하려면 [[Task Properties#Values in TasksDate Properties|Values in TasksDate Properties]]를 참조하십시오.

이러한 예 중 일부는 [moment.js 형식 문자](https://momentjs.com/docs/#/displaying/format/)을 사용합니다.

```text
group by function task.due.category.groupText
```

- 4가지 넓은 범주로 작업 마감일을 그룹화합니다: `마감일 지남`, `오늘`, `미래` 및 `마감일 없음`, 이 순서대로 표시됩니다.
- 제목이 많은 경우 마감일 제목을 어떤 종류의 구조로 나눠 보고자 할 때 `group by due` 앞에 이를 시도해 보십시오.
- "task.due.category.name"과 "task.due.category.sortOrder" 값도 사용할 수 있습니다.

```text
group by function task.due.fromNow.groupText
```

- [지금부터 시간](https://momentjs.com/docs/#/displaying/fromnow/)에 따라 그룹화합니다. 예를 들어 `8일 전`, `11시간 후`입니다.
- 마감일이 없으면 빈 문자열(제목 없음)을 사용합니다.
- "task.due.fromNow.name" 및 "task.due.fromNow.sortOrder" 값을 사용할 수도 있습니다.

```text
group by function task.due.format("YYYY-MM-DD dddd")
```

- "마감일별 그룹화"와 유사하지만 마감일이 없을 경우 제목 "마감일 없음" 대신 제목 없이 표시됩니다.

```text
group by function task.due.formatAsDate()
```

- 날짜를 YYYY-MM-DD로 포맷하거나 마감일이 없으면 빈 문자열(제목 없음)을 사용합니다.
- 참고:
  - 이것은 디스플레이 목적으로 표시됩니다.
  - 현재 Tasks 플러그인은 시간 저장을 지원하지 않습니다.
  - 작업에 시간을 추가하지 마십시오. 이로 인해 작업 데이터의 읽기가 깨집니다.

```text
group by function task.due.formatAsDateAndTime()
```

- 날짜를 YYYY-MM-DD HH:mm 형식으로 포맷하거나 마감일이 없으면 빈 문자열을 사용합니다.
- 참고:
  - 이것은 디스플레이 목적으로 표시됩니다.
  - 현재 Tasks 플러그인은 시간 저장을 지원하지 않습니다.
  - 작업에 시간을 추가하지 마십시오. 이로 인해 작업 데이터의 읽기가 깨집니다.

```text
group by function task.due.format("YYYY[%%]-MM[%%] MMM", "마감일 없음")
```

- 월별 그룹화, 예를 들어 `2023%%-05%% May` ...
  - ... 이것은 Obsidian에서 `2023 May`로 렌더링됩니다.
- 날짜 제목의 정렬 순서를 제어하기 위해 두 개의 `%%` 문자 사이에 숨겨진 월 번호가 추가되고 주석 처리됩니다.
- 형식 문자열에서 문자를 이스케이프하려면 문자를 대괄호로 둘러싸면 됩니다(여기서 `[%%]`).

```text
group by function task.due.format("YYYY[%%]-MM[%%] MMM [- 주] WW")
```

- 월별 그룹화 및 주 번호별 그룹화, 예를 들어 `2023%%-05%% May - Week 22` ...
  - ... 이것은 Obsidian에서 `2023 May - Week 22`로 렌더링됩니다.
  - 월 번호가 내장되지 않았다면 어떤 해에서는 연도의 첫 주 또는 마지막 주가 비논리적인 순서로 표시됩니다.

![마감일 범주별로 그룹화한 작업, 그리고 개별 마감일로 그룹화한 것|600](../images/tasks_custom_groups_categorise_dates.png)

작업을 먼저 "마감일 지남", "오늘", "미래" 및 "마감일 없음"이라는 강조된 단어로 그룹화

하고 그 다음 각 마감일로 그룹화한 샘플 이미지를 표시합니다.

### 완료 날짜

- `group by done`
  - 작업의 완료 날짜, 요일 또는 `완료 날짜 없음`을 포함합니다.

> [!released]
>
> - `done` 그룹화 옵션이 Tasks 1.7.0에 도입되었습니다.

Tasks 4.0.0에서 **완료 날짜별 사용자 정의 그룹**을 생성할 수 있습니다.

```text
group by function task.done.format("YYYY-MM-DD dddd")
```

- "완료 날짜별 그룹화"와 유사하지만 완료 날짜가 없을 경우 제목 "완료 날짜 없음" 대신 제목 없이 표시됩니다.

더 많은 예제는 [[#Due Date]]를 참조하십시오.

### 예정 날짜

- `group by scheduled`
  - 작업의 예정 날짜, 요일 또는 `예정 날짜 없음`을 포함합니다.

> [!released]
>
> - `scheduled` 그룹화 옵션이 Tasks 1.7.0에 도입되었습니다.

Tasks 4.0.0에서 **예정 날짜별 사용자 정의 그룹**을 생성할 수 있습니다.

```text
group by function task.scheduled.format("YYYY-MM-DD dddd")
```

- "예정 날짜별 그룹화"와 유사하지만 예정 날짜가 없을 경우 제목 "예정 날짜 없음" 대신 제목 없이 표시됩니다.

더 많은 예제는 [[#Due Date]]를 참조하십시오.

### 시작 날짜

- `group by start`
  - 작업의 시작 날짜, 요일 또는 `시작 날짜 없음`을 포함합니다.

> [!released]
>
> - `start` 그룹화 옵션이 Tasks 1.7.0에 도입되었습니다.

Tasks 4.0.0에서 **시작 날짜별 사용자 정의 그룹**을 생성할 수 있습니다.

```text
group by function task.start.format("YYYY-MM-DD dddd")
```

- "시작 날짜별 그룹화"와 유사하지만 시작 날짜가 없을 경우 제목 "시작 날짜 없음" 대신 제목 없이 표시됩니다.

더 많은 예제는 [[#Due Date]]를 참조하십시오.

### 생성 날짜

- `group by created`
  - 작업의 생성 날짜, 요일 또는 `생성 날짜 없음`을 포함합니다.

> [!released]
`created` 그룹화 옵션은 Tasks 2.0.0에서 도입되었습니다.

Tasks 4.0.0에서는 이제 **생성 날짜별 사용자 정의 그룹**을 생성할 수 있습니다.

```text
group by function task.created.format("YYYY-MM-DD dddd")
```

- "생성 날짜별 그룹화"와 유사하지만 생성 날짜가 없을 경우 제목 "생성 날짜 없음" 대신 제목 없이 표시됩니다.

더 많은 예제는 [[#Due Date]]를 참조하십시오.

### 발생

- `group by happens`
  - 시작 날짜, 예정 날짜 및 완료 날짜 중 가장 빠른 날짜를 포함하며, 이러한 날짜가 설정되지 않은 경우 `발생 날짜 없음`을 포함합니다.

> [!released]
`happens` 그룹화 옵션은 Tasks 1.11.0에 도입되었습니다.

Tasks 4.0.0에서는 이제 **발생 날짜별 사용자 정의 그룹**을 생성할 수 있습니다.

```text
group by function task.happens.format("YYYY-MM-DD dddd")
```

- "발생 날짜별 그룹화"와 유사하지만 발생 날짜가 없을 경우 제목 "발생 날짜 없음" 대신 제목 없이 표시됩니다.

더 많은 예제는 [[#Due Date]]를 참조하십시오.

## 다른 작업 속성별 그룹화

위의 날짜 관련 그룹과 함께 개별 작업의 속성에서 그룹을 만들 수 있습니다.

### 설명

설명으로 그룹화하는 내장 명령어가 없습니다.

Tasks 4.0.0에서는 **설명별 사용자 정의 그룹**을 생성할 수 있습니다.

```text
group by function task.description
```

- 설명으로 그룹화합니다.
- 같은 작업의 완료된 반복을 찾는 데 유용할 수 있습니다.

```text
group by function task.description.toUpperCase()
```

- 설명을 대문자로 변환합니다.

```text
group by function task.description.slice(0, 25)
```

- 설명을 최대 25자까지 자르고 해당 문자열로 그룹화합니다.

```text
group by function task.description.replace('short', '==short==')
```

- 그룹 설명에서 "short"라는 단어를 강조합니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 설명에서 태그 제외

Tasks 4.2.0부터 **[[Custom Grouping|사용자 정의 그룹화]]**에서 설명에서 태그를 제거하여 사용할 수 있습니다.

`task.descriptionWithoutTags` 값은 설명에서 모든 태그를 제거한 복사본을 반환합니다. 따라서 태그만 다를 뿐 설명이 동일한 작업을 그룹화할 수 있습니다.

```text
group by function task.descriptionWithoutTags
```

- `group by description`와 유사하지만 그룹 제목에서 태그를 제거합니다.
- 이것은 어떤 작업의 설명이 일부 반복에서 다르더라도 동일한 작업의 완료된 반복을 찾는 데 유용할 수 있습니다.

### 중요도

- `group by priority`
  - 작업의 중요도, 즉 다음 중 하나:
    - `가장 높은 중요도`
    - `높은 중요도`
    - `중간 중요도`
    - `보통 중요도`
    - `낮은 중요도`
    - `가장 낮은 중요도`

> [!released]
>
> - `priority` 그룹화 옵션은 Tasks 1.11.0에 도입되었습니다.

Tasks 4.0.0에서는 이제 중요도 이름 및 숫자별 **[[사용자 정의 그룹화|사용자 정의 그룹화]]**가 가능합니다.

`task.priorityNameGroupText`는 Tasks 4.9.0에 추가되었습니다.

중요도 이름을 사용하는 경우:

```text
group by function task.priorityName
```

- 작업의 중요도 이름별로 그룹화합니다.
- 중요도 이름은 알파벳 순으로 표시됩니다.
- 기본 중요도는 "보통"으로 호출되며 `group by priority`에서 기본 중요도를 "없음"으로 호출하는 것과 대조적입니다.

```text
group by function task.priorityNameGroupText
```

- 작업의 중요도 이름별로 그룹화합니다.
- 중요도 이름은 가장 높은 중요도부터 가장 낮은 중요도까지 표시됩니다.
- 기본 중요도는 "보통"으로 호출되며 `group by priority`에서 기본 중요도를 "없음"으로 호출하는 것과 대조적입니다.

중요도 번호를 사용하는 경우:

```text
group by function task.priorityNumber
```

- 가장 높은 중요도가 0이고 가장 낮은 중요도가 5인 작업의 중요도 번호로 그룹화합니다.

### 긴급도

- `group by urgency` ([[Urgency|긴급도]])
  - 그룹은 가장 높은 긴급성부터 가장 낮은 긴급성까지 실행됩니다.
  - `group by urgency reverse`를 사용하여 순서를 반전시킬 수 있습니다.

> [!released]
>
> - `urgency` 그룹화 옵션은 Tasks 3.6.0에 도입되었습니다.
> - Tasks 4.0.0에서 `group by urgency`의 순서가 반전되어 가장 긴급한 작업을 먼저 표시합니다. 원래 순서를 얻으려면 `reverse`를 추가하거나 제거하십시오.

Tasks 4.0.0에서는 이제 **[[사용자 정의 그룹화|사용자 정의 그룹화]]**를 통해 긴급도별로 그룹화할 수 있습니다.

```text
group by function task.urgency.toFixed(3)
```

- 긴급성을 소수점 3자리까지 표시합니다. 내장 "group by urgency"는 2자리를 사용합니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 반복

- `group by recurring`
  - 작업이 반복되는지 여부: `반복` 또는 `반복 아님`.
- `group by recurrence`
  - 작업의 반복 규칙, 예를 들어 `매주 일요일마다` 또는 비반복 작업의 경우 `없음`입니다.
  - 표시된 텍스트는 프로그램적으로 생성되어 표준화되므로 수동으로 입력한 작업의 텍스트와 정확히 일치하지 않을 수 있습니다. 예를 들어 "🔁 매주 일요일"이 있는 작업은 "매주 일요일마다"로 그룹화됩니다.

> [!released]
>
> - `recurring` 및 `recurrence` 그룹화 옵션은 Tasks 1.11.0에 도입되었습니다.

Tasks 4.0.0에서는 이제 **[[사용자 정의 그룹화|사용자 정의 그룹화]]**를 통해 반복별로 그룹화할 수 있습니다.

```text
group by function task.isRecurring ? "반복" : "반복 아님"
```

- JavaScript의 삼항 연산자를 사용하여 참인 경우(?)와 거짓인 경우(:)에 대한 작업을 선택합니다.

```text
group by function task.recurrenceRule.replace('when done', '==when done==')
```

- 반복 규칙을 그룹화하며 "when done"이라는 단어가 나오면 강조 표시합니다.

### 태그

태그 동작에 대한 중요한 정보는 [[태그|Tags]]에서 확인하십시오.

- `group by tags`
  - 작업의 태그 또는 `(태그 없음)`입니다. 작업에 여러 태그가 있는 경우 모든 태그 아래에 나타납니다.

> [!released]
>
> - `tags` 그룹화 옵션은 Tasks 1.10.0에 도입되었습니다.

Tasks 4.0.0에서는 이제 **[[사용자 정의 그룹화|사용자 정의 그룹화]]**를 통해 태그별로 그룹화할 수 있습니다.

```text
group by function task.tags
```

- "(태그 없음)" 대신 빈 제목을 가진 "태그별로 그룹화"와 유사합니다.

```text
group by function task.tags.join(", ")
```

- 여러 태그를 가진 작업은 모든 태그를 결합한 제목으로 나열됩니다.
- 쉼표로 구분하면 제목의 태그를 클릭할 수 있습니다.

```text
group by function task.tags.sort().join(", ")
```

- 위와 동일하지만 태그의 순서를 먼저 정렬하면 최종 제목이 작업의 태그 순서에 독립적이라는 것이 보장됩니다.

```text
group by function task.tags.filter( (tag) => tag.includes("#context/") )
```

- "#context/"를 포함하는 태그에 대한 제목만 생성합니다.

```text
group by function task.tags.filter( (tag) => ! tag.includes("#tag") )
```

- "#tag"를 포함하지 않는 모든 태그에 대한 제목을 생성합니다.

이것들은 더 복잡한 예제로, [중첩 태그](https://help.obsidian.md/Editing+and+formatting/Tags#Nested+tags)를 사용하고 다른 태그 중첩 레벨에서 그룹화하려는 경우 복사할 수 있는 것들입니다.

```text
group by function task.tags.map( (tag) => tag.split('/')[0].replace('#', '') )
```

- `#tag/subtag/sub-sub-tag`가 **`tag`**을 제공합니다.

```text
group by function task.tags.map( (tag) => tag.split('/')[1] ? tag.split('/').slice(1, 2) : '')
```

- `#tag/subtag/sub-sub-tag`가 **`subtag`**을 제공합니다.

```text
group by function task.tags.map( (tag) => tag.split('/')[2] ? tag.split('/').slice(2, 3) : '')
```

- `#tag/subtag/sub-sub-tag`가 **`sub-sub-tag`**을 제공합니다.

```text
group by function task.tags.map( (tag) => tag.split('/')[3] ? tag.split('/').slice(3, 4) : '')
```

- `#tag/subtag/sub-sub-tag`는 4번째 레벨에 값이 없으므로 제목이 없습니다.

```text
group by function task.tags.map( (tag) =>

 tag.split('/')[0] )
```

- `#tag/subtag/sub-sub-tag`가 **`#tag`**을 제공합니다.

```text
group by function task.tags.map( (tag) => tag.split('/')[1] ? tag.split('/').slice(0, 2).join('/') : '')
```

- `#tag/subtag/sub-sub-tag`가 **`#tag/subtag`**을 제공합니다.

```text
group by function task.tags.map( (tag) => tag.split('/')[2] ? tag.split('/').slice(0, 3).join('/') : '')
```

- `#tag/subtag/sub-sub-tag`가 **`#tag/subtag/sub-sub-tag`**을 제공합니다.

```text
group by function task.tags.map( (tag) => tag.split('/')[3] ? tag.split('/').slice(0, 4).join('/') : '')
```

- `#tag/subtag/sub-sub-tag`는 4번째 레벨에 값이 없으므로 제목이 없습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 원본 Markdown

원본 마크다운 라인으로 그룹화하기 위한 내장 명령이 없습니다.

Tasks 4.0.0 이후로, 이제 **[[사용자 정의 그룹화|사용자 정의 그룹화]]를 통해 원본 마크다운 라인**으로 그룹화할 수 있습니다.

예를 들어, `task.originalMarkdown`에서 파싱하지 않는 Tasks에서 정보를 추출하여 작업을 그룹화하는 데 사용할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomGroupingExamples.test.other_properties_task.originalMarkdown_docs.approved.md -->

```text
group by function '``' + task.originalMarkdown + '``'
```

- 작업의 원래 마크다운 파일의 생로한 텍스트로 그룹화합니다.
- 작업 라인의 단일 역따옴표 문자('`')를 유지하기 위해 역따옴표 문자의 쌍('``')에 유의하세요.
- 체크박스가 제목과 작업 양쪽에 나타나면 혼란스러우므로 체크박스가 제목에서 렌더링되지 않도록 하는 것이 중요합니다.

```text
group by function task.originalMarkdown.replace(/^[^\[\]]+\[.\] */, '')
```

- 마크다운 라인을 코드로 포맷팅하는 대신, 체크박스 끝까지의 모든 내용을 제거합니다.
- 그런 다음 작업 라인의 나머지 부분을 일반 마크다운으로 렌더링합니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

## 파일 속성으로 그룹화

### 파일 경로

- `group by path` (작업을 포함하는 파일의 경로, 즉 폴더와 파일 이름)

Tasks 4.0.0 이후로, **[[사용자 정의 그룹화|사용자 정의 그룹화]]를 통해 파일 경로로 그룹화**할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomGroupingExamples.test.file_properties_task.file.path_docs.approved.md -->

```text
group by function task.file.path
```

- 'group by path'와 동일하지만 파일 확장자를 포함합니다.

```text
group by function task.file.path.replace('{{query.file.folder}}', '')
```

- 작업의 파일 경로로 그룹화하지만 쿼리의 폴더를 그룹에서 제거합니다.
- 쿼리 폴더나 하위 폴더에 있는 작업의 경우 축약된 경로를 볼 수 있는 좋은 방법입니다.
- placeholder 텍스트가 원시 문자열로 확장되므로 따옴표 내에 있어야 합니다.
- 이것은 아이디어를 제공하기 위해 제공되었습니다. '쿼리 파일 폴더'가 줄의 시작 부분에 있는지 확인하지 않기 때문에 다소 게으른 구현입니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

Tasks 4.7.0 이후로는 사용자 지정 그룹에서 쿼리 파일 경로를 사용할 수 있습니다.

- 따옴표가 필요합니다:
  - `'{{query.file.path}}'` 또는
  - `'{{query.file.pathWithoutExtension}}'` (Tasks 4.8.0 이후)

- 일반 표현식에서 플레이스홀더 텍스트를 사용하는 경우 파일 이름에 특수 문자가 포함된 경우 해당 문자를 이스케이프해야 할 수 있습니다.
- 유용한 정보: [[Query Properties]] 및 [[Placeholders]].

### 루트

- `group by root` (작업을 포함하는 파일의 최상위 폴더, 즉 경로에서 첫 번째 디렉토리로, 파일의 최상위 폴더의 경우 `/`가 됩니다)

> [!released]
`root` 그룹화 옵션은 Tasks 1.11.0에 도입되었습니다.

Tasks 4.0.0 이후로, **[[사용자 정의 그룹화|사용자 정의 그룹화]]를 통해 루트 폴더별로 그룹화**할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomGroupingExamples.test.file_properties_task.file.root_docs.approved.md -->

```text
group by function task.file.root
```

- 'group by root'와 동일합니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

Tasks 4.7.0 이후로는 사용자 지정 그룹에서 쿼리 파일 루트를 사용할 수 있습니다.

- 따옴표가 필요합니다: `'{{query.file.root}}'`
- 일반 표현식에서 플레이스홀더 텍스트를 사용하는 경우 파일 이름에 특수 문자가 포

함된 경우 해당 문자를 이스케이프해야 할 수 있습니다.
- 유용한 정보: [[Query Properties]] 및 [[Placeholders]].

### 폴더

- `group by folder` (작업을 포함하는 파일로 통하는 폴더, 항상 `/`로 끝나며 최상위 폴더의 파일의 경우 정확히 `/`입니다)

Tasks 4.0.0 이후로, **[[사용자 정의 그룹화|사용자 정의 그룹화]]를 통해 폴더별로 그룹화**할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomGroupingExamples.test.file_properties_task.file.folder_docs.approved.md -->

```text
group by function task.file.folder
```

- 'group by folder'와 동일합니다.

```text
group by function task.file.folder.slice(0, -1).split('/').pop() + '/'
```

- 작업을 포함하는 파일의 즉시 상위 폴더로 그룹화합니다.
- 작동 방식은 다음과 같습니다.
  - '.slice(0, -1)'는 원래 폴더에서 슬래시('/')를 제거합니다.
  - '.split('/')'는 나머지 경로를 폴더 이름의 배열로 분할합니다.
  - '.pop()'은 마지막 폴더 이름, 즉 작업을 포함하는 파일의 상위 폴더를 반환합니다.
  - 그런 다음 빈 문자열을 방지하기 위해 맨 끝에 슬래시를 추가합니다. 최상위 폴더의 파일의 경우 빈 문자열을 얻지 않으려면 슬래시를 추가해야 합니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

Tasks 4.7.0 이후로는 사용자 지정 그룹에서 쿼리 폴더를 사용할 수 있습니다.

- 따옴표가 필요합니다: `'{{query.file.folder}}'`
- 일반 표현식에서 플레이스홀더 텍스트를 사용하는 경우 파일 이름에 특수 문자가 포함된 경우 해당 문자를 이스케이프해야 할 수 있습니다.
- 유용한 정보: [[Query Properties]] 및 [[Placeholders]].

### 파일 이름

- `group by filename` (작업을 포함하는 파일로 이어지는 파일 이름, `.md` 확장자 없음)
  - 같은 파일 이름을 가진 다른 노트의 작업은 동일한 그룹에 그룹화됩니다.

Tasks 4.0.0 이후로, **[[사용자 정의 그룹화|사용자 정의 그룹화]]를 통해 파일 이름별로 그룹화**할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomGroupingExamples.test.file_properties_task.file.filename_docs.approved.md -->

```text
group by function task.file.filename
```

- 'group by filename'와 동일하지만 파일로 링크하지 않습니다.

```text
group by function task.file.filename.filenameWithoutExtension + (task.hasHeading ? (' > ' + task.heading) : '')
```

- 'group by backlink'와 유사하지만 파일에 링크하지 않습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

Tasks 4.7.0 이후로는 사용자 지정 그룹에서 쿼리 파일 이름을 사용할 수 있습니다.

- 따옴표가 필요합니다:
  - `'{{query.file.filename}}'` 또는
  - `'{{query.file.filenameWithoutExtension}}'` (Tasks 4.8.0 이후)

- 일반 표현식에서 플레이스홀더 텍스트를 사용하는 경우 파일 이름에 특수 문자가 포함된 경우 해당 문자를 이스케이프해야 할 수 있습니다.
- 유용한 정보: [[Query Properties]] 및 [[Placeholders]].

### Backlink

- `group by backlink` (작업의 [[역링크|역링크]]에 표시될 텍스트, 작업의 파일 이름과 제목을 결합하여 링크 생성)

### Heading

- `group by heading` (작업 앞의 제목 또는 `(제목 없음)` 파일에 제목이 없는 경우)

Tasks 4.0.0 이후로, **[[사용자 정의 그룹화|사용자 정의 그룹화]]를 통해 제목별로 그룹화**할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomGroupingExamples.test.file_properties_task.heading_docs.approved.md -->

```text
group by function (task.heading + '.md' ===

 task.file.filename) ? '' : task.heading
```

- 제목으로 그룹화하지만 제목이 파일 이름과 다른 경우에만 적용됩니다.
- 이것은 'group by filename' 라인 바로 뒤에서 잘 작동합니다.
- 세 개의 동일한 기호(===)에 유의하세요. 이것은 JavaScript에서 안전성을 위해 중요합니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

## 다중 그룹

각각의 추가 행에 여러 `group by` 쿼리 옵션을 추가할 수 있습니다.
이렇게 하면 중첩 그룹이 생성됩니다.
첫 번째 그룹이 가장 높은 우선순위를 갖습니다.

각 후속 `group by`는 기존 그룹 내에서 새로운 제목 수준을 생성합니다.

- 첫 번째 `group by`는 `h4` 제목으로 표시됩니다.
- 두 번째 `group by`는 `h5` 제목으로 표시됩니다.
- 세 번째 이상의 `group by`는 `h6` 제목으로 표시됩니다.

이것이 어떻게 실제로 보이는지에 대한 내용은 아래의 [스크린샷](#스크린샷)을 참조하십시오.

> [!info]
> 제목은 대소문자 구분 정렬으로 표시되며 원래 순서가 아닙니다.

## 그룹 수정

### 그룹 뒤집기

> [!released]
> 그룹 제목 뒤집기는 Tasks 3.7.0에서 도입되었습니다.

그룹화하려는 속성 이름 뒤에 `reverse` 키워드를 추가할 수 있습니다.
지정된 경우 그룹 제목은 해당 속성을 기반으로 뒤집힙니다.

예를 들어:

- `group by due`는 그룹 제목을 다음과 같이 정렬합니다:
  - **가장 오래된** 마감일부터...
  - **가장 최근** 마감일까지
- `group by due reverse`는 그룹 제목을 다음과 같이 정렬합니다:
  - **가장 최근** 마감일부터...
  - **가장 오래된** 마감일까지

> [!tip]
> `reverse` 키워드는 그룹 제목이 표시되는 순서를 제어합니다.
>
> 대조적으로, [[정렬|정렬 기준]] 기능은 각 그룹 내에서 표시되는 순서를 제어합니다.

### 그룹 크기 제한

각 그룹의 작업 수를 제한할 수 있습니다. 아마도 가장 중요한 작업부터 처리하기 위해 사용될 수 있습니다.

[그룹의 작업 수 제한](#그룹별 작업 수 제한)을 참조하십시오.

## 참고

> [!info]
> 작업을 표시하는 것이 수정되지 않도록 하는 작업 순서를 보장합니다. 예를 들어 `limit` 옵션을 사용할 때도 해당합니다:
>
> 1. 모든 필터 지시문 실행
> 1. 그런 다음 정렬 지시문 실행
> 1. 그런 다음 `limit` 지시문 실행
> 1. 그런 다음 그룹화 지시문 실행
> 1. 마지막으로 `limit groups` 지시문 실행

## 스크린샷

### 이전

여기에는 `group by` 명령이 없는 예제 Tasks 결과가 있습니다:

![Tasks Ungrouped](../images/tasks_ungrouped.png)
그룹화되지 않은 작업.

### 이후

다음은 폴더, 파일 이름 및 제목별로 그룹화된 예제입니다:

![Tasks Grouped](../images/tasks_grouped.png)
그룹화된 작업.

## 예제

저의 작업 위치를 나타내는 세 가지 수준의 그룹을 나타내도록 세 가지 수준의 그룹을 나타내십시오:

    ```tasks
    not done
    group by folder
    group by filename
    group by heading
    ```

오늘 해야 할 작업을 보여주십시오. 그리고 가시성을 위해 오늘의 작업을 먼저 표시합니다:

    ```tasks
    not done
    due before tomorrow
    group by due reverse
    ```
