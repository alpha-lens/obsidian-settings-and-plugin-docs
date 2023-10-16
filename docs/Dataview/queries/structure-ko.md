---
created: 2023-10-14 T19:06
updated: 2023-10-14 T21:49
---
# 쿼리의 구조

Dataview는 쿼리를 작성하는 여러 가지 방법을 제공하며, 각각에 대한 구문이 다릅니다.

이 페이지에서는 **Dataview Query Language** (**DQL**) 쿼리를 작성하는 방법에 대한 정보를 제공합니다. 인라인 쿼리를 작성하는 방법에 관심이 있다면 [DQL, JS 및 인라인의 인라인 섹션](dql-js-inline-ko.md#inline-dql-ko.md)을 참조하세요. **Javascript Queries**에 대한 자세한 정보는 [Javascript 참조](../api/intro-ko.md)에서 확인할 수 있습니다.

**DQL**은 데이터의 다양한 뷰나 계산을 생성하기 위한 SQL과 유사한 쿼리 언어입니다. 다음을 지원합니다.

- 출력 형식 선택(쿼리 유형)
- 특정 [소스](../reference/sources-ko.md)(태그, 폴더 또는 링크)에서 페이지 가져오기
- 필드 기반으로 페이지/데이터 필터링하기(비교, 존재 여부 확인 등)
- 필드 변환(계산 또는 다중 값 필드 분할)하여 표시하기
- 필드 기준으로 결과 정렬하기
- 필드 기준으로 결과 그룹화하기
- 결과 개수 제한하기

!!! warning SQL과의 차이점
    SQL에 익숙하신 경우 DQL과 SQL을 혼동하지 않도록 [SQL과의 차이점](../../queries/differences-to-sql-ko.md)을 읽어보세요.

이제 DQL을 사용하는 방법을 살펴보겠습니다.

## DQL 쿼리의 일반적인 형식

모든 쿼리는 동일한 구조를 따르며 다음으로 구성됩니다.

- 정확히 하나의 **쿼리 유형**(Query Type)과 해당 유형에 따라 필드가 없거나 하나 이상인 경우
- 옵션으로 하나의 **FROM** 데이터 명령어와 하나 이상의 [소스](../reference/sources-ko.md)
- 다른 데이터 명령어와/또는 기타 정보에 따라 옵션으로 여러 개의 데이터 명령어

고수준에서 쿼리는 다음 패턴에 따릅니다:

~~~
```dataview
<쿼리-유형> <필드>
FROM <소스>
<데이터-명령어> <표현식>
<데이터-명령어> <표현식>
          ...
```
~~~

!!! hint "쿼리 유형만 필수입니다."

다음 섹션에서는 이론을 자세히 설명합니다.

## 출력 형식 선택

쿼리의 출력 형식은 **쿼리 유형**(Query Type)에 의해 결정됩니다. 사용 가능한 유형은 다음과 같습니다.

1. **TABLE**: 필드 데이터의 한 행당 하나의 결과와 하나 이상의 열로 구성된 결과 테이블입니다.
2. **LIST**: 쿼리와 일치하는 페이지의 글머리 기호 목록입니다. 파일 링크와 함께 각 페이지에 대한 하나의 필드를 출력할 수 있습니다.
3. **TASK**: 주어진 쿼리와 일치하는 작업들을 대화형 작업 목록으로 출력합니다.
4. **CALENDAR**: 달력 보기로, 각 결과가 해당 날짜에 대한 점으로 나타납니다.

쿼리 유형은 쿼리에서 **유일하게 필수적인 명령어**입니다. 그 외는 선택 사항입니다.

!!! attention "메모리 사용량이 큰 예제"
    보관함 크기에 따라 다음 예제를 실행하는 데 시간이 오래 걸릴 수 있으며, 극단적인 경우 Obsidian이 멈출 수도 있습니다. 쿼리 실행을 보관함의 특정 부분 집합으로 제한하기 위해 `FROM`을 지정하는 것이 좋습니다. 다음 섹션을 참조하세요.

~~~
보관함 내 모든 페이지를 글머리 기호 목록으로 나열합니다.
```dataview
LIST
```

보관함 내 모든 작업(완료 여부와 관계없이)을 나열합니다.
```dataview
TASK
```

각 페이지를 생성 날짜에 대한 점으로 나타내는 달력 보기를 렌더링합니다.
```dataview
CALENDAR file.cday
```

보관함의 모든 페이지, 해당 필드 값(due), 파일의 태그 및 다중 값 필드 working-hours의 평균을 표시하는 테이블을 보여줍니다.
```dataview
TABLE due, file.tags AS "tags", average(working-hours)
```
~~~

!!! info "사용 가능한 쿼리 유형과 사용 방법에 대해 자세히 알아보려면 [여기](./query-types-ko.md)를 참조하세요."

## 소스 선택

쿼리 유형 외에도 쿼리를 제한, 세분화, 정렬 또는 그룹화하는 데 도움이 될 수 있는 여러 가지 **데이터 명령어**(Data Commands)를 사용할 수 있습니다. 이 중 하나인 **FROM** 문은 추가적인 정보를 제공하여 쿼리를 특정 페이지 집합에 제한하거나 세분화하는 데 도움을 줍니다.

FROM 문은 다른 데이터 명령어와는 다르게 동작합니다. 쿼리에 **0개 또는 1개의 FROM 데이터 명령어**를 추가할 수 있으며, Query Type 바로 다음에 위치해야 합니다. 여러 개의 FROM 문을 추가하거나 다른 데이터 명령어 이후에 FROM 문을 추가할 수 없습니다.

~~~
Books 폴더와 그 하위 폴더 내의 모든 페이지를 글머리 기호 목록으로 나열합니다.
```dataview
LIST
FROM "Books"
```

#status/open 또는 #status/wip 태그가 포함된 모든 페이지를 나열합니다.
```dataview
LIST
FROM #status/open OR #status/wip
```

#assignment 태그가 있는 "30 School" 폴더(또는 해당 하위 폴더) 내에 있는 모든 페이지 또는 "30 School/32 Homeworks" 폴더 내에서 School Dashboard Current To Dos 페이지에서 링크된 페이지들을 나열합니다.
```dataview
LIST
FROM (#assignment AND "30 School") OR ("30 School/32 Homeworks" AND outgoing([[School Dashboard Current To Dos]]))
```

~~~

!!! info "`FROM`에 대해 더 자세히 알아보려면 [여기](./data-commands-ko.md#from)를 참조하세요."

## 결과 필터링, 정렬, 그룹화 및 제한

위에서 설명한 쿼리 유형과 `FROM` 데이터 명령어 외에도 쿼리 결과를 제한, 세분화, 정렬 또는 그룹화하는 데 도움이 되는 여러 가지 **데이터 명령어**(Data Commands)가 있습니다.

`FROM` 명령어를 제외한 모든 데이터 명령어는 **여러 번 사용**할 수 있으며(쿼리 유형과 `FROM` 다음에 위치해야 함), 작성된 순서대로 실행됩니다.

사용 가능한 데이터 명령어:

1. 위에서 설명한 것처럼 **FROM**
2. **WHERE**: 메타데이터 필드 내부의 정보를 기반으로 노트 필터링
3. **SORT**: 필드와 방향에 따라 결과 정렬
4. **GROUP BY**: 여러 개의 결과를 그루핑하여 각 그룹당 하나의 결과 행으로 묶음
5. **LIMIT**: 쿼리 결과 개수 제한
6. **FLATTEN**: 필드나 계산을 기준으로 하나의 결과를 여러 개로 분할

~~~
메타데이터 필드 `due`가 있는 페이지 중에서 `due`가 오늘 이전인 모든 페이지를 나열합니다.
```dataview
LIST
WHERE due AND due < date(today)
```

태그 #status/open이 있는 보관함 내에서 최근에 생성된 10개의 페이지를 나열합니다.
```dataview
LIST
FROM #status/open
SORT file.ctime DESC
LIMIT 10
```

보관함 내에서 가장 오래된 10개의 미완료 작업을 파일별로 그룹화하여 오래된 것부터 최신 순으로 정렬한 대화형 작업 목록을 나타냅니다.
```dataview
TASK
WHERE !completed
SORT created ASC
LIMIT 10
GROUP BY file.link
SORT rows.file.ctime ASC 
```

~~~

!!! info "사용 가능한 [데이터 명령어](./data-commands-ko.md)에 대해 자세히 알아보세요."

## 예제

다음은 일부 예제 쿼리입니다. 더 많은 예제는 [여기](../resources/examples-ko.md)에서 확인할 수 있습니다.

~~~
```dataview
TASK 
```
~~~

~~~
```dataview 
TABLE recipe-type AS "type", portions, length 
FROM #recipes 
```
~~~

~~~
```dataview 
LIST 
FROM #assignments 
WHERE status = "open"  
```
~~~

~~~
```dataview  
TABLE file.ctime, appointment.type, appointment.time, follow-ups  
FROM "30 Protocols/32 Management"  
WHERE follow-ups  
SORT appointment.time   
```
~~~

~~~
```dataview  
TABLE L.text AS "My lists"  
FROM "dailys"  
FLATTEN file.lists AS L  
WHERE contains(L.author, "Surname")  
```
~~~

~~~
```dataview
LIST rows.c
WHERE typeof(contacts) = "array" AND contains(contacts, [[Mr. L]])
SORT length(contacts)
FLATTEN contacts as c
SORT link(c).age ASC
```
~~~