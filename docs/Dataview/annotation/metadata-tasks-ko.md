---
created: 2023-10-14 T19:05
updated: 2023-10-14 T22:25
---
# 작업 및 목록의 메타데이터

페이지와 마찬가지로, 목록 항목과 작업 수준에서도 **필드**를 추가하여 특정 작업에 바인딩할 수 있습니다. 이를 위해 [인라인 필드 구문](../add-metadata-ko.md#inline-fields)을 사용해야 합니다.

```markdown
- [ ] 안녕하세요, 이것은 [metadata:: value]입니다! [link](https://todoist.com/showTask?id=7316562981) #todoist %%[todoist_id:: 7316562981]%%
- [X] 완료일은 [completion:: 2021-08-15]입니다.
```

작업과 목록 항목은 데이터적으로 동일하므로 모든 글머리 기호에는 여기에서 설명한 모든 정보가 사용 가능합니다.

## 필드 단축 구문

"일반적인 사용 사례"를 지원하기 위해 Dataview는 일부 필드에 대한 단축 구문을 이해합니다. 작업에 주석을 추가하려는 경우 다음과 같이 요약할 수 있습니다:

```markdown
=== "예시"
    - [ ] 토요일까지 완료 🗓️2021-08-29 [link](https://todoist.com/showTask?id=7316614658) #todoist %%[todoist_id:: 7316614658]%%
    - [x] 지난 토요일 완료 ✅2021-08-22 [link](https://todoist.com/showTask?id=7316614698) #todoist %%[todoist_id:: 7316614698]%%
    - [ ] 1990년 6월 14일 생성 ➕1990-06-14 [link](https://todoist.com/showTask?id=7316614804) #todoist %%[todoist_id:: 7316614804]%%
    - [ ] 주말에 시작할 수 있는 작업 🛫2021-08-29 [link](https://todoist.com/showTask?id=7316614839) #todoist %%[todoist_id:: 7316614839]%%
    - [x] 예정보다 일찍 끝낸 작업 ⏳2021-08-29 ✅2021-08-22 [link](https://todoist.com/showTask?id=7316614849) #todoist %%[todoist_id:: 7316614849]%%
```

이모지 단축 구문에는 두 가지 특징이 있습니다. 첫째, 인라인 필드 구문을 생략합니다(`[🗓️:: YYYY-MM-DD]`가 필요하지 않음). 둘째, 데이터적으로는 **텍스트** 필드 이름에 매핑됩니다.

| 필드 이름 | 단축 구문 |
| ---------- | ----------------- |
| due | `🗓️YYYY-MM-DD` |
| completion |  `✅YYYY-MM-DD` |
| created | `➕YYYY-MM-DD` |
| start | `🛫YYYY-MM-DD` |
| scheduled | `⏳YYYY-MM-DD` |

따라서 2021-08-22에 완료된 모든 작업을 쿼리하려면 다음과 같이 작성합니다:

~~~markdown
```dataview
TASK
WHERE completion = date("2021-08-22")
```
~~~

결과로는 단축 구문과 텍스트 주석의 양쪽이 나열됩니다:

```markdown
- [x] 지난 토요일 완료 ✅2021-08-22 [link](https://todoist.com/showTask?id=7316614941) #todoist %%[todoist_id:: 7316614941]%%
- [x] Some Done Task [completion:: 2021년 8월 22일] [link](https://todoist.com/showTask?id=7316615069) #todoist %%[todoist_id:: 7316615069]%%
```

## 암묵적 필드

페이지와 마찬가지로 Dataview는 각 작업 또는 목록 항목에 여러 암묵적 필드를 추가합니다:

!!! info "필드 상속"
    작업은 부모 페이지로부터 *모든 필드*를 상속받습니다. 따라서 페이지에 `rating` 필드가 있다면 `TASK` 쿼리에서 해당 작업에서도 해당 필드에 접근할 수 있습니다.


| 필드 이름 | 데이터 유형 | 설명 |
| ---------- | --------- | ----------- |
| `status` |  텍스트  | `[ ]` 괄호 내부의 문자로 결정되는 이 작업의 완료 상태입니다. 일반적으로 미완료된 작업은 공백 `" "`이고 완료된 작업은 `"x"`입니다. 그러나 대체 작업 상태를 지원하는 플러그인도 사용할 수 있습니다. |
| `checked` |  부울  | 이 작업 상태가 비어 있는지 여부를 나타냅니다. 즉, `[ ]` 괄호 안에 공백이 있는지 여부입니다. |
| `completed` |  부울  | 이 *특정* 작업이 완료되었는지 여부입니다. 이것은 하위 작업의 완료 또는 미완료와 관계하지 않습니다. 'x'로 표시된 경우 작업은 명시적으로 "완료"로 간주됩니다. 사용자 정의 상태를 사용하는 경우, 예를 들어 `[-]`인 경우 `checked`는 true이고 `completed`는 false입니다. |
| `fullyCompleted` |  부울  | 이 작업과 **모든** 하위 작업이 완료되었는지 여부입니다. |
| `text` |  텍스트  | 이 작업의 일반 텍스트입니다. 메타데이터 필드 주석을 포함합니다. |
| `visual` | 텍스트 | Dataview에 의해 렌더링되는 이 작업의 텍스트입니다. 임의의 텍스트를 렌더링하도록 수정할 수 있습니다. |
| `line` |  숫자  | 이 작업이 나타나는 파일의 줄 번호입니다. |
| `lineCount` |  숫자  | 이 작업이 차지하는 Markdown 줄 수입니다. |
| `path` |  텍스트  | 이 작업이 있는 파일의 전체 경로입니다. [페이지](./metadata-pages-ko.md)에 대한 경우에는 `file.path`와 동일합니다. |
| `section` | 링크(Link) | 해당 작업이 포함된 섹션으로의 링크입니다. |
| `tags` | 리스트(List)  | 해당 텍스트 작업 내부에 있는 태그들입니다. |
| `outlinks` (외부 링크)   List(List) |  해당 작업에서 정의된 모든 링크입니다. |
| `link` (링크) | 링크(Link)  | 이 작업 근처에 가장 가까운 링크 가능한 블록으로의 링크입니다. 작업으로 이동하는 데 유용합니다. |
| `children` (하위 항목) | 리스트(List)  | 이 작업의 하위 작업 또는 하위 목록입니다. |
| `task` (작업) | 부울  | 참인 경우, 이것은 작업이며, 그렇지 않으면 일반 목록 요소입니다. |
| `annotated` (주석 처리됨) | 부울  | 해당 작업 텍스트에 메타데이터 필드가 포함되어 있는 경우 true이고, 그렇지 않으면 false입니다. |
| `parent` (상위 항목) | 숫자(Number)   | 현재 작업 위의 작업의 줄 번호(있는 경우); 최상위 수준의 작업인 경우 null일 것입니다. |
| `blockId` (블록 ID)| 텍스트(Text)| 만약 `^blockId` 구문을 사용하여 정의된 경우, 해당 작업/목록 요소의 블록 ID이고, 그렇지 않으면 null일 것입니다.

[간략한 구문](#field-shorthands)을 사용하면 다음과 같은 추가 속성을 사용할 수 있습니다:

- `completion`: 과제가 완료된 날짜입니다.
- `due`: 과제의 마감일이 있는 경우 해당 날짜입니다.
- `created`: 과제가 생성된 날짜입니다.
- `start`: 과제를 시작할 수 있는 날짜입니다.
- `scheduled`: 작업을 수행할 예정인 날짜입니다.

### 목록 항목과 작업에 대한 암묵적 필드 접근

[TASK](../queries/query-types-ko.md#task-queries) 쿼리를 사용하는 경우, 작업은 최상위 정보이므로 접두사 없이 사용할 수 있습니다:

~~~markdown
```dataview
TASK
WHERE !fullyCompleted
```
~~~

다른 모든 쿼리 유형에서는 먼저 암묵적 필드 `file.lists` 또는 `file.tasks`에 접근하여 목록 항목별 특정 암묵적 필드를 확인하려면 다음과 같이 [목록 함수](../reference/functions-ko.md)를 사용해야 합니다. 

~~~markdown
```dataview
LIST
WHERE any(file.tasks, (t) => !t.fullyCompleted)
```
~~~

위 쿼리는 완료되지 않은 작업이 포함된 파일 링크를 반환합니다. 페이지 수준에서 작업 목록을 얻으므로 [목록 함수](../reference/functions-ko.md)를 사용하여 각 요소를 확인해야 합니다.