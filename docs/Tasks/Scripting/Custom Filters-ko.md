# 커스텀 필터

<span class="related-pages">#기능/스크립팅 #기능/필터</span>

> [!출시]
> 커스텀 필터는 Tasks 4.2.0에서 도입되었습니다.

## 요약

- 자바스크립트 표현식을 사용하여 고유한 작업 필터를 정의할 수 있습니다:
  - `filter by function task.description.replace('#task ', '').length < 3`
- 표현식은 `boolean`으로 평가되어야 하며, 따라서 `true` 또는 `false`입니다.
- [[Filters-ko]]에는 다양한 예제가 있습니다.
  - 해당 파일에서 `filter by function`을 검색하세요.
- [[Task Properties-ko]] 및 [[Quick Reference-ko]]에서 지원하는 작업 속성을 모두 찾아보세요.
  - 일부 속성은 내장 그룹화 지시문이 아닌 사용자 정의 필터 및 그룹화에만 사용할 수 있습니다.
- 표현식이 작동하는 방식에 대해 간단히 알아보세요. [[Expressions-ko]].

## 커스텀 필터 소개

Tasks 플러그인은 Tasks 쿼리 결과에서 작업을 [[Filters-ko|필터링]]하는 많은 내장된 방법을 제공합니다.

하지만 때로는 내장 기능이 원하는 대로 동작하지 않을 수도 있습니다.

**커스텀 필터링**을 사용하면 작업을 그룹화하기 위해 **고유한 검색 체계를 개발**할 수 있습니다.

`filter by function` 지시문을 사용하고, 각 작업이 검색 결과에 포함되어야 하는지 여부를 결정하기 위해 JavaScript로 작성된 규칙을 추가합니다. 아래 예제를 참조하세요.

## 작동 방식

### 사용 가능한 작업 속성

참조 섹션 [[Task Properties-ko]]에는 사용자 정의 필터에서 사용할 수 있는 모든 작업 속성이 나열되어 있습니다.

사용 가능한 작업 속성은 [[Quick Reference-ko]] 테이블에서도 확인할 수 있습니다.

### 사용 가능한 쿼리 속성

참조 섹션 [[Query Properties-ko]]에는 커스텀 필터 내에서 [[Placeholders-ko]]를 통해 사용할 수 있는 모든 쿼리 속성이 나열되어 있습니다.

커스텀 필터의 플레이스홀더는 따옴표로 둘러싸여야 합니다.

> [!출시]
> 쿼리 속성 및 플레이스홀더는 Tasks 4.7.0에서 도입되었습니다.

### 표현식

지시문은 다음과 같은 형태입니다:

- `filter by function <expression>`

표현식은 보우트(vault)의 한 번에 하나의 작업에 대해 평가(계산)됩니다.

표현식은 `boolean`으로 평가되어야 하며, 따라서 `true` 또는 `false`입니다.

표현식 결과가 작업에 대해 `true`인 경우, 해당 작업은 사용자 정의 필터와 일치한다는 것을 의미합니다.

물론, 표현식 결과가 `false`인 경우, 해당 작업은 사용자 정의 필터와 일치하지 않습니다.

## 커스텀 필터 예제

아래는 커스텀 필터로 수행할 수 있는 일부 예제입니다.

[[Filters-ko]] 페이지에서 `filter by function`을 검색하여 더 많은 예제를 찾을 수 있습니다.

### 텍스트 속성 예제

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.other_properties_task.description_docs.approved.md -->

```text
filter by function task.description.length > 100
```

- 긴 설명이 있는 작업을 찾습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 날짜 속성 예제

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.dates_task.due_docs.approved.md -->

```text
filter by function task.due.format('dddd') === 'Tuesday'
```

- 화요일마다 마감되는 작업을 찾습니다.
- 영어 이외의 시스템에서는 현지 언어로 요일을 제공해야 할 수 있습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

자바스크립트에 익숙한 사용자를 위해, 다음과 같은 더 복잡한 예제도 흥미로울 수 있습니다:

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.dates_task.due.advanced_docs.approved.md -->

```text
filter by function task.due.moment?.isSameOrBefore(moment(), 'day') || false
```

- 오늘 또는 이전에 마감되는 모든 작업을 찾습니다.
- `moment()`는 현재 날짜와 시간을 반환하며, 이를 하루의 시작으로 변환해야 합니다.
- 두 번째 매개변수는 정확도를 결정하므로, 'day'를 사용하면 연도, 월 및 일을 확인합니다.
- [isSameOrBefore](https://momentjscom.readthedocs.io/en/latest/moment/05-query/04-is-same-or-before/)의 문서를 참조하세요.

```text
filter by function task.due.moment?.isSameOrAfter(moment(), 'day') || false
```

- 오늘 또는 이후에 마감되는 작업입니다.

```text
filter by function task.due.moment?.isSame(moment('2023-05-31'), 'day') || false
```

- 2023년 5월 31일에 마감되는 모든 작업을 찾습니다.

```text
filter by function task.due.moment?.isSame(moment('2023-05-31'), 'week') || false
```

- 2023년 5월 31일 주에 마감되는 모든 작업을 찾습니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 숫자 속성 예제

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.other_properties_task.urgency_docs.approved.md -->

```text
filter by function task.urgency > 8.9999
```

- 긴급도 점수가 `9.0`보다 높은 작업을 찾습니다.
- 사용된 제한 값은 `8.9999`입니다.
- '작다' 또는 '크다'를 비교하는 검색(`>`, `>=`, `<`, `<=` 중 하나를 사용) **반드시 반올림을 고려하여 값 조정**해야 합니다.

```text
filter by function task.urgency > 7.9999 && task.urgency < 11.0001
```

- 긴급도 점수가 `8.0`에서 `11.0` 사이인 작업을 찾습니다.

```text
filter by function task.urgency.toFixed(2) === 1.95.toFixed(2)
```

- [[Urgency#Why do all my tasks have urgency score 1.95?|기본 긴급도]]가 `1.95`인 작업을 찾습니다.
- 이는 모든 숫자 값에 대한 동등성 또는 부등식 검색에 사용되는 올바른 방법입니다.
- `===`의 양쪽에 있는 `.toFixed(2)`는 비교되는 두 숫자를 소수점 자릿수(2)로 반올림하는 것을 보장합니다.
- 이것은 비정수 숫자를 비교할 때 정확히 같지 않은 경우에 대비하기 위해 중요합니다.

```text
filter by function task.urgency.toFixed(2) !== 1.95.toFixed(2)
```

- 기본 점수 `1.95`가 아닌 다른 긴급도를 가진 작업을 찾습니다.

```text
filter by function task.urgency === 10.29
```

- **작업을 찾지 못합니다**.
- ==모든 숫자의 동등성 또는 부등식 검색에는 원시 숫자를 사용하지 마세요==, 정수나 부동 소수점인 것처럼 보이는 숫자도 마찬가지입니다.
- `group by urgency`를 사용하고 제목을 검토하면 다음 값을 가진 작업의 긴급도가 `10.19`임을 알 수 있습니다:
  - 내일 마감,
  - 우선순위 기호 없음.
- 이로부터 `task.urgency === 10.29`로 검색할 수 있다고 생각할 수 있습니다.
- 그러나 함수는 다음 값들을 동일성 비교하기 때문에 일치하지 않습니다:
  - `task.urgency`은 대략:
    - `10.292857142857140928526860079728`
  - `10.29`은 대략:
    - `10.289999999999999147348717087880`
- 이러한 값들은 **정확히 같지 않으므로**, 테스트에서 일치하는 작업을 찾지 못합니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 파일 속성 예제

<!-- placeholder to force blank line before included text --><!-- include: CustomFilteringExamples.test.file_properties_task.file.folder_docs.approved.md -->

```text
filter by function task.file.folder === "Work/Projects/"
```

- 주어진 폴더의 **파일 내** 작업을 찾습니다. 하위 폴더는 포함하지 않습니다.
- 동등성 테스트인 `===`는 마지막 슬래시(`/`)를 포함해야 합니다.

```text
filter by function task.file.folder.includes("Work/Projects/")
```

- 특정 폴더와 그 하위 폴더의 **파일 내** 작업을 찾습니다.

```text
filter by function task.file.folder.includes( '{{query.file.folder}}' )
```

- 쿼리가 포함된 폴더와 그 하위 폴더의 **파일 내** 작업을 찾습니다.
- 플레이스홀더 텍스트가 원시 문자열로 확장되므로 따옴표 안에 있어야 합니다.

```text
filter by function task.file.folder === '{{query.file.folder}}'
```

- 쿼리를 포함하는 폴더에 있는 **파일 내** 작업만 찾습니다. (**하위 폴더의 작업은 제외합니다**).

```text
filter by function task.file.folder.includes("Work/Projects")
```

- 마지막 슬래시(`/`)를 생략하면 다음과 같은 폴더 내의 파일도 찾을 수 있습니다:
  - `Work/Projects 2023/`
  - `Work/Projects Top Secret/`

<!-- placeholder to force blank line after included text --><!-- endInclude -->