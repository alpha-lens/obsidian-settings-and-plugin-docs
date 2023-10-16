---
created: 2023-10-14 T19:06
updated: 2023-10-14 T23:16
---
# 개요

Dataview는 개인 지식 베이스에 대한 실시간 인덱스 및 쿼리 엔진입니다. 노트에 [**메타데이터를 추가**](./annotation/add-metadata-ko.md)하고 [**Dataview 쿼리 언어**](./queries/structure-ko.md)를 사용하여 데이터를 나열, 필터링, 정렬 또는 그룹화할 수 있습니다. Dataview는 항상 최신 상태로 쿼리를 유지하며 데이터 집계를 간편하게 처리합니다.

다음과 같은 작업을 수행할 수 있습니다.

- 매일의 노트에 수면을 기록하여 주간 수면 일정의 테이블을 자동으로 생성합니다.
- 노트에서 도서에 대한 링크를 자동으로 모아 등급별로 정렬하여 표시합니다.
- 오늘 날짜와 관련된 페이지들을 자동으로 모아 일일 노트에 표시합니다.
- 태그가 없는 페이지를 찾아 후속 조치로 표시하거나, 특정 태그가 지정된 페이지의 예쁜 보기를 표시합니다.
- 생일이나 노트에 기록된 이벤트 등 다가오는 이벤트를 보여주는 동적인 보기 생성

등등 다양한 작업을 할 수 있습니다.

!!! hint "Dataview는 인덱싱된 데이터를 빠르게 검색, 표시 및 조작하는 방법을 제공합니다!"

Dataview는 매우 범용적이고 고성능으로, 수십만 개의 주석이 달린 노트에도 문제없이 작동합니다.

내장된 [쿼리 언어](queries/query-types-ko)가 목적에 부족한 경우, 임의의 JavaScript를 실행하여 [dataview API](./api/intro-ko.md)에 대해 필요한 유틸리티를 직접 구축할 수 있습니다. 이렇게 하면 노트 내에서 필요한 기능을 직접 만들 수 있습니다.

!!! info "Dataview는 표시 용도로 사용됩니다. 편집은 아닙니다."
    Dataview는 데이터를 표시하고 계산하기 위한 것입니다. 노트/메타데이터를 편집하지 않으며 항상 원본 그대로 유지됩니다 (... Dataview를 통해 [작업](queries/query-types-ko.md#task-queries)을 확인하는 경우에만 예외입니다).

## Dataview 사용 방법

Dataview는 **데이터 인덱싱**과 **데이터 쿼리**라는 두 가지 큰 구성 요소로 구성됩니다.

!!! info "링크된 문서 페이지에서 자세한 내용 확인"
    다음 섹션은 dataview로 수행할 수 있는 일반적인 개요와 방법에 대해 알려줍니다. 각 부분에 대한 자세한 내용은 링크된 페이지를 방문하여 더 알아보세요.

### 데이터 인덱싱

Dataview는 Markdown 파일의 메타데이터에서 작동합니다. 전체 보관소의 모든 내용을 읽을 수는 없고, 특정 데이터만 읽을 수 있습니다. 태그와 글머리 기호(작업 포함)와 같은 일부 내용은 [자동으로 사용 가능](./annotation/add-metadata-ko.md#implicit-fields)합니다. 다른 데이터를 **필드**를 통해 추가할 수 있습니다. 필드는 파일의 맨 위에 있는 YAML Frontmatter로 추가하거나 `[key:: value]` 구문을 사용하여 콘텐츠 중간에 [인라인 필드](./annotation/add-metadata-ko.md#inline-fields)로 추가할 수 있습니다. Dataview는 이러한 데이터를 _인덱싱_하여 쿼리에서 사용할 수 있게 합니다.

!!! hint "Dataview는 태그 및 목록 항목과 같은 정보와 필드로 추가한 데이터만 인덱싱합니다. 인덱싱된 데이터만 Dataview 쿼리에서 사용할 수 있습니다!"

예를 들어, 파일은 다음과 같이 보일 수 있습니다:

```markdown
---
author: "Edgar Allan Poe"
published: 1845
tags: poems
---

# The Raven

Once upon a midnight dreary, while I pondered, weak and weary,
Over many a quaint and curious volume of forgotten lore—
```

또는 다음과 같이 보일 수 있습니다:

```markdown
#poems

# The Raven

From [author:: Edgar Allan Poe], written in (published:: 1845)

Once upon a midnight dreary, while I pondered, weak and weary,
Over many a quaint and curious volume of forgotten lore—
```

인덱싱된 메타데이터(또는 쿼리에서 사용할 수 있는 데이터)로 보면 두 파일은 동일하며 주석 스타일만 다릅니다. 메타데이터를 어떻게 [주석 처리](annotation/add-metadata-ko.md)할지는 개인적인 선호도에 따라 결정할 수 있습니다. 이 파일로부터 `author`와 같은 **메타데이터 필드**가 사용 가능하고, Dataview가 자동으로 제공하는 [암시적 필드](annotation/metadata-pages-ko.md)처럼 태그나 노트 제목과 같은 것을 사용할 수 있습니다.

!!! attention "데이터는 인덱싱되어야 합니다"
    위의 예시에서 Dataview에서는 해당 시를 사용할 수 없습니다. 그것은 단락이며 메타데이터 필드가 아니며 Dataview가 자동으로 인덱싱하지 않는 것입니다. Dataview의 인덱스에 포함되지 않았으므로 쿼리할 수 없습니다.

### 데이터 쿼리

**인덱싱된 데이터**에는 **쿼리**를 통해 액세스할 수 있습니다.

쿼리를 작성하는 방법에는 세 가지 다른 방법이 있습니다: [Dataview 쿼리 언어](./queries/dql-js-inline-ko.md#dataview-query-language-dql)를 사용하는 방법, [인라인 문장](./queries/dql-js-inline-ko.md#inline-dql)으로 작성하는 방법 또는 가장 유연하면서도 복잡한 방식으로 자바스크립트 쿼리로 작성하는 방식입니다.

**Dataview 쿼리 언어(DQL)**를 사용하면 데이터를 쿼리, 표시 및 조작하는 데 넓고 강력한 도구를 제공합니다. **인라인 쿼리**는 하나의 인덱싱된 값만 노트의 임의 위치에 표시할 수 있는 기능을 제공합니다. 이렇게하면 계산도 할 수 있습니다. **DQL**을 사용하면 데이터 여정에서 자바스크립트 없이도 충분히 작업할 수 있습니다.

DQL 쿼리는 여러 부분으로 구성됩니다:

- 정확히 하나의 [**쿼리 유형**](./queries/query-types-ko.md)은 쿼리 출력의 모양을 결정합니다.
- 선택적으로 [**FROM 문**](./queries/data-commands-ko.md#from)을 사용하여 특정 태그 또는 폴더(또는 다른 [소스](./reference/sources-ko.md))를 선택하여 조회할 수 있습니다.
- 원하는 출력을 필터링, 그룹화 및 정렬하는 데 도움이 되는 0개 이상의 [**기타 데이터 명령어**](./queries/data-commands-ko.md)

예를 들어, 다음과 같은 쿼리를 작성할 수 있습니다:

~~~markdown
```dataview
LIST
```
~~~

이것은 보관소에 있는 모든 파일을 나열합니다.

!!! info "쿼리 유형 이외의 모든 것은 선택 사항입니다."
    유효한 DQL 쿼리에 필요한 것은 쿼리 유형뿐입니다 ([CALENDAR](./queries/query-types-ko.md#calendar-queries)인 경우 날짜 필드도 필요합니다).

보다 제한적인 쿼리는 다음과 같을 수 있습니다:

~~~markdown
```dataview
LIST
FROM #poems
WHERE author = "Edgar Allan Poe"
```
~~~

이것은 태그 `#poems`와 `author`라는 [필드](annotation/add-metadata-ko.md)가 "Edgar Allan Poe"인 보관소의 모든 파일을 나열합니다. 이 쿼리는 위의 예시 페이지를 찾을 것입니다.

`LIST`는 사용할 수 있는 네 가지 [쿼리 유형](queries/query-types-ko.md) 중 하나일 뿐입니다. 예를 들어, `TABLE`을 사용하면 출력에 추가 정보를 추가할 수 있습니다:

~~~markdown
```dataview
TABLE author, published, file.inlinks AS "Mentions"
FROM #poems
```
~~~

이렇게 하면 다음과 같은 결과가 나옵니다:

| 파일(3) | 작성자 | 출판년도 | 언급 횟수 |
| -------- | ------- | ---------- | -------- |
| The Bells	|  Edgar Allan Poe	| 1849	| 0 |
| The New Colossus	| Emma Lazarus	| 1883	|- [[Favorite Poems]] |
| The Raven	| Edgar Allan Poe	| 1845 |- [[Favorite Poems]] |

하지만 dataview의 기능은 여기서 끝나지 않습니다. [**함수**](./reference/functions-ko.md)를 사용하여 데이터에 작업할 수도 있습니다. 이러한 연산은 쿼리 내에서만 수행되며 파일 내의 데이터는 변경되지 않습니다.

~~~markdown
```dataview
TABLE author, date(now).year - published AS "Age in Yrs", length(file.inlinks) AS "Counts of Mentions"
FROM #poems
```
~~~

위와 같이 작성하면 다음과 같은 결과가 나옵니다:

| 파일(3) | 작성자 | 연령(년) | 언급 횟수 |
| -------- | ------- | ---------- | -------- |
| The Bells	|  Edgar Allan Poe	| 173	| 0 |
| The New Colossus	| Emma Lazarus	| 139 |- [[Favorite Poems]] |
| The Raven	| Edgar Allan Poe	| 177 |- [[Favorite Poems]] |

dataview는 데이터를 신속하고 항상 최신 상태로 집계할 수 있을 뿐만 아니라, 데이터셋에 대한 새로운 통찰력을 제공하기 위해 연산을 도와줍니다. 자세한 내용은 문서를 참조하여 데이터와 상호작용하는 방법에 대해 더 알아보세요.

데이터 여정에서 새로운 방식으로 보관소를 탐색하세요!

## 자원과 도움말

이 문서는 데이터 여정에서 도움이 될 수 있는 유일한 곳은 아닙니다. [자원 및 지원](./resources/resources-and-support-ko.md) 페이지에서 유용한 페이지와 비디오 목록을 확인하세요.