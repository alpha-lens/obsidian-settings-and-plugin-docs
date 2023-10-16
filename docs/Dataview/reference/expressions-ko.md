---
created: 2023-10-14 T19:06
updated: 2023-10-14 T22:37
---
# 표현식

Dataview 쿼리 언어의 **표현식**(expressions)은 값으로 평가되는 모든 것을 의미합니다:

- 모든 [필드](../annotation/add-metadata-ko.md)
- 모든 [리터럴](./literals-ko.md)
- `field - 9`와 같은 계산된 값 또는 [함수 호출](./functions-ko.md)과 같은 계산된 값

기본적으로, [쿼리 유형](../queries/query-types-ko.md)이나 [데이터 명령어](../queries/data-commands-ko.md)가 아닌 모든 것이 표현식입니다.

매우 고수준의 요약으로, 다음은 DQL에서 **표현식**으로 간주됩니다:

```
# 리터럴
1                   (숫자)
true/false          (부울)
"text"              (텍스트)
date(2021-04-18)    (날짜)
dur(1 day)          (기간)
[[Link]]            (링크)
[1, 2, 3]           (리스트)
{ a: 1, b: 2 }      (객체)

# 람다
(x1, x2) => ...     (람다)

# 참조
field               (필드에 직접 참조하기)
simple-field        ("Simple Field!"와 같이 공백/구두점을 포함한 필드 참조하기)
a.b                 (a가 객체인 경우 'b'라는 필드를 가져옵니다)
a[expr]             (a가 객체나 배열인 경우 표현식 'expr'로 지정된 이름의 필드를 가져옵니다)
f(a, b, ...)        (인수 a, b, ...를 사용하여 `f`라는 함수 호출하기)

# 산술
a + b               (덧셈)
a - b               (뺄셈)
a * b               (곱셈)
a / b               (나눗셈)
a % b               (나머지)

# 비교
a > b               (a가 b보다 큰지 확인합니다.)
a < b               (a가 b보다 작은지 확인합니다.)
a = b               (a와 b가 같은지 확인합니다.)
a != b              (a와b가 다른지 확인합니다.)
a <= b              ( a가b보다 작거나 같은지 확인합니다.)
 a >= 1             (( a 가b 보다 크거나 같은지 확인합니다.)

# 문자열

 a + 1              (+ 연산자를 사용하여 문자열을 연결합니다.)
 "Hello" * 3        (* 연산자를 사용하여 문자열을 반복합니다.)

# 특수한 동작
[[Link]].value      (`Link` 페이지에서 `value`를 가져옵니다.) 
```

각 항목에 대한 자세한 설명이 이어집니다.

## 표현식 유형

### 필드 표현식

가장 간단한 표현식은 필드를 직접 참조하는 것입니다. "duedate"라는 필드가 있다면 `duedate`와 같이 이름으로 직접 참조할 수 있습니다.

~~~
```dataview
TABLE duedate, class, field-with-space
```
~~~

!!! info "공백과 구두점이 포함된 필드 이름"
    필드 이름에 공백, 구두점 또는 다른 문자가 포함된 경우, Dataview의 단순화된 이름을 사용하여 해당 필드를 참조할 수 있습니다. 단순화된 이름은 모든 문자를 소문자로 변환하고 공백을 "-"로 대체한 것입니다. 예를 들어 `this is a field`는 `this-is-a-field`로 변환됩니다. 자세한 내용은 [필드 이름](../annotation/add-metadata-ko.md#field-names-ko.md)을 참조하세요.

### 리터럴

상수 값 - 예: `1`, `"hello"`, `date(som)`("월의 시작") 등. Dataview에서 지원하는 각 데이터 유형에 대한 리터럴이 있습니다. [여기](./literals-ko.md)에서 자세히 알아보세요.

~~~
```dataview
LIST
WHERE file.name = "Scribble"
```
~~~

### 산술 연산

필드를 결합하기 위해 일반적인 산술 연산자인 덧셈(`+`), 뺄셈(`-`), 곱셈(`*`), 나눗셈(`/`)을 사용할 수 있습니다. 예를 들어 `field1 + field2`는 두 필드의 합계를 계산하는 표현식입니다.

~~~
```dataview
TABLE start, end, (end - start) - dur(8 h) AS "Overtime" 
FROM #work
```

```dataview
TABLE hrs / 24 AS "days"
FROM "30 Projects"
```
~~~

### 비교 연산

다양한 비교 연산자(`<`, `>`, `<=`, `>=`, `=`, `!=`)를 사용하여 대부분의 값을 비교할 수 있습니다. 이는 쿼리의 WHERE 블록에서 사용될 수 있는 true 또는 false 부울 값으로 평가됩니다.

~~~
```dataview
LIST
FROM "Games"
WHERE price > 10
```

```dataview
TASK
WHERE due <= date(today)
```

```dataview
LIST
FROM #homework
WHERE status != "done"
```
~~~

!!! hint "다른 유형 간 비교"
    서로 다른 [데이터 유형](../annotation/types-of-metadata-ko.md)을 서로 비교하면 예상치 못한 결과가 발생할 수 있습니다. 두 번째 예제를 살펴보세요: 만약 `due`가 설정되지 않은 경우(페이지나 작업 수준 모두에서), `null`이 되고 `null <= date(today)`는 true를 반환하여 기한이 없는 작업을 포함하게 됩니다. 이를 원하지 않는 경우, 항상 동일한 유형을 비교하기 위해 유형 확인을 추가하세요:
    ~~~
    ```dataview
    TASK
    WHERE typeof(due) = "date" AND due <= date(today)
    ```
    ~~~
    대부분의 경우, `WHERE due AND due <= date(today)`와 같이 메타 데이터의 존재 여부를 확인하는 것만으로 충분하지만, 유형을 확인하는 것은 예측 가능한 결과를 얻기 위한 안전한 방법입니다.

### 리스트/객체 인덱싱

인덱스 연산자 `list[<index>]`를 사용하여 [리스트/배열](../annotation/types-of-metadata-ko.md#list)에서 데이터를 가져올 수 있습니다. 여기서 `<index>`는 계산된 표현식입니다.
리스트는 0부터 시작하는 인덱스를 가지므로 첫 번째 요소는 인덱스 0, 두 번째 요소는 인덱스 1이 됩니다.
예를 들어 `list("A", "B", "C")[0] = "A"`입니다.

객체에 대해서도 유사한 표기법이 작동합니다.
`field["nestedfield"]`와 같은 방식으로 객체 내부의 필드에 참조하거나 동일한 방식으로 중첩된 필드 등을 참조할 수 있습니다.
아래 YAML 정의에서 `episode_metadata["previous"]`로 `previous`를 참조할 수 있습니다.
```yaml
---
aliases:
  - "ABC"
current_episode: "S01E03"
episode_metadata:
  previous: "S01E02"
  next: "S01E04"
---
```

객체(텍스트와 데이터 값 매핑)에서도 색인 연산자를 사용하여 데이터를 가져올 수 있으며, 이제 색인은 숫자 대신 문자열/텍스트로 지정됩니다.
또한 `<name>`이 값을 검색할 값의 이름인 경우 `object.<name>`과 같은 간략한 표기법을 사용할 수도 있습니다.
이전 프론트매터 예제에서 `episode_metadata.previous`를 사용하여 동일한 값을 얻을 수도 있습니다.

색인 표현식은 쿼리 언어에서 직접 지원되지 않는 필드를 가진 객체에 대해서도 작동합니다.
`where`와 같은 키워드 때문에 이러한 경우 `row["where"]` 구문을 사용하여 참조할 수 있습니다. 자세한 내용은 [FAQ의 노트](../resources/faq-ko.md#how-do-i-use-fields-with-the-same-name-as-keywords-like-from-where-ko.md) 및 [해당 이슈](https://github.com/blacksmithgu/obsidian-dataview/issues/1164)를 참조하세요.

~~~
```dataview
TABLE id, episode_metadata.next, aliases[0]
```
~~~

### 함수 호출

Dataview는 데이터 조작을 위해 다양한 함수를 지원합니다. 이러한 함수에 대한 자세한 내용은 [함수 문서](./functions-ko.md)에서 확인할 수 있습니다. 일반적인 구문은 `function(arg1, arg2, ...)`입니다. 예: `lower(file.name)` 또는 `regexmatch(file.folder, "A.+")`.

~~~
```dataview
LIST
WHERE contains(file.name, "WIP")
```

```dataview
LIST
WHERE string(file.day.year) = split(this.file.name, "-W")[0]
```
~~~

### 람다

람다는 입력값을 받아 출력값을 생성하는 함수를 정의하는 고급 리터럴입니다.
일반적인 형식은 다음과 같습니다.

```
(arg1, arg2, arg3, ...) => <args를 사용한 표현식>
```

람다는 `reduce` 및 `map`과 같은 복잡한 변환을 위해 사용되는 여러 고급 연산자에서 사용됩니다. 몇 가지 예시:

```
(x) => x.field                  (x의 필드 반환, 주로 map에 사용)
(x, y) => x + y                 (x와 y의 합)
(x) => 2 * x                    (x의 두 배)
(value) => length(value) = 4    (value가 길이 4인 경우 true 반환)
```

~~~
```dataview
CALENDAR file.day
FLATTEN all(map(file.tasks, (x) => x.completed)) AS "allCompleted"
WHERE !allCompleted
```
~~~

---

## 유형별 상호작용 및 값

대부분의 dataview 유형은 연산자와 특수 상호작용이 있거나 인덱스 연산자를 사용하여 추가 필드를 검색할 수 있습니다.
[날짜](../annotation/types-of-metadata-ko.md#date), [기간](../annotation/types-of-metadata-ko.md#duration), 링크에 대해서도 동일하게 적용됩니다. 날짜와 기간에 대해서는 [메타데이터 유형](../annotation/types-of-metadata-ko.md) 섹션에서 자세히 읽어보세요.

### 링크

링크를 "인덱싱"하여 해당 페이지에서 값을 가져올 수 있습니다. 예를 들어 `[[Assignment Math]].duedate`는 페이지 `Assignment Math`에서
`duedate` 값을 가져옵니다.

!!! note "표현식에서의 링크 인덱싱"
    인라인 필드나 프론트매터에 정의된 필드 - 예: `Class:: [[Math]]` -로 링크를 사용하고 `timetable` 필드를 가져오려면
    `Class.timetable`으로 작성해야 합니다.
    `[[Class]].timetable`을 사용하면 실제로 `Class`라는 이름의 페이지를 찾고, 그리고 그렇게 하면 실제로는 `Math`가 아닌 페이지가 검색됩니다!