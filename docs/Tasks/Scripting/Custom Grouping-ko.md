---
publish: true
---

# 사용자 정의 그룹화

<span class="related-pages">#feature/scripting #feature/grouping</span>

> [!released]
> 사용자 정의 그룹화는 Tasks 4.0.0에서 소개되었습니다.

## 요약

- JavaScript 표현식을 사용하여 고유한 작업 그룹을 정의할 수 있습니다. 예를 들면 다음과 같습니다.
  - `group by function task.urgency.toFixed(3)`
- [[Grouping-ko]]에 다양한 예제가 있습니다.
  - 해당 파일에서 `group by function`를 검색하세요.
- 모든 지원되는 작업 속성은 [[Task Properties-ko]] 및 [[Quick Reference-ko]]에서 찾을 수 있습니다.
  - 일부 속성은 사용자 정의 그룹화 및 필터용으로만 사용할 수 있으며 내장 그룹 지시문에서는 사용할 수 없습니다.
- 표현식이 작동하는 방법에 대한 자세한 내용은 [[Expressions-ko]]에서 학습하세요.

## 사용자 정의 그룹화 소개

Tasks 플러그인은 Tasks 쿼리 결과에서 유사한 작업을 [[Grouping-ko|그룹화]]하는 데 사용할 수 있는 많은 내장 방법을 제공합니다.

그러나 때로는 내장 기능이 원하는 대로 작동하지 않을 수 있습니다.

**사용자 정의 그룹화**를 사용하면 작업을 그룹화할 그룹 이름을 계산하기 위한 JavaScript으로 작성된 규칙을 추가하여 **고유한 이름 지정 체계를 만들 수 있습니다**. 아래의 예제를 참조하세요.

## 작동 방식

### 사용 가능한 작업 속성

참조 섹션 [[Task Properties-ko]]에서 사용자 정의 그룹화에서 사용할 수 있는 모든 작업 속성을 보여줍니다.

사용 가능한 작업 속성은 [[Quick Reference-ko]] 테이블에도 표시됩니다.

### 사용 가능한 쿼리 속성

참조 섹션 [[Query Properties-ko]]에서 사용자 정의 그룹화에서 [[Placeholders-ko]]를 통해 사용할 수 있는 모든 쿼리 속성을 보여줍니다.

사용자 지정 그룹에서 플레이스홀더를 사용할 때는 따옴표로 둘러싸야 합니다.

> [!released]
> 쿼리 속성 및 플레이스홀더는 Tasks 4.7.0에서 소개되었습니다.

### 표현식

지시사항은 다음과 같이 보입니다.

- `group by function <표현식>`
- `group by function reverse <표현식>`

표현식은 쿼리와 일치하는 각 작업에 대해 계산되며 표현식 결과가 해당 작업의 그룹 표제로 사용됩니다.

| 원하는 표제                                  | 반환할 수 있는 값                                                |
| ------------------------------------------- | ----------------------------------------------------------- |
| 작업에 대한 단일 그룹 이름                   | `'그룹 이름'`와 같은 단일 값.<br>단일 값을 포함하는 배열, 예: `['그룹 이름']` |
| 작업을 (태그로 작성한 것처럼) 여러 번 표시합니다. | `['표제 1', '표제 2']`와 같은 값 배열                 |
| 표제 없음                                     | `null`<br>빈 문자열 `''`<br>빈 배열 `[]`                   |

`표현식`은 다음을 수행할 수 있습니다.

- 각 작업의 다양한 속성 사용
- 모든 유효한 JavaScript 언어 기능 사용

`표현식`은 다음을 사용해야 합니다.

- 주어진 작업의 속성 사용, 예: `task.description`, `task.status.name`
  - 사용 가능한 속성은 모든 사용 가능한 속성에 대해 참조 페이지 [[Task Properties-ko]] 참조
- 다음 중 하나 반환:
  - 변환 가능한 문자열 형식의 모든 유형의 단일 값
  - 또는 값을 배열로 반환 (이 경우 배열에서 생성된 표제 각각 하나의 표제로 표시됨)

> [!warning]
> 반환된 문자열은 그대로 렌더링됩니다. 즉, 반환된 텍스트에 이탤릭체를 나타내는 것이 아닌 밑줄 (`_`)이 포함되어 있는 경우 백슬래시 ('\_')로 이스케이프해야 합니다.
>
> ```text
> group by function task.description.replaceAll('_', '\\_')
> ```

## 예제 사용자 정의 그룹

다음은 사용자 정의 그룹을 통해 수행할 수 있는 작업의 예제입니다.

[[Grouping-ko]] 페이지에서 `group by function`를 검색하여 더 많은 예제를 찾을 수 있습니다.

### 텍스트 속성 예제

<!-- placeholder to force blank line before included text --><!-- include: CustomGroupingExamples.test.other_properties_task.description_docs.approved.md -->

```text
group by function task.description
```

- 설명별로 그룹화합니다.
- 동일한 작업의 완료되었던 반복 작업을 찾는 데 유용할 수 있습니다.

```text
group by function task.description.toUpperCase()
```

- 설명을 대문자로 변환합니다.

```text
group by function task.description.slice(0, 25)
```

- 설명을 25자 이상으로 자릅니다.
- 그 문자열로 그룹화합니다.

```text
group by function task.description.replace('short', '==short==')
```

- 그룹 설명에서 "short"라는 단어를 강조 표시합니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 날짜 속성 예제

<!-- placeholder to force blank line before included text --><!-- include: CustomGroupingExamples.test.dates_task.due_docs.appro

ved.md -->

```text
group by function task.due.category.groupText
```

- 작업 마감일을 4가지 큰 범주(지연됨, 오늘, 미래, 미정)로 그룹화합니다. 이 순서대로 표시됩니다.
- 많은 마감일 표제가 있는 경우 이 표제를 어떤 구조로 분할하려면 `group by due` 앞에 이 행을 추가해 보세요.
- 값 `task.due.category.name`과 `task.due.category.sortOrder`도 사용할 수 있습니다.

```text
group by function task.due.fromNow.groupText
```

- [현재로부터 시간](https://momentjs.com/docs/#/displaying/fromnow/)별로 그룹화합니다. 예: `8일 전`, `11시간 후`.
- 마감일이 없으면 빈 문자열(즉, 표제 없음)을 사용합니다.
- 값 `task.due.fromNow.name`과 `task.due.fromNow.sortOrder`도 사용할 수 있습니다.

```text
group by function task.due.format("YYYY-MM-DD dddd")
```

- "due by"와 유사하지만 마감일이 없는 경우 "마감일 없음" 표제 대신 표제 없음을 사용합니다.

```text
group by function task.due.formatAsDate()
```

- 날짜를 YYYY-MM-DD 또는 빈 문자열(즉, 표제 없음)로 형식화합니다.

```text
group by function task.due.formatAsDateAndTime()
```

- 날짜를 YYYY-MM-DD HH:mm 형식으로 형식화하거나 마감일이 없으면 빈 문자열을 사용합니다.
- 참고:
  - 이는 데모 목적으로 표시됩니다.
  - 현재 Tasks 플러그인은 시간 저장을 지원하지 않습니다.
  - 작업에 시간을 추가하지 마세요. 이렇게 하면 작업 데이터의 읽기가 중단됩니다.

```text
group by function task.due.format("YYYY[%%]-MM[%%] MMM", "마감일 없음")
```

- 월별로 그룹화합니다. 예: `2023%%-05%% 5월`...
  - ... 이것은 Obsidian에서 `2023 May`로 표시됩니다.
- 두 개의 `%%` 문자 사이에 감춰진 숨겨진 월 숫자가 있으며 이로 인해 표제의 정렬 순서가 제어됩니다.
- 형식 문자열 내의 문자를 이스케이프하려면 문자를 대괄호로 묶을 수 있습니다. 여기서 `[%%]`를 사용합니다.

```text
group by function task.due.format("YYYY[%%]-MM[%%] MMM [- 주] WW")
```

- 월별로 그룹화하고 주 번호를 표시합니다. 예: `2023%%-05%% 5월 - 22주`...
  - ... 이것은 Obsidian에서 `2023 May - Week 22`로 표시됩니다.
- 월 번호가 포함되지 않은 경우 일부 연도에서는 연도의 첫 주 또는 마지막 주가 비논리적인 순서로 표시됩니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

[[Grouping#Due Date-ko]]에는 더 많은 날짜 예제가 있습니다.

### 숫자 속성 예제

<!-- placeholder to force blank line before included text --><!-- include: CustomGroupingExamples.test.other_properties_task.urgency_docs.approved.md -->

```text
group by function task.urgency.toFixed(3)
```

- 긴급도를 소수점 3자리까지 표시합니다. 기본 "긴급도별로 그룹화"에서 사용하는 소수점 2자리와 다릅니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 파일 속성 예제

<!-- placeholder to force blank line before included text --><!-- include: CustomGroupingExamples.test.file_properties_task.file.folder_docs.approved.md -->

```text
group

 by function task.file.folder
```

- 'group by folder'와 동일합니다.

```text
group by function task.file.folder.slice(0, -1).split('/').pop() + '/'
```

- 작업을 포함하는 파일의 직계 상위 폴더로 그룹화합니다.
- 작동 방식은 다음과 같습니다.
  - '.slice(0, -1)'은 원래 폴더에서 슬래시 ('/')를 제거합니다.
  - '.split('/')'은 남은 경로를 폴더 이름 배열로 나눕니다.
  - '.pop()'은 마지막 폴더 이름, 즉 작업을 포함하는 파일의 상위 폴더를 반환합니다.
  - 그런 다음 빈 문자열을 사용하지 않도록하기 위해 슬래시를 다시 추가합니다. 파일이 금고의 최상위에 있는 경우 빈 문자열을 얻지 않도록 슬래시를 다시 추가합니다.

<!-- placeholder to force blank line after included text --><!-- endInclude -->

## 그룹 정렬

### 기본 정렬 순서: 알파벳 순서

그룹 이름은 알파벳 순서로 정렬됩니다.

예를 들어 다음 지시사항은 '높음'에서 '보통'으로 우선순위 이름을 정렬합니다.

```javascript
group by function task.priorityName + ' 우선순위'
```

### 그룹 정렬 제어

그룹 이름에 숨겨진 텍스트를 주석 처리된 `%%....%%`에 포함시킴으로써 정렬 순서를 강제로 지정할 수 있습니다.

그렇지 않으면 숨겨진 `task.priorityNumber` 값을 사용하여 그룹의 정렬 순서를 강제할 수 있습니다. 이제 '높음'에서 '가장 낮은'으로 정렬됩니다.

```javascript
group by function '%%' + task.priorityNumber.toString() + '%%' + task.priorityName + ' 우선순위'
```

## 그룹 형식 지정

다음은 그룹에 형식을 추가하는 예입니다.

(긴 `group by function task.due.format` 줄을 실수로 나누지 않고 한 줄로 붙여넣으십시오.)

```javascript
group by function task.due.format("YYYY %%MM%% MMMM [<mark style='background: var(--color-base-00); color: var(--color-base-40)'>- 주</mark>] WW", "미정")
group by function task.due.format("[%%]YYYY-MM-DD[%%]dddd [<mark style='background: var(--color-base-00); color: var(--color-base-40);'>](YYYY-MM-DD)[</mark>]")
```

참고:

- 형식은 포함된 텍스트를 무음 색으로 그립니다.
- 대괄호(`[...]`)에 있는 텍스트는 결과에 그대로 포함됩니다.
- `var(--color-base-00)`과 같은 이름 있는 색은 현재 Obsidian 테마에 의해 정의되며 표시 모드가 밝은지 어두운지에 따라 달라집니다.
  - 사용 가능한 색은 [Obsidian 문서 색상 페이지](https://docs.obsidian.md/Reference/CSS+variables/Foundations/Colors)에서 확인할 수 있습니다.

이렇게 보일 수 있습니다.

![Tasks Grouped](../images/tasks_custom_groups_with_formatting.png)
형식화된 그룹을 포함한 사용자 지정 날짜 그룹이 있는 작업.

## 팁

- 복잡한 사용자 정의 그룹을 만들려면 간단한 것을 시작하여 조금씩 확장하세요.
- 실험을 가속화하기 위해 실험할 때는 각 그룹의 작업 수를 제한하는 기능 `limit groups 1`을 사용하세요.
- 사용자 정의 그룹 작업 방식을 탐구하기 위해 하드 코딩된 표현식을 시도할 수 있습니다.
  - `group by function null`
  - `group by function ''`
  - `group by function []`
  - `group by function "hello world"`
  - `group by function ["hello world"]`
  - `group by function ["hello", "world"]`
  - `group by function 6 * 7`
  - `group by function undefined`
- 더 많은 시도할 예제를 찾아보려면 [[Expressions-ko]]를 확인하세요.
- 모든 [[Task Properties-ko]]를 통해 액세스할 수 있는 작업입니다.
- 생성된 텍스트는 Obsidian에 의해 렌더링되므로 표제에 형식을 추가하는 데 마크다운 문자를 삽입할 수 있습니다.

## 문제 해결

> [!Warning]
> 현재, 함수 표현식의 대부분 종류의 오류는 검색을 실행할 때만 감지됩니다.
>
> 이것은 결과를 볼 때 오류 메시지가 그룹 표제에 표시되는 것을 의미합니다.
>
> 향후 릴리스에서는 쿼리 블록을 읽을 때 수식에 오류가 표시되도록 계획하고 있습니다.

### 구문 오류

다음 예제는 오류를 발생시킵니다.

````text
```tasks
group by function hello
```
````

다음과 같은 제목 텍스트를 생성합니다.

```text
##### Error: Failed calculating expression "hello". The error message was: hello is not defined
```

> [!todo]
> 지시사항을 구문 분석할 때 구문 오류 검사 수행.