---
created: 2023-10-14 T19:05
updated: 2023-10-14 T22:21
---
# 필드 유형

Dataview의 모든 필드는 해당 필드를 렌더링하고 정렬하며 조작하는 방식을 결정하는 **유형(type)**을 가지고 있습니다. ["메타데이터 추가"](add-metadata-ko.md)에서 필드를 생성하는 방법과 [페이지의 메타데이터](./metadata-pages-ko.md) 및 [작업 및 목록의 메타데이터](./metadata-tasks-ko.md)에서 자동으로 사용할 수 있는 정보에 대해 자세히 알아보세요.

## 유형이 중요한 이유

Dataview는 메타데이터를 수정할 수 있는 [함수](../reference/functions-ko.md)를 제공하며, 복잡한 쿼리를 작성할 수 있도록 합니다. 특정 함수는 올바르게 작동하기 위해 특정 데이터 유형이 필요합니다. 따라서 필드의 데이터 유형은 해당 필드에 사용할 수 있는 함수와 함수의 동작 방식을 결정합니다. 또한, 유형에 따라 dataview가 렌더링하는 출력 결과가 다를 수 있습니다.

대부분의 경우, 필드의 유형에 대해 너무 걱정할 필요는 없지만 데이터에 대한 계산 및 기타 마법같은 작업을 수행하려면 해당 유형을 알고 있어야 합니다.

!!! example "유형에 따른 다른 렌더링"
    다음과 같은 파일이 있다고 가정해봅시다:
  ~~~yaml
    date1:: 2021-02-26T15:15
    date2:: 2021-04-17 18:00

    ```dataview
    TABLE date1, date2
    WHERE file = this.file
    ```
	~~~

다음 출력을 볼 수 있습니다 (dataview의 날짜 + 시간 형식 설정에 따라 달라질 수 있음):

| File (1) | date1 | date2 |
| -------- | ----- | ----- |
| Untitled 2 | 오후 3:15 - 2021년 2월 26일 | 2021-04-17 18:00 |

`date1`은 **날짜**로 인식되고 `date2`는 dataview에게 일반 **텍스트**로 간주되기 때문에 `date1`은 당신을 위해 다르게 구문 분석됩니다. [아래의 날짜](#날짜)에서 자세히 알아보세요.

## 사용 가능한 필드 유형

Dataview는 일반적인 사용 사례를 포함하는 여러 필드 유형을 알고 있습니다.

### 텍스트

기본적인 필드 유형입니다. 특정 유형과 일치하지 않는 필드는 일반 텍스트로 처리됩니다.

```markdown
Example:: 일반 텍스트입니다.
```

!!! hint "여러 줄의 텍스트"
    값으로 여러 줄의 텍스트를 사용하려면 YAML Frontmatter와 파이프 연산자를 사용해야 합니다:
```yaml
---
poem: |
	Because I could not stop for Death,
	He kindly stopped for me;
	The carriage held but just ourselves
	And Immortality.
author: "[[Emily Dickinson]]"
title: "Because I could not stop for Death"
---
```
인라인 필드의 경우, 줄 바꿈은 값의 끝을 의미합니다.

### 숫자

'6'이나 '3.6'과 같은 숫자입니다.

```markdown
Example:: 6
Example:: 2.4
Example:: -80
```

YAML Frontmatter에서는 따옴표로 둘러싸지 않고 숫자를 작성합니다:

```yaml
---
rating: 8
description: "A nice little horror movie"
---
```

### 부울

부울은 true 또는 false 값만 가지고 있습니다.

```markdown
Example:: true
Example:: false
```

### 날짜

ISO8601 표기법과 일치하는 텍스트는 자동으로 날짜 객체로 변환됩니다. [ISO8601](https://en.wikipedia.org/wiki/ISO_8601)은 `YYYY-MM[-DDTHH:mm:ss.nnn+ZZ]` 형식을 따릅니다. 월 이후의 모든 부분은 선택 사항입니다.

```markdown
Example:: 2021-04 
Example:: 2021-04-18
Example:: 2021-04-18T04:19:35.000
Example:: 2021-04-18T04:19:35.000+06:30
```

이러한 날짜에 대한 쿼리를 할 때, 해당 날짜의 특정 부분을 얻을 수 있는 속성에 액세스할 수 있습니다:

- field.year (년)
- field.month (월)
- field.weekyear (연도 주)
- field.week (주)
- field.weekday (요일)
- field.day (일)
- field.hour (시간)
- field.minute (분)
- field.second (초)
- field.millisecond(밀리초)

예를 들어, 특정 월에 해당하는 날짜가 어떤지 알고 싶다면 `datefield.month`를 사용하여 접근할 수 있습니다:

~~~markdown
birthday:: 2001년 6월 11일

```dataview
LIST birthday
WHERE birthday.month = date(now).month
```
~~~

이렇게 하면 이번 달에 생일이 있는 모든 사람의 목록을 얻을 수 있습니다. `date(now)`가 궁금하신가요? [리터럴](./../../reference/literals-ko.md#dates)에서 자세히 읽어보세요.

!!! info "날짜 객체의 표시"
    Dataview는 날짜 객체를 사람이 읽기 쉬운 형식으로 렌더링합니다. 예를 들어 `오후 3:15 - 2021년 2월 26일`입니다. 이 형식은 Dataview의 설정에서 "일반" 탭 아래에 있는 "날짜 형식"과 "날짜 + 시간 형식"으로 조정할 수 있습니다. 특정 쿼리에서만 형식을 조정하려면 [dateformat 함수](../../reference/functions-ko.md#dateformatdatedatetime-string)를 사용하세요.

### 기간

기간은 `<시간> <단위>`와 같은 형태의 텍스트입니다. 예를 들어 `6시간` 또는 `4분`입니다. `6hrs`나 `2m`과 같은 일반적인 영어 약어도 인식됩니다. 한 필드에 여러 단위를 지정할 수 있으며, 선택적으로 쉼표 구분자로 구분할 수 있습니다: `6 hours, 4 minutes`

```markdown
Example:: 7 hours
Example:: 16days
Example:: 4min
Example:: 6hr7min
Example:: 9 years, 8 months, 4 days, 16 hours, 2 minutes
Example:: 9 yrs 8 min
```

기간으로 인식되는 값의 전체 목록은 [리터럴](./../../reference/literals-ko#durations)에서 확인할 수 있습니다.

!!! hint "날짜와 기간을 사용한 계산"
    날짜와 기간 유형은 서로 호환됩니다. 즉, 예를 들어 날짜에 기간을 추가하여 새로운 날짜를 생성할 수 있습니다:
~~~markdown
departure:: 2022-10-07T15:15
length of travel:: 1 day, 3 hours

**Arrival**: `= this.departure + this.length-of-travel`
~~~

또한 날짜와 함께 계산하는 경우 기간이 반환됩니다:
~~~markdown
release-date:: 2023-02-14T12:00
	
 `= this.release-date - date(now)`까지 앞으로 얼마나 남았는지!!
 ~~~

 `date(now)`가 궁금하신가요? [리터럴](./../../reference/literals-ko.md#dates)에서 자세히 읽어보세요.

### 링크

Obsidian 링크인 `[[Page]]` 또는 `[[Page|페이지 표시]]`입니다.

```markdown
Example:: [[A Page]]
Example:: [[Some Other Page|Render Text]]
```

!!! info "YAML Frontmatter에서의 링크"
   frontmatter에서 링크를 참조하는 경우, 다음과 같이 따옴표로 묶어야 합니다: `key: "[[Link]]"`. 이것은 Obsidian이 지원하는 기본 동작입니다. 따옴표 없는 링크는 구문 분석할 수 없는 잘못된 YAML frontmatter를 생성하게 됩니다.
```yaml
---
parent: "[[parentPage]]"
---
```
이 경우 dataview에게만 링크가 되고 Obsidian에서는 링크로 인식되지 않으므로, 아웃바운드 링크에 표시되지 않고 그래프 보기에 표시되지 않으며 이름 변경 시 업데이트되지 않습니다.

### 리스트

리스트는 여러 값을 가진 필드입니다. YAML에서는 일반적인 YAML 리스트로 정의됩니다:
```yaml
---
key3: [one, two, three]
key4:
 - four
 - five
 - six
---
```

인라인 필드에서는 쉼표로 구분된 목록 값으로 표시됩니다:

```markdown
Example1:: 1, 2, 3
Example2:: "yes", "or", "no"
```

인라인 필드에서는 **텍스트 값을 따옴표로 묶어야** 리스트로 인식되는 것에 유의하십시오 (예: `Example2`). `yes, or, no`는 일반 텍스트로 인식됩니다.

!!! info "동일한 파일에서 중복된 메타데이터 키는 리스트를 생성합니다."
    같은 노트에서 메타데이터 키를 두 번 이상 사용하는 경우 dataview는 모든 값을 수집하여 리스트를 제공합니다. 예를 들어,
~~~markdown
grocery:: flour
[...]
grocery:: soap

```dataview
LIST grocery
WHERE file = this.file
```
~~~
   을 실행하면 'flour'과 'soap'의 **리스트**가 반환됩니다.

!!! hint "배열은 리스트입니다."
   이 문서의 일부 위치에서 "배열"이라는 용어를 볼 수 있습니다. 배열은 Javascript에서의 리스트와 동일한 의미입니다. 배열을 인수로 사용하는 함수는 목록을 인수로 사용해야 합니다.

### 객체

객체는 하나의 상위 필드 아래에 여러 개의 하위 필드 맵입니다. 이들은 YAML frontmatter에서만 정의할 수 있으며 YAML 객체 구문을 사용합니다:
```yaml
---
obj:
  key1: "Val"
  key2: 3
  key3: 
    - "List1"
    - "List2"
    - "List3"
---
```

쿼리에서는 `obj.key1` 등을 통해 이러한 하위 값에 액세스할 수 있습니다:

~~~markdown
```dataview
TABLE obj.key1, obj.key2, obj.key3
WHERE file = this.file
```
~~~