---
created: 2023-10-14 T19:06
updated: 2023-10-14 T23:30
---
# 데이터 명령어

Dataview 쿼리를 구성하는 다양한 명령어입니다. 명령어는 순서대로 실행되며, 중복된 명령어(예: 여러 개의 `WHERE` 블록 또는 여러 개의 `GROUP BY` 블록)을 가질 수 있습니다.

## FROM

`FROM` 문은 초기에 수집되고 다른 명령어로 전달될 페이지를 결정합니다. [소스](../reference/sources-ko.md) 중에서 선택할 수 있으며, 현재 폴더, 태그, 들어오는/나가는 링크별로 선택할 수 있습니다.

- **태그**: 태그(및 하위 태그)에서 선택하려면 `FROM #태그`를 사용합니다.
- **폴더**: 폴더(및 하위 폴더)에서 선택하려면 `FROM "폴더"`를 사용합니다.
- **단일 파일**: 단일 파일에서 선택하려면 `FROM "경로/파일"`을 사용합니다.
- **링크**: 파일에 연결된 링크 또는 해당 파일에서 나가는 모든 링크를 선택할 수 있습니다.
  - `[[노트]]`에 연결된 모든 페이지를 얻으려면 `FROM [[노트]]`을 사용합니다.
  - `[[노트]]`에서 나가는 모든 링크(즉, 해당 파일의 모든 링크)를 얻으려면 `FROM outgoing([[노트]])`을 사용합니다.

이러한 필터를 조합하여 `and`와 `or`을 사용하여 고급 소스를 얻을 수 있습니다.

- 예를 들어, `#태그 and "폴더"`는 `폴더`에 속하고 `#태그`가 있는 모든 페이지를 반환합니다.
- `[[음식]] or [[운동]]`은 `[[음식]]` 또는 `[[운동]]`에 링크된 모든 페이지를 제공합니다.

또한 `-`를 사용하여 소스와 일치하지 않는 항목을 얻기 위해 소스를 "부정"할 수 있습니다:

- `-#태그`는 주어진 태그가 있는 파일을 제외합니다.
- `#태그 and -"폴더"`는 `"폴더"`에 없지만 태그가 있는 파일만 포함합니다.

## WHERE

필드별로 페이지 필터링합니다. 절이 true로 평가되는 경우에만 해당하는 페이지가 생성됩니다.

```
WHERE <절>
```

1. 지난 24시간 동안 수정된 모든 파일 가져오기:

    ```sql
LIST WHERE file.mtime >= date(today) - dur(1 day)
    ```

2. 완료되지 않은 프로젝트 중 한 달 이상된 프로젝트 찾기:

    ```sql
LIST FROM #projects
WHERE !completed AND file.ctime <= date(today) - dur(1 month)
    ```

## SORT

하나 이상의 필드로 결과를 정렬합니다.

```
SORT date [ASCENDING/DESCENDING/ASC/DESC]
```

여러 필드로 정렬할 수도 있습니다. 정렬은 첫 번째 필드를 기준으로 수행됩니다. 그런 다음, 동일한 값이 있는 경우 두 번째 필드가 사용되어 해당 값을 정렬합니다. 여전히 동일한 값이 있는 경우 세 번째 정렬이 해결하고, 이와 같은 방식으로 계속됩니다.

```
SORT field1 [ASCENDING/DESCENDING/ASC/DESC], ..., fieldN [ASC/DESC]
```

## GROUP BY

필드별로 결과를 그룹화합니다. 각 고유 필드 값마다 하나의 행을 생성하며, 해당하는 모든 페이지가 포함된 `rows` 배열 필드와 함께 제공됩니다.

```
GROUP BY field
GROUP BY (computed_field) AS name
```

`rows` 배열에서 작업을 쉽게하기 위해 Dataview는 필드 "swizzling"을 지원합니다. `rows`의 모든 객체에서 `test` 필드를 가져오려면 `rows.test`는 자동으로 `rows`의 모든 객체에서 `test` 필드를 가져와서 새로운 배열을 반환합니다.
그런 다음, 결과 배열에 대해 `sum()` 또는 `flat()`과 같은 집계 연산자를 적용할 수 있습니다.

## FLATTEN

각 행의 배열을 평탄화하여 배열의 각 항목당 하나의 결과 행을 생성합니다.

```
FLATTEN field
FLATTEN (computed_field) AS name
```

예를 들어, 각 문학 노트에서 `authors` 필드를 평탄화하여 작성자별로 하나의 행을 제공합니다:

=== "쿼리"
```sql
TABLE authors FROM #LiteratureNote
FLATTEN authors
```

=== "결과"

|File|authors|
|-|-|
|stegEnvironmentalPsychologyIntroduction2018 SN|Steg, L.|
|stegEnvironmentalPsychologyIntroduction2018 SN|Van den Berg, A. E.|
|stegEnvironmentalPsychologyIntroduction2018 SN|De Groot, J. I. M.|
|Soap Dragons SN|Robert Lamb|
|Soap Dragons SN|Joe McCormick|
|smithPainAssaultSelf2007 SN|Jonathan A. Smith|
|smithPainAssaultSelf2007 SN|Mike Osborn|

`FLATTEN`은 중첩된 목록을 보다 쉽게 처리할 수 있도록 도와줍니다. 예를 들어, `file.lists` 또는 `file.tasks`와 같은 중첩된 목록을 더 쉽게 사용할 수 있습니다.
끝 결과는 약간 다르지만, 쿼리가 더 간단해집니다 (그룹화된 것과 비교하여 그룹화되지 않음).
동일한 결과를 얻으려면 `GROUP BY file.link`를 사용할 수도 있지만, 앞에서 설명한대로 `rows.T.text`를 사용해야 합니다.

```
table T.text as "Task Text"
from "Scratchpad"
flatten file.tasks as T
where T.text
```

```
table filter(file.tasks.text, (t) => t) as "Task Text"
from "Scratchpad"
where file.tasks.text
```

중첩된 목록에서 작업하기 쉬우려면 `FLATTEN`을 사용하면 됩니다. 이 경우 조건에 대해 복잡한 함수인 `map()`이나 `filter()` 대신에 간단한 where 조건을 사용할 수 있습니다.

## LIMIT

결과를 최대 N개로 제한합니다.

```
LIMIT 5
```

명령어는 작성된 순서대로 처리되므로 다음은 이미 제한된 결과에 대해 정렬하는 예입니다:

```
LIMIT 5
SORT date ASCENDING
```