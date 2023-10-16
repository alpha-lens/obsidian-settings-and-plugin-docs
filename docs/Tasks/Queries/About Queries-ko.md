---
publish: true
aliases:
  - Queries/Queries
---

# 쿼리에 대해

<span class="related-pages">#index-pages</span>

## 가장 간단한 쿼리

`tasks` 코드 블록을 사용하여 전체 보관소에서 작업을 쿼리하여 나열할 수 있습니다. 쿼리 결과의 작업은 옆에 있는 작은 연필 아이콘을 클릭하여 편집할 수 있습니다.
태스크는 기본적으로 상태, 마감일 및 경로 순으로 정렬됩니다. 정렬 방식을 변경할 수도 있습니다(아래의 쿼리 옵션 참조).

가장 간단한 방법은 다음과 같이 작업을 쿼리하는 것입니다:

    ```tasks
    ```

실시간 미리보기 및 읽기 모드에서는 상태와 같은 속성과 관계없이 보관소의 *모든* 작업이 나열됩니다.

아마도 이것이 원하는 결과는 아닐 것입니다.
따라서 Tasks를 사용하면 원하는 작업만 표시하기 위해 쿼리 옵션을 설정할 수 있습니다.

## Tasks 쿼리 옵션

### 작업 검색 - 기본

- [[Filters|필터]]
- [[Explaining Queries|쿼리 설명]]
- [[Comments|주석]]
- [[Examples|예제]]

### 작업 검색 - 고급

- [[Global Query|전체 쿼리]]
- [[Combining Filters|필터 결합]]
- [[Regular Expressions|정규 표현식]]
- [[Line Continuations|라인 연속]]

### 결과 보기

- [[Backlinks|백링크]]

### 디스플레이 제어

- [[Limiting|제한하기]]
- [[Sorting|정렬하기]]
- [[Grouping|그룹화하기]]
- [[Layout|레이아웃]]

## 쿼리의 제한 사항

> [!warning]
> 결과 목록은 들여쓰기되지 않은 상태로 나열됩니다.
토론 주제에 대한 [#60](https://github.com/obsidian-tasks-group/obsidian-tasks/discussions/60)를 참조하세요.
기여하고자 하는 경우 망설이지 마세요 😊

---

> [!warning]
> 결과 목록에는 원래 태스크의 각주가 포함되지 않습니다.
각주는 ```tasks 블록으로 생성된 문서로 전달되지 않습니다.