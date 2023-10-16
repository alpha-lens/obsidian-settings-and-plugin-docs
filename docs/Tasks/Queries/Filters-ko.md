---
publish: true
---

# 필터

<span class="related-pages">#feature/filters</span>

## 내용

이 페이지는 길다. 주요 섹션으로 이동할 수 있는 링크가 있다.

- [[#사용자 정의 필터]]
- [[#날짜 검색]]
- [[#텍스트 필터]]
- [[#여러 필터 일치]]
- [[#작업 상태 필터]]
- [[#작업 날짜 필터]]
- [[#다른 작업 속성 필터]]
- [[#파일 속성 필터]]
- [[#부록: Tasks 2.0.0의 날짜 필터 개선 사항]]

## 사용자 정의 필터

> [!released]
> `filter by function`는 Tasks 4.2.0에 도입되었습니다.

Tasks는 많은 내장 필터링 옵션을 제공하지만 모든 사용자의 요구를 완벽하게 충족하지는 않습니다.

이제 Tasks에는 놀라운 유연성을 제공하는 **사용자 정의 필터**를 만들 수 있는 강력한 기능이 있습니다.

Tasks에 내장된 지침이 사용자의 선호도를 충족하지 못하는 경우 아래 문서에 사용자 정의 필터링 지침 `filter by function`에 대한 예제와 설명이 많이 있습니다.

이 강력한 기능에 대해 자세히 알아보려면 [[사용자 정의 필터]]를 참조하세요.

## 날짜 검색

Tasks는 쿼리 블록 내의 날짜에 대해 많은 유연성을 허용합니다.

기본적으로 두 가지 유형의 날짜 검색이 있습니다.

- [[#특정 날짜 검색]]
- [[#날짜 범위 검색]]

### 특정 날짜 검색

이 섹션에서는 단일 날짜를 사용하는 검색을 설명합니다. 예를 들어:

    ```tasks
    starts before 2023-04-20
    due on or before today
    ```

[[#날짜 범위 검색]]도 참조하세요.

#### 날짜 검색 옵션

특정 날짜를 사용하여 검색할 때 사용할 수 있는 여러 가지 옵션이 있습니다.

- `on <date>` 또는 `<date>`
  - 날짜를 일치시킵니다.
  - `on`은 날짜 검색의 기본값이며 생략할 수 있습니다.
- `before <date>`
  - 날짜 이전의 모든 날짜를 일치시킵니다.
- `after <date>`
  - 날짜 이후의 모든 날짜를 일치시킵니다.
- `on or before <date>`
  - 날짜와 이전 날짜를 모두 일치시킵니다.
- `on or after <date>`
  - 날짜와 이후 날짜를 모두 일치시킵니다.

이 표는 이러한 옵션을 시각화하는 데 도움이 될 수 있습니다.

| 옵션 | 이전 날짜 | `검색 날짜` | all dates<br>inside the range | `end date` | all later dates |
|----------------| ----------------- | ------------ | --------------- |
| `before`       | 일치           |              |                 |
| `on or before` | 일치           | 일치      |                 |
| `on`           |                   | 일치      |                 |
| `on or after`  |                   | 일치      | 일치         |
| `after`        |                   |              | 일치         |

> [!released]
> `on or before` 및 `on or after`은 Tasks 4.6.0에 도입되었습니다.

#### 절대 날짜

`<date>` 필터는 '절대' 날짜로 제공할 수 있으며 선호하는 형식은 `YYYY-MM-DD`입니다.

절대 날짜는 **캘린더의 특정 날짜**를 지정합니다. 오늘 날짜에 관계없이 동일한 날을 나타냅니다.

예:

- `2021-05-25`
- `25th May 2023`
  - [chrono](https://github.com/wanasit/chrono) 라이브러리는 날짜를 매우 유연하게 읽기 때문에 필터에서 절대 날짜에 대한 자유 텍스트를 사용할 수 있습니다.
  - `YYYY-MM-DD` 형식은 텍스트를 읽을 때 모호할 가능성이 없으므로 다소 안전합니다.

#### 상대 날짜

`<date>` 필터는 `상대` 날짜로 제공할 수 있습니다.

상대 날짜는 **오늘 날짜에서 계산**됩니다.

날짜가 바뀌면 `due today`와 같은 상대 날짜가 다시 평가되어 목록이 최신 상태로 유지됩니다(컴퓨터가 자정에는 절전 모드가 아니어야 함 - [#1289](https://github.com/obsidian-tasks-group/obsidian-tasks/issues/1289)).

영감을 위한 예:

- `yesterday`
- `today`
- `tomorrow`
- `next monday`
- `last friday`
- `14 days ago`
- `in two weeks`
- `14 October` (현재 연도가 사용됨)
- `May` (현재 연도의 5월 1일이 사용됨)

수요일이고 `tuesday`라고 쓰면 Tasks는 가장 가까운 화요일이기 때문에 "어제"를 의미한다고 가정합니다.
"다음 화요일"을 의미하는 경우 `next tuesday`를 사용하십시오.

### 날짜 범위 검색

> [!released]
날짜 범위 검색은 Tasks 2.0.0에 도입되었습니다.

Tasks는 날짜 검색에서 날짜 쌍을 지정할 수 있도록 합니다. `<date range>`.

이 섹션에서는 날짜 범위 검색을 설명합니다. 예를 들어:

    ```tasks
    due 2023-11-25 2023-11-30
    happens this week
    ```

[[#Searching particular dates]]도 참조하세요.

#### 날짜 범위 옵션

날짜 범위를 검색할 때 사용할 수 있는 몇 가지 옵션이 있습니다.

- `in <date range>` 또는 `<date range>`
  - **시작** 날짜, **종료** 날짜 및 그 사이의 모든 날짜를 일치시킵니다.
  - `in`은 날짜 범위 검색의 기본값이며 생략할 수 있습니다.
- `before <date range>`
  - **시작** 날짜 이전의 모든 날짜를 일치시킵니다.
- `after <date range>`
  - **종료** 날짜 이후의 모든 날짜를 일치시킵니다.
- `in or before <date range>`
  - **종료** 날짜와 그 이전의 모든 날짜를 일치시킵니다.
- `in or after <date range>`
  - **시작** 날짜와 그 이후의 모든 날짜를 일치시킵니다.

이 표는 이러한 옵션을 시각화하는 데 도움이 될 수 있습니다.

| 옵션         | 모든 이전 날짜 | `시작 날짜` | 모든 날짜<br>범위 내 | `종료 날짜` | 모든 이후 날짜 |
| -------------- | ----------------- | ------------ | -------------------------------- | ---------- | --------------- |
| `before`       | 일치           |              |                                  |            |                 |
| `in or before` | 일치           | 일치      | 일치                          | 일치    |                 |
| `in`           |                   | 일치      | 일치                          | 일치    |                 |
| `in or after`  |                   | 일치      | 일치                          | 일치    | 일치         |
| `after`        |                   |              |                                  |            | 일치         |

> [!released]
> `in or before` 및 `in or after`는 Tasks 4.6.0에 도입되었습니다.

#### 절대 날짜 범위

`<date range>`는 2개의 유효한 날짜를 `YYYY-MM-DD` 형식으로 지정할 수 있습니다.

참고:

- `in` 및 `on`은 생략할 수 있습니다.
- `YYYY-MM-DD` 날짜 중 하나가 유효하지 않은 경우 무시되고 필터는 `<date>`가 아닌 `<date range>`처럼 작동합니다.
- 날짜 범위는 2개의 상대 날짜로 지정할 수 없습니다. 예: `next monday three weeks`.
- 기술적으로는 `25th May 2023`과 같이 단어로 절대 날짜를 지정할 수 있습니다.
  - 그러나 범위 내의 두 날짜를 지정하는 데 단어를 사용하는 것은 권장하지 않습니다.
  - 이는 [chrono](https://github.com/wanasit/chrono) 라이브러리가 `<date range>` 필터의 날짜를 구문 분석할 때 두 개의 인접한 비숫자 날짜를 사용하면 모호성과 의도치 않은 결과를 초래할 수 있기 때문입니다.

예제 절대 날짜 범위:

- `2022-01-01 2023-02-01`

> [!warning]
Tasks 2.0.0 이전에는 절대 날짜 범위의 두 번째 날짜가 무시되었습니다.
결과의 변경 사항을 이해하고 검색을 업데이트해야 하는지 여부를 확인하려면 [[Filters#Appendix: Tasks 2.0.0 improvements to date filters|아래 부록]]의 표를 참조하십시오.

#### 상대 날짜 범위

Tasks는 매우 특정한 상대 `<date range>` 값 세트를 지원합니다. `last|this|next week|month|quarter|year`. 파이프 (`|`) 문자는 '또는'을 의미합니다.

Tasks는 오늘 날짜를 기준으로 이러한 범위를 처리하고 내부적으로 절대 날짜 범위 (`YYYY-MM-DD YYYY-MM-DD`)로 변환합니다.

양쪽 끝의 날짜가 포함됩니다. 즉, 포괄적인 검색입니다.

참고:

- 현재 모든 주간은 [ISO 8601](https://en.wikipedia.org/wiki/ISO_week_date) 주로 정의되어 있습니다. **월요일에 시작하여 일요일에 끝납니다**.
  - 향후 릴리스에서는 더 많은 유연성을 제공할 것입니다.
  - 우리는 [issue #1751](https://github.com/obsidian-tasks-group/obsidian-tasks/issues/1751)에서 이를 추적하고 있습니다.
- 상대 날짜 범위는 위에서 지정한 정확한 키워드만 지원합니다.
  - 예를 들어, `previous half of year` 및 `next semester`은 지원되지 않습니다.

예제 상대 날짜 범위:

- `in this week` (이번 주 월요일부터 일요일까지 포함)
- `after this month`
- `next quarter`
- `on or before next year`

> [!warning]
Tasks 2.0.0 이전에는 상대 날짜 범위의 해석이 혼란스러웠고 대부분의 사용자가 자연스럽게 기대하는 것과는 달랐습니다.
결과의 변경 사항을 이해하고 검색을 업데이트해야 하는지 여부를 확인하려면 [[Filters#Appendix: Tasks 2.0.0 improvements to date filters|아래 부록]]의 표를 참조하십시오.

### 숫자로 된 날짜 범위

현재 날짜에 종속되지 않은 숫자로 된 날짜 범위를 사용할 수도 있습니다. 지원되는 숫자 범위 날짜 유형은 다음과 같습니다.

- 주
  - 형식: `YYYY-Www` (`ww`는 2자리 주 번호)
  - 예: `2022-W14`
- 월
  - 형식: `YYYY-mm` (`mm`은 2자리 월 번호)
  - 예: `2023-10`
- 분기
  - 형식: `YYYY-Qq` (`q`는 1자리 분기 번호)
  - 예: `2021-Q4`
- 연도
  - 형식: `YYYY`
  - 예: `2023`

> [!released]
> 숫자 범위 날짜는 Tasks 3.1.0에서 도입되었습니다.

## 텍스트 필터

텍스트 문자열을 검색하는 필터에는 두 가지 유형이 있습니다.

다음 예에서는 `heading` 필터를 설명하지만, 이러한 의견은 모든 텍스트 필터에 적용됩니다.

1. `heading (includes|does not include) <search text>`
    - 해당 섹션에 있는 모든 작업의 제목에 `<search text>` 문자열이 한 번 이상 포함되는 경우 일치합니다.
        - 즉, 하위 문자열 검색입니다.
        - 따라서 `heading includes Day Planner`는 `## Monday Day Planner` 및 `## Day Planner for typical day` 섹션의 작업을 일치시킵니다.
    - 대소문자를 구분하지 않습니다. 검색은 대소문자 구분 없이 수행됩니다.
        - 따라서 `heading includes Day Planner`는 `## Day Planner` 및 `## DAY PLANNER` 섹션을 일치시킵니다.
        - 그러나 `## Day Planner`와 같은 작업 제목은 일치하지 않습니다.
1. `heading (regex matches|regex does not match) /<JavaScript-style Regex>/`
    - 정규 표현식과 일치하는지 여부(기본적으로 대소문자 구분)
    - 정규 표현식(또는 ‘regex’) 검색은 강력하지만 고급 기능입니다.
    - 성공적으로 사용하려면 철저한 지식이 필요하며 의도한 검색 결과를 놓치지 않습니다.
    - 올바른 것처럼 보이는 정규 표현식을 작성하는 것은 쉽지만 특별한 문자가 눈에 띄지 않는 의미를 갖는 경우가 많습니다.
    - 필수 읽기: [[Regular Expressions|정규식 검색]]

## 여러 필터 일치

> [!released]
Boolean 조합은 Tasks 1.9.0에서 도입되었습니다

조회할 때 각 라인은 작업이 나열되려면 일치해야 합니다.
즉, 라인은 'AND' 연산자 사이에 있다고 간주됩니다.
각 라인 내에서 `NOT`, `AND`, `OR`, `AND NOT`, `OR NOT` 및 `XOR` 연산자를 사용할 수 있습니다. 단, 개별 필터가 괄호로 묶여 있어야 합니다.

    ```tasks
    (no due date) OR (due after 2021-04-04)
    path includes GitHub
    ```

    ```tasks
    due after 2021-04-04
    (path includes GitHub) AND NOT (tags include #todo)
    ```

Boolean 연산자를 사용하여 필터를 결합하는 방법에 대한 자세한 내용은 [[Combining Filters]]를 참조하세요.

## 작업 상태 필터

### 상태

- `done` - 작업 상태 유형 `DONE`, `CANCELLED` 및 `NON_TASK`와 일치합니다.
- `not done` - 상태 유형이 `TODO` 및 `IN_PROGRESS`인 작업과 일치합니다.

> [!info]
> Tasks 1.23.0 이전에는 작업 상태 유형이라는 개념이 없었으며, 따라서 상태 기호만 사용되었습니다.
>
> - `[ ]`로 표시된 작업은 `not done`으로 간주되었습니다.
> - 공백 이외의 다른 문자는 `done`으로 간주되었습니다.
>
> 새로운 동작은 더 유연하고 진행 중인 작업과 취소된 작업을 지원하기 위해 필요했습니다. 원래 동작이 선호되는 경우 `space`를 제외한 모든 기호의 상태 유형을 `DONE`으로 변경할 수 있습니다. [[사용자 정의 상태 설정|사용자 정의 상태 설정 방법]]을 참조하세요.

Tasks 4.2.0부터 **[[사용자 정의 필터|사용자 정의 필터링]]**을 사용하여 `task.isDone`을 사용하여 상태별로 필터링할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.other_properties_task.isDone_docs.approved.md -->

```text
filter by function task.isDone
```

- `done` 필터와 동일하지만 같은 줄의 다른 표현식과 함께 사용하면 유용합니다.

```text
filter by function ! task.isDone
```

- `not done` 필터와 동일하지만 같은 줄의 다른 표현식과 함께 사용하면 유용합니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

> [!NOTE]
> `task.status.type` ([[#Status Type]])는 `task.isDone`보다 사용자 정의 필터에서 더 정밀합니다.

### 상태 이름

- 사용자 정의 상태에 지정한 이름을 검색합니다.
- 예를 들어 `[!]`를 `Important`로 지정했을 수 있으며, 이 필드는 해당 상태 기호를 가진 모든 작업에 대해 `Important`라는 텍스트를 검색합니다.
- `status.name (includes|does not include) <string>`
  - 대소문자를 구분하지 않고 일치합니다.
- `status.name (regex matches|regex does not match) /<JavaScript-style Regex>/`
  - 정규 표현식과 일치합니다(기본적으로 대소문자를 구분함).
  - 필수 읽기: [[Regular Expressions|정규 표현식 검색]]

> [!released]
`status.name` 텍스트 검색은 Tasks 1.23.0에 도입되었습니다.

자신의 사용자 정의 상태를 추가하는 방법을 포함하여 자세한 내용은 [[Statuses]]를 참조하세요.

Tasks 4.2.0부터 **[[사용자 정의 필터|사용자 정의 필터링]]**을 사용하여 `task.status.name`을 사용하여 상태 이름으로 필터링할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.statuses_task.status.name_docs.approved.md -->

```text
filter by function task.status.name === 'Unknown'
```

- Tasks 설정에 아직 추가되지 않은 사용자 정의 상태가 있는 모든 작업을 찾습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 상태 유형

- `status.type (is|is not) (TODO|DONE|IN_PROGRESS|CANCELLED|NON_TASK)`
  - 값 `TODO` 등은 대소문자를 구분하지 않습니다. 예를 들어 `in_progress`를 사용할 수 있습니다.
- 사용자 정의 상태에 지정한 유형을 검색합니다.
- `IN_PROGRESS` 상태인 모든 작업을 찾고 싶다면 상태를 `[/]`, `[d]` 등으로 설정하고 `IN_PROGRESS`로 처리하도록 설정한 경우 이 검색이 효율적입니다.
- 여러 가지 가능한 상태 유형을 검색하려면:
  - 여러 개의 `status.type is not` 라인을 사용하여 여러 값을 제외할 수 있습니다.
  - 여러 값을 허용하려면 논리 연산자를 사용합니다. 예를 들어: `(status.type is TODO) OR (status.type is IN_PROGRESS)`.
  - 또는 아래의 '사용자 정의 필터링' 예제를 참조하세요.

> [!released]
`status.type` 텍스트 검색은 Tasks 1.23.0에 도입되었습니다.

자신의 사용자 정의 상태를 추가하는 방법을 포함하여 자세한 내용은 [[Statuses]]를 참조하세요.

Tasks 4.2.0부터, `task.status.type`을 사용하여 [[Custom Filters|custom filtering]]할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.statuses_task.status.type_docs.approved.md -->

```text
filter by function task.status.type === 'NON_TASK'
```

- 작업 유형이 `NON_TASK`인 작업을 찾습니다.

```text
filter by function 'TODO,IN_PROGRESS'.includes(task.status.type)
```

- 작업 유형이 `TODO`이거나 `IN_PROGRESS`인 작업을 찾습니다.
- 논리 연산자 `OR`를 사용하는 것보다 더 편리할 수 있습니다.

```text
filter by function ! 'NON_TASK,CANCELLED'.includes(task.status.type)
```

- 작업 유형이 `NON_TASK`이거나 `CANCELLED`이 아닌 작업을 찾습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 상태 기호

상태 기호로 필터링할 수 있는 내장 명령은 없습니다.

Tasks 4.2.0부터 `task.status.symbol`을 사용하여 상태 기호로 필터링할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.statuses_task.status.symbol_docs.approved.md -->

```text
filter by function task.status.symbol === '-'
```

- 체크박스 `[-]`가 있는 작업을 찾습니다. 이는 일반적으로 "취소됨"을 의미합니다.

```text
filter by function task.status.symbol !== ' '
```

- 상태 기호가 공백 문자 이외인 작업을 찾습니다. 즉, 체크박스 `[ ]`가 없는 작업입니다.

```text
filter by function const symbol = task.status.symbol; return symbol === 'P' || symbol === 'C' || symbol === 'Q' || symbol === 'A'
```

- 반복을 피하기 위해 변수를 사용하기 때문에 `return`을 추가해야 합니다.
- 상태 기호가 `P`, `C`, `Q` 또는 `A`인 작업을 찾습니다.
- 검색하려는 기호가 많을수록 문장이 길어질 수 있습니다.

```text
filter by function 'PCQA'.includes(task.status.symbol)
```

- 상태 기호가 `P`, `C`, `Q` 또는 `A`인 작업을 찾습니다.
- 각 허용되는 값을 개별적으로 테스트하는 더 긴 문장보다 편리한 단축키입니다.

```text
filter by function !' -x/'.includes(task.status.symbol)
```

- Tasks의 기본 설정에서 지원되지 않는 상태 기호가 있는 작업을 찾습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 다음 상태 기호

다음 상태 기호로 필터링할 수 있는 내장 명령은 없습니다.

Tasks 4.2.0부터 `task.status.nextSymbol`을 사용하여 다음 상태 기호로 필터링할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.statuses_task.status.nextSymbol_docs.approved.md -->

```text
filter by function task.status.symbol === task.status.nextSymbol
```

- 현재 상태 기호와 동일하기 때문에 다음 상태 기호로 전환되는 작업을 찾습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 상태 예제

Tasks 설정에 아직 추가하지 않은 상태 기호가 있는 작업을 찾으려면 다음과 같이 합니다.

    ```tasks
    status.name includes unknown
    group by path
    ```

## Tasks의 날짜 필터

### 마감일

- `no due date`
- `has due date`
- `due (on|before|after|on or before|on or after) <date>`
- `due (in|before|after|in or before|in or after) <date range>`
  - `YYYY-MM-DD YYYY-MM-DD`
  - `(last|this|next) (week|month|quarter|year)`
  - `(YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)`
- `due date is invalid`

자세한 내용은 [[Dates#Due date|Due date]]를 참조하세요.

> [!released]
>
> - `has due date`는 Tasks 1.6.0에 도입되었습니다.
> - `due date is invalid`는 Tasks 1.16.0에 도입되었습니다.
> - `due (before|after|in) <date range>` 검색은 Tasks 2.0.0에 도입되었습니다.
> - `due (before|after|in) (YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)` 검색은 Tasks 3.1.0에 도입되었습니다.
> - `due (on or before|on or after) <date>` 및 `due (in or before|in or after) <date range>` 검색은 Tasks 4.6.0에 도입되었습니다.

Tasks 4.2.0부터 `task.due`를 사용하여 **[[Custom Filters|custom filtering]] by due date**가 가능합니다.

이러한 예제는 모두 `task.due` 속성을 사용하며, 이는 `TasksDate` 객체입니다. [[Task Properties#Values in TasksDate Properties|Values in TasksDate Properties]]를 참조하여 기능을 살펴보세요.

이러한 예제 중 일부는 [moment.js 형식 문자](https://momentjs.com/docs/#/displaying/format/)를 사용합니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.dates_task.due_docs.approved.md -->

```text
filter by function task.due.format('dddd') === 'Tuesday'
```

- 화요일에 마감되는 작업을 찾습니다. 즉, 모든 화요일입니다.
- 영어 이외의 시스템에서는 현지 언어로 요일을 입력해야 할 수 있습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

JavaScript에 익숙한 사용자에게는 다음과 같은 더 복잡한 예도 흥미로울 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.dates_task.due.advanced_docs.approved.md -->

```text
filter by function task.due.moment?.isSameOrBefore(moment(), 'day') || false
```

- 오늘 또는 그 이전에 마감되는 모든 작업을 찾습니다.
- `moment()`은 현재 날짜와 시간을 반환하며, 이를 하루의 시작으로 변환해야 합니다.
- 두 번째 매개변수는 확인할 값이 아니라 정밀도를 결정하므로 'day'를 사용하면 연도, 월, 일을 확인합니다.
- [isSameOrBefore](https://momentjscom.readthedocs.io/en/latest/moment/05-query/04-is-same-or-before/)의 문서를 참조하세요.

```text
filter by function task.due.moment?.isSameOrAfter(moment(), 'day') || false
```

- 오늘 또는 이후에 마감됩니다.

```text
filter by function task.due.moment?.isSame(moment('2023-05-31'), 'day') || false
```

- 2023년 5월 31일에 마감되는 모든 작업을 찾습니다.

```text
filter by function task.due.moment?.isSame(moment('2023-05-31'), 'week') || false
```

- 2023년 5월 31일 주에 마감되는 모든 작업을 찾습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 완료 날짜

- `no done date`
- `has done date`
- `done (on|before|after|on or before|on or after) <날짜>`
- `done (in|before|after|in or before|in or after) <날짜 범위>`
  - `YYYY-MM-DD YYYY-MM-DD`
  - `(last|this|next) (week|month|quarter|year)`
  - `(YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)`
- `done date is invalid`

자세한 내용은 [[Dates#Done date|완료 날짜]]를 참조하세요.

> [!released]
>
> - `no done date` 및 `has done date`는 Tasks 1.7.0에서 도입되었습니다.
> - `done date is invalid`는 Tasks 1.16.0에서 도입되었습니다.
> - `done (before|after|in) <날짜 범위>` 검색은 Tasks 2.0.0에서 도입되었습니다.
> - `done (before|after|in) (YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)` 검색은 Tasks 3.1.0에서 도입되었습니다.
> - `done (on or before|on or after) <날짜>` 및 `done (in or before|in or after) <날짜 범위>` 검색은 Tasks 4.6.0에서 도입되었습니다.

Tasks 4.2.0부터 `task.done`을 사용하여 **[[Custom Filters|사용자 지정 필터링]]을 완료 날짜별로** 할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.dates_task.done_docs.approved.md -->

```text
filter by function task.done.format('dddd') === '목요일'
```

- 목요일에 완료된 작업을 찾습니다. 즉, 모든 목요일입니다.
- 영어 이외의 시스템에서는 현지 언어로 요일을 입력해야 할 수 있습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

자세한 예제는 [[#Due Date]]를 참조하세요.

### 예약 날짜

- `no scheduled date`
- `has scheduled date`
- `scheduled (on|before|after|on or before|on or after) <날짜>`
- `scheduled (in|before|after|in or before|in or after) <날짜 범위>`
  - `YYYY-MM-DD YYYY-MM-DD`
  - `(last|this|next) (week|month|quarter|year)`
  - `(YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)`
- `scheduled date is invalid`

자세한 내용은 [[Dates#Scheduled date|예약 날짜]]를 참조하세요.

> [!released]
>
> - `has scheduled date`는 Tasks 1.6.0에서 도입되었습니다.
> - `scheduled date is invalid`는 Tasks 1.16.0에서 도입되었습니다.
> - `scheduled (before|after|in) <날짜 범위>` 검색은 Tasks 2.0.0에서 도입되었습니다.
> - `scheduled (before|after|in) (YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)` 검색은 Tasks 3.1.0에서 도입되었습니다.
> - `scheduled (on or before|on or after) <날짜>` 및 `scheduled (in or before|in or after) <날짜 범위>` 검색은 Tasks 4.6.0에서 도입되었습니다.

Tasks 4.2.0부터 `task.scheduled`을 사용하여 **[[Custom Filters|사용자 지정 필터링]]을 예약 날짜별로** 할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.dates_task.scheduled_docs.approved.md -->

```text
filter by function task.scheduled.format('dddd') === '수요일'
```

- 수요일에 예약된 작업을 찾습니다. 즉, 모든 수요일입니다.
- 영어 이외의 시스템에서는 현지 언어로 요일을 입력해야 할 수 있습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

자세한 예제는 [[#Due Date]]를 참조하세요.

### 시작 날짜

- `no start date`
- `has start date`
- `starts (on|before|after|on or before|on or after) <날짜>`
- `starts (in|before|after|in or before|in or after) <날짜 범위>`
  - `YYYY-MM-DD YYYY-MM-DD`
  - `(last|this|next) (week|month|quarter|year)`
  - `(YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)`
- `start date is invalid`

자세한 내용은 [[Dates#Start date|시작 날짜]]를 참조하세요.

> [!released]
>
> - `has start date`는 Tasks 1.6.0에서 도입되었습니다.
> - `start date is invalid`는 Tasks 1.16.0에서 도입되었습니다.
> - `starts (before|after|in) <날짜 범위>` 검색은 Tasks 2.0.0에서 도입되었습니다.
> - `starts (before|after|in) (YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)` 검색은 Tasks 3.1.0에서 도입되었습니다.
> - `starts (on or before|on or after) <날짜>` 및 `starts (in or before|in or after) <날짜 범위>` 검색은 Tasks 4.6.0에서 도입되었습니다.

Tasks 4.2.0부터 `task.start`을 사용하여 **[[Custom Filters|사용자 지정 필터링]]을 시작 날짜별로** 할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.dates_task.start_docs.approved.md -->

```text
filter by function task.start.format('dddd') === '일요일'
```

- 일요일에 시작하는 작업을 찾습니다. 즉, 모든 일요일입니다.
- 영어 이외의 시스템에서는 현지 언어로 요일을 입력해야 할 수 있습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

자세한 예제는 [[#Due Date]]를 참조하세요.

#### 시작 날짜를 사용하여 시작 날짜가 있는 작업만 찾기

> [!경고]
> [[Dates#Start date|시작 날짜]]로 필터링할 때
> 결과에는 시작 날짜가 없는 작업이 포함됩니다.
> 이렇게 하면 시작 날짜를 필터로 사용하여 아직 작업할 수 없는 작업을 필터링할 수 있습니다.

예를 들어 다음과 같은 필터를 사용할 수 있습니다.

    ```tasks
    # Find tasks which:
    #    EITHER start before today or earlier
    #    OR     have no start date:
    starts before tomorrow
    ```

> [!팁]
> 실제로 오늘 이전에 시작하는 작업을 찾으려면 다음과 같이 필터를 사용합니다.
> 원문 : To find tasks which really do start before tomorrow:
>
> ````text
> ```tasks
> # Find tasks which start today or earlier:
> ( (starts before tomorrow) AND (has start date) )
> ```
> ````

### 생성 날짜

[[Dates#Created date|생성 날짜]]를 참조하여 Tasks가 생성한 모든 작업 줄에 생성 날짜를 기록하도록 하세요.

- `no created date`
- `has created date`
- `created (on|before|after|on or before|on or after) <date>`
- `created (in|before|after|in or before|in or after) <date range>`
  - `YYYY-MM-DD YYYY-MM-DD`
  - `(last|this|next) (week|month|quarter|year)`
  - `(YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)`
- `created date is invalid`

예를 들어 다음과 같은 필터를 사용할 수 있습니다.

    ```tasks
    created before tomorrow
    ```

> [!released]
>
> - 생성 날짜는 Tasks 2.0.0에서 도입되었습니다.
> - `created (before|after|in) (YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)` 검색은 Tasks 3.1.0에서 도입되었습니다.
> - `created (on or before|on or after) <date>` 및 `created (in or before|in or after) <date range>` 검색은 Tasks 4.6.0에서 도입되었습니다.

Tasks 4.2.0부터 **[[Custom Filters|사용자 정의 필터링]]을 사용하여 생성 날짜로 필터링**할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.dates_task.created_docs.approved.md -->

```text
filter by function task.created.format('dddd') === 'Monday'
```

- 월요일에 생성된 작업을 찾습니다. 즉, 모든 월요일을 찾습니다.
- 영어가 아닌 시스템에서는 현지 언어로 요일을 지정해야 할 수도 있습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

자세한 예제는 [[#Due Date]]를 참조하세요.

### happens

- `happens (on|before|after|on or before|on or after) <date>`
- `happens (in|before|after|in or before|in or after) <date range>`
  - `YYYY-MM-DD YYYY-MM-DD`
  - `(last|this|next) (week|month|quarter|year)`
  - `(YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)`

`happens`는 시작 날짜, 예정 날짜, _또는_ 마감 날짜가 일치하는 모든 작업을 반환합니다.
예를 들어 `happens before tomorrow`는 내일보다 이른 시점에 시작, 예정, 또는 마감되는 모든 작업을 반환합니다.
오늘 시작해서 오늘로부터 일주일 후에 마감되는 작업이 있다면 `happens before tomorrow`가 일치할 것입니다.
왜냐하면 작업이 내일보다 이르게 시작하기 때문입니다. 일치해야 하는 날짜는 하나만 필요합니다.

- `no happens date`
  - 시작 날짜, 예정 날짜, 마감 날짜가 모두 설정되지 않은 작업을 반환합니다.
- `has happens date`
  - 시작 날짜, 예정 날짜, _또는_ 마감 날짜가 설정된 작업을 반환합니다.

> [!released]
>
> - `no happens date` 및 `has happens date`는 Tasks 1.7.0에서 도입되었습니다.
> - `happens (before|after|in) <date range>` 검색은 Tasks 2.0.0에서 도입되었습니다.
> - `happens (before|after|in) (YYYY-Www|YYYY-mm|YYYY-Qq|YYYY)` 검색은 Tasks 3.1.0에서 도입되었습니다.
> - `happens (on or before|on or after) <date>` 및 `happens (in or before|in or after) <date range>` 검색은 Tasks 4.6.0에서 도입되었습니다.

Tasks 4.2.0부터 **[[Custom Filters|사용자 정의 필터링]]을 사용하여 발생 날짜로 필터링**할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.dates_task.happens_docs.approved.md -->

```text
filter by function task.happens.format('dddd') === 'Friday'
```

- 금요일에 발생하는 작업을 찾습니다. 즉, 모든 금요일을 찾습니다.
- 영어가 아닌 시스템에서는 현지 언어로 요일을 지정해야 할 수도 있습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

자세한 예제는 [[#Due Date]]를 참조하세요.

### 날짜 검색 문제 해결

날짜 검색이 예상치 못한 결과를 반환하는 경우, [[Explaining Queries|explain]] 라인을 쿼리에 추가하세요.

이렇게 하면 다음과 같은 일반적인 실수를 식별하는 이 문제를 해결하는 데 도움이 됩니다.

- 필터에서 잘못된 절대 날짜를 사용했습니다.
- 상대 날짜 범위에서 지원되지 않는 키워드를 사용했습니다.

쿼리의 상대 날짜가 전날부터 업데이트되지 않고, 컴퓨터가 자정에 절전 모드였을 경우, 이는 알려진 Chrome 버그로 인해 발생할 가능성이 높으며, 노트를 다시 열어야 합니다. [#1289](https://github.com/obsidian-tasks-group/obsidian-tasks/issues/1289)를 참조하세요.

### 잘못된 날짜가 있는 작업 찾기

> [!released]
>
> - 날짜의 유효성 검사는 Tasks 1.16.0에서 도입되었습니다.
> - `created date is invalid`는 Tasks 2.0.0에서 도입되었습니다.

`📅 2022-02-30`과 같이 존재하지 않는 날짜를 실수로 작업 기호에 사용할 수 있습니다. 2월은 최대 29일입니다.

그러한 작업은 날짜가 있는 것처럼 보이지만, 그 날짜는 절대 찾을 수 없습니다. 읽기 모드에서 볼 때, 날짜는 `Invalid date`로 표시됩니다.

이러한 실수는 다음 검색으로 체계적으로 찾을 수 있습니다.

    ```tasks
    (created date is invalid) OR (done date is invalid) OR (due date is invalid) OR (scheduled date is invalid) OR (start date is invalid)
    ```

> [!warning]
> 위의 검색에서 잘못된 날짜가 있는 작업이 발견되면, [[Backlinks|backlink]]를 클릭하여 잘못된 줄로 이동한 다음 직접 새 날짜를 입력하여 수정하는 것이 가장 좋습니다.

'Create or edit Task' 모달을 사용하면 잘못된 날짜가 무시되고 원래 잘못된 값에 대한 정보가 없습니다.

## 기타 작업 속성에 대한 필터

위의 날짜 관련 검색 외에도 이러한 필터는 개별 작업의 다른 속성을 검색합니다.

### 설명

- `description (includes|does not include) <string>`
  - 대소문자 구분 없이 일치합니다(대문자 소문자를 무시합니다).
  - 일치할 때 글로벌 필터를 무시합니다.
- `description (regex matches|regex does not match) /<JavaScript-style Regex>/`
  - 정규 표현식 일치(기본적으로 대소문자 구분).
  - 필수 읽기: [[Regular Expressions|Regular Expression Searches]].

> [!released]
`regex matches` 및 `regex does not match`는 Tasks 1.12.0에서 도입되었습니다.

정확한 검색을 위해 `description`은 다음과 같이 작동합니다.

- 각 작업의 모든 기호 이모지와 그 값을 먼저 제거합니다.
- 글로벌 필터를 제거합니다.
- 공백을 제거합니다.
- 남은 텍스트를 검색합니다.

예를 들어:

| 글로벌 필터 | 작업 줄 | `description`에서 검색된 텍스트 |
| ------------- | -------- | ------------------------------ |
| 글로벌 필터 없음 | `'- [ ] Do stuff  ⏫  #tag1 ✅ 2022-08-12 #tag2/sub-tag '` | `'Do stuff #tag1 #tag2/sub-tag'` |
| `#task` | `'- [ ] #task Do stuff  ⏫  #tag1 ✅ 2022-08-12 #tag2/sub-tag '` | `'Do stuff #tag1 #tag2/sub-tag'` |
| `global-filter` | `'- [ ] global-filter Do stuff  ⏫  #tag1 ✅ 2022-08-12 #tag2/sub-tag '` | `'Do stuff #tag1 #tag2/sub-tag'` |

Tasks 4.2.0부터 `task.description`을 사용하여 `description`으로 **[[Custom Filters|custom filtering]]**이 가능합니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.other_properties_task.description_docs.approved.md -->

```text
filter by function task.description.length > 100
```

- 긴 설명이 있는 작업을 찾습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 설명 없는 태그

Tasks 4.2.0부터 `task.descriptionWithoutTags`를 사용하여 **[[Custom Filters|custom filtering]]**에서 설명에서 태그를 제거할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.other_properties_task.descriptionWithoutTags_docs.approved.md -->

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 우선순위

- `priority is (above|below|not)? (lowest|low|none|medium|high|highest)`

사용 가능한 우선순위는 (높은 순서에서 낮은 순서):

1. 🔺 최고 우선순위
2. ⏫ 높은 우선순위
3. 🔼 중간 우선순위
4. 우선순위 없음을 나타내기 위해 기호를 사용하지 않음(‘none’으로 검색)
5. 🔽 낮은 우선순위
6. ⏬️ 가장 낮은 우선순위

자세한 내용은 [[Priority|Priorities]]를 참조하세요.

> [!released]
> 우선순위 'lowest' 및 'highest'는 Tasks 3.9.0에서 도입되었습니다.

Tasks 4.2.0부터 `task.priorityName` 및 `task.priorityNumber`를 사용하여 **[[Custom Filters|custom filtering]]**로 우선순위 이름과 번호로 필터링할 수 있습니다.

우선순위 이름 사용:

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.other_properties_task.priorityName_docs.approved.md -->

```text
filter by function task.priorityName !== 'Normal'
```

- `priority is not none`과 같습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

우선순위 번호 사용:

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.other_properties_task.priorityNumber_docs.approved.md -->

```text
filter by function task.priorityNumber % 2 === 0
```

- Highest가 0이고 Lowest가 5인 작업의 우선순위 번호를 사용하여 필터링합니다.
- 이 인공적인 예제는 Highest, Medium 및 Low 우선순위의 모든 작업을 찾습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

#### 예시

    ```tasks
    not done
    priority is above none
    ```

    ```tasks
    priority is high
    ```

    ```tasks
    not done
    priority is not none
    ```

### 긴급성

긴급성으로 필터링하는 내장 명령은 없습니다.

Tasks 4.2.0부터 `task.urgency`를 사용하여 **[[Custom Filters|custom filtering]]**로 긴급성을 필터링할 수 있습니다.

> [!경고]
> 다음 예제를 주의 깊게 읽으세요. `task.urgency`를 `filter by function`과 함께 성공적으로 사용하려면 비정수 숫자를 검색하는 방법을 이해하는 것이 중요합니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.other_properties_task.urgency_docs.approved.md -->

```text
filter by function task.urgency > 8.9999
```

- `9.0` 이상의 긴급성 점수를 가진 작업을 찾습니다.
- 제한 값으로 `8.9999`가 사용됩니다.
- ‘보다 작음’ 또는 ‘보다 큼’으로 두 긴급성 값을 비교하는 검색(‘>’, ‘>=`, ‘<’ 또는 ‘<=’ 중 하나를 사용)은 **반드시 값을 약간 조정하여 반올림을 허용해야 합니다**.

```text
filter by function task.urgency > 7.9999 && task.urgency < 11.0001
```

- `8.0`에서 `11.0` 사이의 긴급성 점수를 가진 작업을 찾습니다.

```text
filter by function task.urgency.toFixed(2) === 1.95.toFixed(2)
```

- [[Urgency#Why do all my tasks have urgency score 1.95?|기본 긴급성]]인 `1.95`를 가진 작업을 찾습니다.
- 모든 수치 값에 대한 동등성 또는 불평등 검색을 수행하는 올바른 방법입니다.
- `===` 양쪽의 `.toFixed(2)`는 비교되는 두 숫자가 모두 동일한 수의 소수점 자리(2)로 반올림되도록 합니다.
- 비정수 숫자를 비교할 때 `10.29`가 정확히 동일하지 않은 경우 걸려들지 않도록 하기 위해 중요합니다.

```text
filter by function task.urgency.toFixed(2) !== 1.95.toFixed(2)
```

- 기본 점수 `1.95` 이외의 긴급성을 가진 작업을 찾습니다.

```text
filter by function task.urgency === 10.29
```

- **이렇게 하면 작업이 하나도 검색되지 않습니다**.
- ==숫자와 같은 것들의 동등성 또는 불평등 검색에 원시 숫자를 사용하지 마세요==, 정수 또는 부동 소수점 숫자일지라도 마찬가지입니다.
- `group by urgency`를 사용하고 헤더를 검토하면 다음 값을 가진 작업이 긴급성 `10.19`를 갖는다는 것을 알 수 있습니다.
  - 내일 마감,
  - 우선순위 기호가 없습니다.
- 이를 통해 `task.urgency === 10.29`를 검색할 수 있다고 생각할 수 있습니다.
- 그러나 우리의 함수는 다음 값을 동등성 검사하고 있습니다.
  - `task.urgency`는 대략:
    - `10.292857142857140928526860079728`
  - `10.29`는 대략:
    - `10.289999999999999147348717087880`
- 이 값들은 **정확히 같지 않습니다**. 따라서 테스트는 일치하는 작업을 찾지 못합니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 반복

- `is recurring`
- `is not recurring`
- `반복 (포함|포함하지 않음) <반복 규칙의 일부>`
  - 대소문자 구분 없이 일치합니다.
  - 검색되는 텍스트는 프로그래밍 방식으로 생성되고 표준화되므로 수동으로 입력한 작업의 텍스트와 정확히 일치하지 않을 수 있습니다. 예를 들어 `🔁 every Sunday`로 되어 있는 작업은 `every week on Sunday`로 검색됩니다.
  - 작업의 표준화된 반복 규칙을 확인하는 가장 쉬운 방법은 `group by recurrence`를 사용하고 결과 그룹 헤더를 검토하는 것입니다.
- `반복 (정규식 일치|정규식 일치하지 않음) /<JavaScript 스타일 정규식>/`
  - 정규식 일치 여부(기본값은 대소문자 구분)
  - 필수 읽기: [[Regular Expressions|정규식 검색]]

자세한 내용은 [[Recurring Tasks]]를 참조하세요.

> [!released]
`recurrence` 텍스트 검색은 Tasks 1.22.0에서 도입되었습니다.

Tasks 4.2.0부터 `task.isRecurring`과 `task.recurrenceRule`을 사용하여 **[[Custom Filters|custom filtering]]**로 반복을 필터링할 수 있습니다.

`task.isRecurring`을 사용한 경우:

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.other_properties_task.isRecurring_docs.approved.md -->



```text
filter by function task.isRecurring
```

- `is recurring`과 같습니다.
- 다른 조건과 함께 `&&`(Boolean AND) 또는 `||`(Boolean OR)와 함께 사용할 수 있습니다.

```text
filter by function !task.isRecurring
```

- `is not recurring`과 같습니다.
- 다른 조건과 함께 `&&`(Boolean AND) 또는 `||`(Boolean OR)와 함께 사용할 수 있습니다.

```text
filter by function (!task.isRecurring) && task.originalMarkdown.includes('🔁')
```

- **깨진/잘못된 반복 규칙**이 있는 작업을 찾습니다.
- Tasks 이모티콘 형식을 사용한다고 가정하며, 다른 형식을 사용하는 경우에는 물론 업데이트해야 합니다.
- 이는 반복 규칙이 유효하지 않더라도 설명에서 읽고 제거된다는 Tasks의 구현 세부 사항에 대한 지식을 사용합니다.
- 따라서 `task.isRecurring`이 거짓이더라도 원래 작업이 반복 지시자를 포함했는지 확인하려면 `task.originalMarkdown`에서 반복 마커를 검색해야 합니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

`task.recurrenceRule`을 사용한 경우 - 사용하기 전에 `task.recurrenceRule`에 대한 [[Task Properties#Values for Other Task Properties]]의 설명을 읽어주세요.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.other_properties_task.recurrenceRule_docs.approved.md -->

```text
filter by function task.recurrenceRule.includes("every week")
```

- `recurrence includes every week`과 유사하지만 대소문자를 구분합니다.

```text
filter by function !task.recurrenceRule.includes("every week")
```

- `recurrence does not include every week`과 유사하지만 대소문자를 구분합니다.

```text
filter by function task.recurrenceRule.includes("every week") && task.recurrenceRule.includes("when done")
```

- 매주 마감되는 작업을 찾고, 반복 규칙에 `when done`이 **포함**된 작업을 찾습니다.

```text
filter by function task.recurrenceRule.includes("every week") && !task.recurrenceRule.includes("when done")
```

- 매주 마감되는 작업을 찾고, 반복 규칙에 `when done`이 **포함되지 않은** 작업을 찾습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 하위 항목

- `exclude sub-items`
  - 이 옵션을 설정하면 결과 목록에 해당 파일에 들여쓰기되지 않은 작업만 포함됩니다. 해당 목록의 최상위 목록 항목만 표시됩니다.

### 태그

> [!released]
Tasks 1.6.0에서 도입되었습니다.

[[Tags]]에서 Tasks 플러그인에서 태그가 어떻게 작동하는지에 대한 중요한 정보를 확인하세요.

- `no tags`
- `has tags`
- `tags (include|do not include) <tag>` _또는_
- `tag (includes|does not include) <tag>`
  - 대소문자를 구분하지 않고 일치합니다.
  - 일치할 때는 글로벌 필터를 무시합니다.
  - `#`는 태그에 선택 사항이며 `#home`과 `home`은 `#home`과 일치합니다.
  - `#`가 주어지면 반드시 있어야 하며, `#home`을 검색하면 `#home`은 일치하지만 `#location/home`은 일치하지 않습니다.
  - 일치는 부분적이므로 `tags include foo`는 `#foo/bar`와 `#foo-bar`와 일치합니다.
- `tags (regex matches|regex does not match) /<JavaScript-style Regex>/` _또는_
- `tag (regex matches|regex does not match) /<JavaScript-style Regex>/`
  - 정규 표현식과 일치합니다(기본적으로 대소문자를 구분합니다).
  - 필수 읽기: [[Regular Expressions|Regular Expression Searches]].
  - 하위 태그를 피하기 위해 정규 표현식 끝에 `$` 문자를 넣어 태그 검색을 가능하게 합니다. 아래 예를 참조하세요.
  - 하위 태그를 검색할 때는 정규 표현식에서 슬래시를 이스케이프해야 합니다. `\/`

> [!released]
>
> - `regex matches` 및 `regex does not match`은 Tasks 1.13.0에서 도입되었습니다.
> - `no tags` 및 `has tags`는 Tasks 2.0.0에서 도입되었습니다.

Tasks 4.2.0부터 `task.tags`를 사용하여 **[[Custom Filters|사용자 정의 필터링]]을 태그별로** 할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.other_properties_task.tags_docs.approved.md -->

```text
filter by function task.tags.length === 1
```

- 정확히 1개의 태그(글로벌 필터 제외)가 있는 작업을 찾습니다.

```text
filter by function task.tags.length > 1
```

- 하나 이상의 태그(글로벌 필터 제외)가 있는 작업을 찾습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

다음은 [nested tags](https://help.obsidian.md/Editing+and+formatting/Tags#Nested+tags)를 사용하는 작업이 있는 경우 복사해 사용하는 것이 좋을 더 복잡한 예입니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.other_properties_task.tags.advanced_docs.approved.md -->

```text
filter by function task.tags.find( (tag) => tag.includes('/') ) && true || false
```

- 최소 하나의 중첩 태그가 있는 모든 작업을 찾습니다.

```text
filter by function task.tags.find( (tag) => tag.split('/').length >= 3 ) && true || false
```

- `#context/home/ground-floor`와 같은 최소 하나의 이중 중첩 태그가 있는 모든 작업을 찾습니다.
- 이 구문은 각 태그를 `/` 문자로 분리하고, 최소 3개의 단어가 있으면 일치로 간주합니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

#### 태그 쿼리 예시

- `tags include #todo`
- `tags do not include #todo`
- `tag regex matches /#t$/`
  - 단일 문자 태그 `#t`를 검색하며, 하위 태그는 없습니다. `$`는 태그 텍스트의 끝을 나타냅니다.
- `tag regex matches /#book$/i`
  - 뒤에 있는 `i`는 대소문자를 구분하지 않음을 의미합니다.
  - `#book`, `#Book`, `#BOOK`과 같은 태그를 검색하며, `$`는 `#books`, `#book/literature` 등과 일치하지 않도록 합니다.

### 원본 마크다운

원본 마크다운 줄로 필터링하는 내용에 대한 내장된 지시사항은 없습니다.

Tasks 4.2.0부터 **[[사용자 정의 필터링|사용자 정의 필터링]]**으로 원본 마크다운 줄을 사용하여 작업을 필터링할 수 있습니다. 이를 사용하여 Tasks가 파싱하지 않는 task.originalMarkdown에서 정보를 추출하여 작업을 필터링하는 데 사용할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.other_properties_task.originalMarkdown_docs.approved.md -->

<!-- placeholder to force blank line after included text --><!-- endInclude -->

## 파일 속성에 대한 필터

이러한 필터를 사용하면 특정 파일 및 파일의 섹션에서 작업을 검색할 수 있습니다.

### 파일 경로

경로에는 `.md` 확장자가 포함됩니다.

- `path (includes|does not include) <path>`
  - 대소문자를 구분하지 않습니다(대소문자를 무시합니다).
  - 현재 쿼리를 포함하는 파일의 경로에 대한 자리 표시자로 `{{query.file.path}}` 또는 `{{query.file.pathWithoutExtension}}`을 사용할 수 있습니다.
    - 예: `path equals {{query.file.path}}`
    - 유용한 자료: [[Query Properties]] 및 [[Placeholders]]
- `path (regex matches|regex does not match) /<JavaScript-style Regex>/`
  - 정규식과 일치합니다(기본적으로 대소문자를 구분합니다).
  - 필수 자료: [[정규 표현식|정규 표현식 검색]].

> [!released]
>
> - `regex matches`와 `regex does not match`은 Tasks 1.12.0에서 도입되었습니다.
> - 자리 표시자는 Tasks 4.7.0에서 출시되었습니다.

Tasks 4.2.0부터 **[[사용자 정의 필터링|사용자 정의 필터링]]**으로 파일 경로인 task.file.path을 사용하여 작업을 필터링할 수 있습니다.

Tasks 4.8.0에서 task.file.pathWithoutExtension이 추가되었습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.file_properties_task.file.path_docs.approved.md -->

```text
filter by function task.file.path.includes('tasks releases/4.1.0 Release.md')
```

- 'path includes'와 유사하지만 **대소문자를 구분**합니다: 대소문자 구분이 중요합니다.

```text
filter by function task.file.path === 'tasks releases/4.1.0 Release.md'
```

- 정확한, **대소문자를 구분하는** 일치 검색입니다.
- 파일 확장자도 포함되어야 합니다.
- 내장된 검색으로는 `/`와 같은 특수 문자로 이스케이프하고, `^` 및 `$`를 사용하여 정규식을 사용해야만 가능합니다.

```text
filter by function task.file.path.toLocaleLowerCase() === 'TASKS RELEASES/4.1.0 RELEASE.MD'.toLocaleLowerCase()
```

- 정확한, **대소문자를 구분하지 않는** 일치 검색입니다.
- 두 값을 모두 소문자로 변환하여 수동으로 소문자로 변환할 필요가 없습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 루트 (Root)

> [!released]
>
> - Tasks 3.4.0에서 도입되었습니다.
> - 자리 표시자는 Tasks 4.7.0에서 출시되었습니다.

`root`는 작업을 포함하는 파일의 최상위 폴더입니다. 즉, 경로에서 첫 번째 디렉토리이며, 루트 폴더에 있는 파일의 경우 `/`가 됩니다.

- `root (includes|does not include) <root>`
  - 대소문자를 구분하지 않습니다(대소문자를 무시합니다).
  - 현재 쿼리를 포함하는 파일의 루트에 대한 자리 표시자로 `{{query.file.root}}`을 사용할 수 있습니다.
    - 예: `root includes {{query.file.root}}`
    - 유용한 자료: [[Query Properties]] 및 [[Placeholders]]
- `root (regex matches|regex does not match) /<JavaScript-style Regex>/`
  - 정규식과 일치합니다(기본적으로 대소문자를 구분합니다).
  - 필수 자료: [[정규 표현식|정규 표현식 검색]].

Tasks 4.2.0부터 **[[사용자 정의 필터링|사용자 정의 필터링]]**으로 루트 폴더인 task.file.root을 사용하여 작업을 필터링할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.file_properties_task.file.root_docs.approved.md -->

```text
filter by function task.file.root === '/'
```

- 볼트 루트에 있는 파일에서 작업을 찾습니다.
- 대소문자를 구분합니다: 대소문자 구분이 중요합니다.

```text
filter by function task.file.root === 'Work/'
```

- 볼트 루트에 있는 `Work` 폴더 내부의 파일에서 작업을 찾습니다.
- 대소문자를 구분합니다: 대소문자 구분이 중요합니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 폴더 (Folder)

> [!released]
>
> - Tasks 3.4.0에서 도입되었습니다.
> - 자리 표시자는 Tasks 4.7.0에서 출시되었습니다.

작업을 포함하는 파일의 `folder`입니다. 루트 폴더의 경우 `/`가 됩니다.

- `folder (includes|does not include) <folder>`
  - 대소문자를 구분하지 않습니다(대소문자를 무시합니다).
  - 현재 쿼리를 포함하는 파일의 폴더에 대한 자리 표시자로 `{{query.file.folder}}`을 사용할 수 있습니다.
    - 예: `folder includes {{query.file.folder}}`, 이는 쿼리를 포함하는 폴더와 **하위 폴더**에 있는 작업과 일치합니다.
    - 유용한 자료: [[Query Properties]] 및 [[Placeholders]]
- `folder (regex matches|regex does not match) /<JavaScript-style Regex>/`
  - 정규식과 일치합니다(기본적으로 대소문자를 구분합니다).
  - 필수 자료: [[정규 표현식|정규 표현식 검색]].

Tasks 4.2.0부터 **[[사용자 정의 필터링|사용자 정의 필터링]]**으로 폴더인 task.file.folder을 사용하여 작업을 필터링할 수 있습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.file_properties_task.file.folder_docs.approved.md -->

```text
filter by function task.file.folder === "Work/Projects/"
```

- 주어진 폴더에 있는 파일에서 작업만 찾습니다. 하위 폴더는 포함되지 않습니다.
- 등호(`===`) 테스트는 후행 슬래시(`/`)를 포함해야 합니다.

```text
filter by function task.file.folder.includes("Work/Projects/")
```

- 특정 폴더와 해당 하위 폴더에 있는 파일에서 작업을 찾습니다.

```text
filter by function task.file.folder.includes( '{{query.file.folder}}' )
```

- 쿼리를 포함하는 폴더와 해당 하위 폴더에 있는 파일에서 작업을 찾습니다.
- 자리 표시자 텍스트가 원시 문자열로 확장되므로 따옴표 안에 있어야 합니다.

```text
filter by function task.file.folder === '{{query.file.folder}}'
```

- 쿼리를 포함하는 폴더에 있는 파일에서 작업을 찾습니다(하위 폴더의 작업은 포함하지 않음).

```text
filter by function task.file.folder.includes("Work/Projects")
```

- 후행 슬래시(`/`)를 생략하면 다음과 같은 폴더 내부의 파일에서도 작업을 찾을 수 있습니다:
  - `Work/Projects 2023/`
  - `Work/Projects Top Secret/`

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 파일 이름 (File Name)

> [!released]
>
> - Tasks 3.4.0에서 도입되었습니다.
> - 자리 표시자는 Tasks 4.7.0에서 출시되었습니다.

파일 이름에는 `.md` 확장자가 포함됩니다.

- `filename (includes|does not include) <filename>`
  - 대소문자를 구분하지 않습니다(대소문자를 무시합니다).
  - 현재 쿼리를 포함하는 파일의 파일 이름에 대한 자리 표시자로 `{{query.file.filename}}` 또는 `{{query.file.filenameWithoutExtension}}`을 사용할 수 있습니다.
    - 예: `filename includes {{query.file.filename}}`
    - 유용한 자료: [[Query Properties]] 및 [[Placeholders]]
- `filename (regex matches|regex does not match) /<JavaScript-style Regex>/`
  - 정규식과 일치합니다(기본적으로 대소문자를 구분합니다).
  - 필수 자료: [[정규 표현식|정규 표현식 검색]].

Tasks 4.2.0부터 **[[사용자 정의 필터링|사용자 정의 필터링]]**으로 파일 이름인 task.file.filename을 사용하여 작업을 필터링할 수 있습니다.

Tasks 4.8.0에서 task.file.filenameWithoutExtension이 추가되었습니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.file_properties_task.file.filename_docs.approved.md -->

```text
filter by function task.file.filename === "4.1.0 Release.md"
```

- 파일 이름이 정확히 일치하는 파일에서 작업을 찾습니다. 폴더는 상관하지 않습니다.
- 등호(`===`) 테스트는 파일 확장자 `.md`를 포함해야 합니다.

```text
filter by function task.file.filename.includes("4.1.0 Release")
```

- 파일 이름에 주어진 텍스트가 포함된 파일에서 작업을 찾습니다.
- `.includes()`를 사용하고 파일 확장자를 생략함으로써 `14.1.0 Release.md` 및 `4.1.0 Release Notes.md`와 같은 파일도 찾을 수 있습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 제목 (Heading)

- `heading (includes|does not include) <string>`
  - 작업 앞의 제목에 주어진 문자열이 포함되어 있는지 여부입니다.
  - 항상 가장 가까운 위치의 제목과 일치하려고 시도합니다(제목 수준과는 관계없이).
  - `does not include`는 작업 앞에 제목이 없는 작업과 일치합니다.
  - 대소문자를 구분하지 않습니다(대소문자를 무시합니다).
- `heading (regex matches|regex does not match) /<JavaScript-style Regex>/`
  - 작업 앞의 제목이 주어진 정규식과 일치하는지 여부입니다(기본적으로 대소문자를 구분합니다).
  - 항상 가장 가까운 위치의 제목과 일치하려고 시도합니다(제목 수준과는 관계없이).
  - `regex does not match`는 작업 앞에 제목이 없는 작업과 일치합니다.
  - 필수 자료: [[정규 표현식|정규 표현식 검색]].

> [!released]
`regex matches`와 `regex does not match`은 Tasks 1.12.0에서 도입되었습니다.

Tasks 4.2.0부터 **[[사용자 정의 필터링|사용자 정의 필터링]]**으로 제목을 사용하여 작업을 필터링할 수 있습니다. task.heading을 사용합니다.

> [!팁]
> 제목 검색은 매우 강력할 수 있습니다: 정보를 제목에 넣고 검색어로 해당 정보를 찾도록 쿼리를 작성할 수 있습니다:
>
> - 작업에 있는 경우,
> - 또는 작업에 없는 경우, 앞의 제목에서 찾을 수 있도록 합니다.
>
> 이것은 자체적으로 [[파일 이름으로 기본 날짜 지정하기|파일 이름에서 스케줄된 날짜를 추론하는 내장 메커니즘]]보다 더 일반화된 버전입니다.

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.file_properties_task.heading_docs.approved.md -->

```text
filter by function const taskDate = task.due.moment; const wanted = '2023-06-11'; return taskDate?.isSame(wanted, 'day') || ( !taskDate && task.heading?.includes(wanted)) || false
```

- 다음을 만족하는 작업을 찾습니다:
  - **또는** `2023-06-11` 날짜에 만료되는 작업,
  - **또는** 만료일이 없고, 앞의 제목에 동일한 문자열로 포함된 `2023-06-11`이 포함된 작업.
- 값의 반복을 피하기 위해 변수를 사용하므로 `return`을 추가해야 합니다.

```text
filter by function const taskDate = task.due.moment; const now = moment(); return taskDate?.isSame(now, 'day') || ( !taskDate && task.heading?.includes(now.format('YYYY-MM-DD')) ) || false
```

- 다음을 만족하는 작업을 찾습니다:
  - **오늘의 날짜**에 만료되는 작업,
  - **또는** 만료일이 없고, 앞의 제목에 오늘의 날짜인 `YYYY-MM-DD`로 포함된 작업을 찾습니다.

```text
filter by function task.heading?.includes('#context/home') || task.tags.find( (tag) => tag === '#context/home' ) && true || false
```

- 다음을 만족하는 작업을 찾습니다:
  - 작업 라인에 정확히 `#context/home`과 일치하는 태그가 있는 경우,
  - 또는 앞의 제목에 어디든지 `#context/home` 텍스트가 포함된 경우.
    - 데모 목적으로, 이것은 약간 부정확하며 `#context/home/ground-floor`와 같은 중첩된 작업도 일치시킬 수 있습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

![사용자 정의 필터링으로부터 날짜와 태그를 추출할 수 있습니다](images/search-headings-for-date-and-tag.png)
사용자 정의 필터링으로부터 날짜와 태그를 추출할 수 있습니다.

## 부록: Tasks 2.0.0에서 개선된 날짜 필터

Tasks 2.0.0에서는 날짜 범위를 필터링하는 개념이 도입되었습니다.

모든 경우에서 이 새로운 기능은 Tasks 날짜 필터의 결과를 개선합니다.

이 부록에서는 다양한 검색 결과가 어떻게 변경되었는지 보여줌으로써 기존 검색을 업데이트해야 할 필요성을 결정할 수 있도록 도와줍니다.

### due (before|on|in||after) absolute date: results unchanged

Unchanged interpretation of various **[[Filters#Absolute dates|absolute due date]]** filters:

| keyword     | Tasks 1.25.0 and earlier                                                                          | Tasks 2.0.0 onwards                                                                              |
| ----------- | ------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| **Summary** | All searches behave logically, using the correct date.                                            | Identical behaviour to previous releases.                                                         |
| `before`    | `due before 2023-02-09` =><br>  due date is before<br>2023-02-09 (Thursday 9th February 2023)<br> | `due before 2023-02-09` =><br>  due date is before<br>2023-02-09 (Thursday 9th February 2023)<br> |
| `on`        | `due on 2023-02-09` =><br>  due date is on<br>2023-02-09 (Thursday 9th February 2023)<br>         | `due on 2023-02-09` =><br>  due date is on<br>2023-02-09 (Thursday 9th February 2023)<br>         |
| `in`        | `due in 2023-02-09` =><br>  due date is on<br>2023-02-09 (Thursday 9th February 2023)<br>         | `due in 2023-02-09` =><br>  due date is on<br>2023-02-09 (Thursday 9th February 2023)<br>         |
|             | `due 2023-02-09` =><br>  due date is on<br>2023-02-09 (Thursday 9th February 2023)<br>            | `due 2023-02-09` =><br>  due date is on<br>2023-02-09 (Thursday 9th February 2023)<br>            |
| `after`     | `due after 2023-02-09` =><br>  due date is after<br>2023-02-09 (Thursday 9th February 2023)<br>   | `due after 2023-02-09` =><br>  due date is after<br>2023-02-09 (Thursday 9th February 2023)<br>   |

### due (before|on|in||after) absolute date range: 결과가 개선됨

다양한 **[[Filters#Absolute date ranges|절대 due 날짜 범위]]** 필터가 있습니다.

| 키워드      | Tasks 1.25.0 이전 버전                                                                                        | Tasks 2.0.0 이후 버전                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **요약**     | 두 번째 날짜는 무시됨: 첫 번째 날짜만 사용됨.                                                    | 값은 날짜 범위로 해석됩니다.<br>`after`는 종료 날짜를 고려합니다.                                                                                                                                                                   |
| `before`    | `due before 2023-02-07 2023-02-11` =><br>  만기일이<br>2023-02-07(2023년 2월 7일 화요일) 이전<br> | `due before 2023-02-07 2023-02-11` =><br>  만기일이<br>2023-02-07(2023년 2월 7일 화요일) 이전<br>                                                        |
| `on`        | `due on 2023-02-07 2023-02-11` =><br>  만기일이<br>2023-02-07(2023년 2월 7일 화요일)에<br>     | `due on 2023-02-07 2023-02-11` =><br>  만기일이<br>2023-02-07(2023년 2월 7일 화요일)부터<br>2023-02-11(2023년 2월 11일 토요일)까지 포함<br> |
| `in`        | `due in 2023-02-07 2023-02-11` =><br>  만기일이<br>2023-02-07(2023년 2월 7일 화요일)에<br>     | `due in 2023-02-07 2023-02-11` =><br>  만기일이<br>2023-02-07(2023년 2월 7일 화요일)부터<br>2023-02-11(2023년 2월 11일 토요일)까지 포함<br> |
|             | `due 2023-02-07 2023-02-11` =><br>  만기일이<br>2023-02-07(2023년 2월 7일 화요일)에<br>     | `due 2023-02-07 2023-02-11` =><br>  만기일이<br>2023-02-07(2023년 2월 7일 화요일)부터<br>2023-02-11(2023년 2월 11일 토요일)까지 포함<br>    |
| `after`     | `due after 2023-02-07 2023-02-11` =><br>  만기일이<br>2023-02-07(2023년 2월 7일 화요일) 이후<br>   | `due after 2023-02-07 2023-02-11` =><br>  만기일이<br>2023-02-11(2023년 2월 11일 토요일) 이후<br>                                                        |

아래는 주어진 내용의 번역입니다. 백틱(`) 안에 있는 텍스트는 그대로 두었습니다.

### `last week`에 대한 차이점:

| 키워드     | Tasks 1.25.0 이전 버전                                                                                     | Tasks 2.0.0 이후 버전                                                                                                                                                            |
| ----------- | -------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **요약**    | `last week`는 단일 날짜로 해석됩니다:<br>현재 날짜로부터 `7일 전`입니다.                                 | `last week`는 날짜 범위로 해석됩니다:<br>이전 `월요일부터 일요일`까지입니다.<br>`after`는 종료 날짜를 고려합니다.                                              |
| `before`    | `due before last week` =><br>  만기일이<br>2023-02-03 (2023년 2월 3일 금요일) 이전<br>                     | `due before last week` =><br>  만기일이<br>2023-01-30 (2023년 1월 30일 월요일) 이전<br>                           |
| `on`        | `due on last week` =><br>  만기일이<br>2023-02-03 (2023년 2월 3일 금요일)에<br>                             | `due on last week` =><br>  만기일이<br>2023-01-30 (2023년 1월 30일 월요일)부터<br>2023-02-05 (2023년 2월 5일 일요일)까지 포함<br> |
| `in`        | `due in last week` =><br>  만기일이<br>2023-02-03 (2023년 2월 3일 금요일)에<br>                             | `due in last week` =><br>  만기일이<br>2023-01-30 (2023년 1월 30일 월요일)부터<br>2023-02-05 (2023년 2월 5일 일요일)까지 포함<br> |
|             | `due last week` =><br>  만기일이<br>2023-02-03 (2023년 2월 3일 금요일)에<br>                                | `due last week` =><br>  만기일이<br>2023-01-30 (2023년 1월 30일 월요일)부터<br>2023-02-05 (2023년 2월 5일 일요일)까지 포함<br>    |
| `after`     | `due after last week` =><br>  만기일이<br>2023-02-03 (2023년 2월 3일 금요일) 이후<br>                     | `due after last week` =><br>  만기일이<br>2023-02-05 (2023년 2월 5일 일요일) 이후<br>                           |

### `this week`에 대한 차이점:

| 키워드     | Tasks 1.25.0 이전 버전                                                                                      | Tasks 2.0.0 이후 버전                                                                                                                                                                   |
| ----------- | ----------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **요약**    | `this week`는 단일 날짜로 해석됩니다:<br>현재 날짜로부터 `일요일 전`입니다.                            | `this week`는 날짜 범위로 해석됩니다:<br>현재 날짜를 포함한 `월요일부터 일요일`까지입니다.<br>`after`는 종료 날짜를 고려합니다.                                                |
| `before`    | `due before this week` =><br>  만기일이<br>2023-02-05 (2023년 2월 5일 일요일) 이전<br>                   | `due before this week` =><br>  만기일이<br>2023-02-06 (2023년 2월 6일 월요일) 이전<br>                                        |
| `on`        | `due on this week` =><br>  만기일이<br>2023-02-05 (2023년 2월 5일 일요일)에<br>                           | `due on this week` =><br>  만기일이<br>2023-02-06 (2023년 2월 6일 월요일)부터<br>2023-02-12 (2023년 2월 12일 일요일)까지 포함<br> |
| `in`        | `due in this week` =><br>  만기일이<br>2023-02-05 (2023년 2월 5일 일요일)에<br>                           | `due in this week` =><br>  만기일이<br>2023-02-06 (2023년 2월 6일 월요일)부터<br>2023-02-12 (2023년 2월 12일 일요일)까지 포함<br> |
|             | `due this week` =><br>  만기일이<br>2023-02-05 (2023년 2월 5일 일요일)에<br>                              | `due this week` =><br>  만기일이<br>2023-02-06 (2023년 2월 6일 월요일)부터<br>2023-02-12 (2023년 2월 12일 일요일)까지 포함<br>    |
| `after`     | `due after this week` =><br>  만기일이<br>2023-02-05 (2023년 2월 5일 일요일) 이후<br>                   | `due after this week` =><br>  만기일이<br>2023-02-12 (2023년 2월 12일 일요일) 이후<br>                                        |

### `next week`에 대한 차이점:

| 키워드     | Tasks 

1.25.0 이전 버전                                                                                    | Tasks 2.0.0 이후 버전                                                                                                                               |
| ----------- | ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| **요약**    | `next week`는 단일 날짜로 해석됩니다:<br>현재 날짜로부터 `7일 후`입니다.                                | `next week`는 날짜 범위로 해석됩니다:<br>다음 `월요일부터 일요일`까지입니다.<br>`after`는 종료 날짜를 고려합니다.                               |
| `before`    | `due before next week` =><br>  만기일이<br>2023-02-17 (2023년 2월 17일 금요일) 이전<br>                 | `due before next week` =><br>  만기일이<br>2023-02-13 (2023년 2월 13일 월요일) 이전<br>                                                    |
| `on`        | `due on next week` =><br>  만기일이<br>2023-02-17 (2023년 2월 17일 금요일)에<br>                         | `due on next week` =><br>  만기일이<br>2023-02-13 (2023년 2월 13일 월요일)부터<br>2023-02-19 (2023년 2월 19일 일요일)까지 포함<br> |
| `in`        | `due in next week` =><br>  만기일이<br>2023-02-17 (2023년 2월 17일 금요일)에<br>                         | `due in next week` =><br>  만기일이<br>2023-02-13 (2023년 2월 13일 월요일)부터<br>2023-02-19 (2023년 2월 19일 일요일)까지 포함<br> |
|             | `due next week` =><br>  만기일이<br>2023-02-17 (2023년 2월 17일 금요일)에<br>                            | `due next week` =><br>  만기일이<br>2023-02-13 (2023년 2월 13일 월요일)부터<br>2023-02-19 (2023년 2월 19일 일요일)까지 포함<br>    |
| `after`     | `due after next week` =><br>  만기일이<br>2023-02-17 (2023년 2월 17일 금요일) 이후<br>                 | `due after next week` =><br>  만기일이<br>2023-02-19 (2023년 2월 19일 일요일) 이후<br>                                                    |