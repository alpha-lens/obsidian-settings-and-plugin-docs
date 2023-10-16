---
publish: true
---

# 작업 스타일링

<span class="related-pages">#css</span>

## 소개

> [!released]
아래 기능들은 Tasks 3.0.0에서 도입되었습니다.

Tasks 플러그인은 렌더링된 쿼리와 읽기 보기에서 매우 다양한 CSS를 통한 스타일링 옵션을 가능하게 하기 위해 상세한 CSS 클래스와 데이터 속성을 추가합니다.
렌더링된 작업의 각 구성 요소는 차별화하기 위해 클래스로 태그가 지정되며, 많은 구성 요소는 작업의 실제 내용을 나타내는 클래스와 데이터 속성을 추가하여 작업의 상대적인 마감일이나 특정 우선순위와 같은 데이터에 대한 CSS 규칙을 참조할 수 있습니다.

### 스타일 공유 부탁드립니다

Obsidian CSS 코드 조각을 직접 만드는 Tasks 사용자들에게 ["Show and tell" Discussions 카테고리](https://github.com/obsidian-tasks-group/obsidian-tasks/discussions/categories/show-and-tell)에서 공유를 부탁드립니다. 이를 통해 다른 사용자들에게 영감을 주고, CSS 및 디자인 기술을 활용할 수 있도록 도움이 됩니다.

미리 감사드립니다!

### 하위 호환성과 CSS 코드 조각

> [!warning]
Tasks 3.0.0에서 기존의 Tasks CSS 코드 조각이 작동하지 않는 경우, 아래 [[스타일링#부록: Tasks 3.0.0을 위한 기존 CSS 코드 조각 수정|부록: Tasks 3.0.0을 위한 기존 CSS 코드 조각 수정]]의 안내를 따르세요.

## 기본 작업 구조

> [!released]
아래 설명은 Tasks 3.0.0에서 도입된 렌더링된 작업의 구조 재구성과 관련됩니다.

Tasks 플러그인은 작업을 다음과 같은 구조로 렌더링합니다 (이는 쿼리 결과에 대한 것입니다만, 읽기 보기도 상단 컨테이너를 제외하고 동일합니다):

```markdown
- Obsidian 코드 블록 (div class="block-language-tasks")
  - 결과 목록 (ul class="plugin-tasks-query-result") 또는 읽기 보기 목록 (ul class="contains-task-list")
    - 작업 (li class="task-list-item" + data-task-priority="medium" data-task-due="past-1d" + data-task="[custom_status]" + data-line="[line]")
      - 작업 체크박스 (li class="task-list-item-checkbox")
      - 작업 내용 (span class="tasks-list-text")
        - 작업 설명과 태그 (span class="task-description")
          - 내부 span
            - 각 태그는 <a href class="tag" data-tag-name="[tag-name]">로 둘러싸입니다.
        - 작업 우선순위 (span class="task-priority" + data-task-priority 속성)
          - 내부 span
        - 작업 반복 규칙 (span class="task-recurring")
          - 내부 span
        - 작업 생성 날짜 (span class="task-created" + data-task-created 속성)
          - 내부 span
        - ... 시작 날짜, 예정 날짜, 마감 날짜 및 완료 날짜가 이 순서로 있습니다.
      - 작업 추가 요소 (링크, 편집 버튼) (span class="task-extras")
  - 작업 개수 (div class="tasks-count")
```

위에서 볼 수 있듯이, 기본적인 작업 `li`에는 체크박스와 내용 스팬이 포함됩니다.
내용 스팬에는 설명, 우선순위, 반복 규칙, 생성된 날짜, 시작일자, 예정일자, 마감일자 및 완료일자의 목록이 포함되어 있습니다.

각 구성 요소 스팬은 해당 유형의 구성 요소를 나타내는 **일반 클래스**로 표시됩니다. 일반 클래스는 다음과 같습니다:

- `task-description`
- `task-priority`
- `task-due`
- `task-created`
- `task-start`
- `task-scheduled`
- `task-done`
- `task-recurring`

일반 클래스 외에도, 작업의 다양한 구성 요소의 내용을 나타내는 [**데이터 속성**](https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes)이 있습니다.

우선순위 데이터 속성인`data-task-priority`는 특정 우선순위를 나타냅니다. 이 값은 'highest', 'high', 'medium', 'low', 'lowest' 또는 'normal'일 수 있습니다.
'normal' 값은 특별합니다: 작업의 상위 task-list-item에 기본값으로 추가되며 해당 작업에 우선순위 필드가 설정되어 있지 않아도 됩니다.

날짜 속성은 `data-task-due`, `data-task-created`, `data-task-start`, `data-task-scheduled` 및 `data-task-done`과 같은 형식으로 마감일, 생성일, 시작일, 예정일 및 완료일을 나타냅니다. 이들 속성은 현재 날짜를 기준으로 상대적인 표현으로 채워집니다.

- `data-task-due="today"` (또는 `data-task-start="today"`, `data-task-start="today"` 등)는 오늘을 나타냅니다.
- `data-task-due="future-1d"` (또는 `data-task-start="future-1d"`)는 1일 후를 나타냅니다. 즉, 내일입니다.
- `data-task-due="past-1d"` (또는 `data-task-start="past-1d"`)는 1일 전을 나타냅니다. 즉, 어제입니다.
- 이러한 속성은 7일 이내의 미래나 과거까지 추가됩니다. 예를 들어, `data-task-scheduled="future-7d"` 또는 `date-data = "past -7d"`.
- 7 일 이상 미래나 과거인 경우에는 'far' 접미사가 붙습니다. 예를 들어, "future-far" 또는 "past-far"와 같습니다.

**태그 데이터 속성**은 각 태그의 내용을 데이터 속성으로 반복해서 나타내어 특정 태그에 따라 서식을 적용하는 용도로 사용됩니다.
태그 `<a>` 요소에는 태그 이름의 *사용 가능한* 버전인 `data-tag-name` 속성이 추가됩니다. 이는 HTML 속성으로 사용할 수 없는 문자(`&`, `"`)가 대시로 바뀌었음을 의미합니다.

데이터 속성은 해당 구성 요소(예: 마감일 구성 요소)뿐만 아니라 완전한 작업 `li`에도 추가되어 CSS 규칙이 작업의 특정 속성(예: 오늘 마감된 작업의 색상 다르게 지정, 태그에 따라 작업 색상 지정) 또는 하나의 관련 구성 요소만 스타일링하기 쉽도록 합니다.

예외적으로, 태그 데이터 속성은 렌더링된 설명 내에서 태그의 `<a>` 요소에만 추가되지만, 여전히 CSS `:has` 선택자를 사용하여 태그에 따라 전체 작업 설명을 서식 지정할 수 있습니다. 아래 예시에서 확인할 수 있습니다.

> [!warning]
CSS `:has` 선택자는 Obsidian 설치 버전 1.1.9 이상에서 사용할 수 있습니다. 현재 설치된 버전을 확인하려면 Obsidian 명령어 "디버그 정보 표시"를 실행하세요.

**팁:** [CSS 와일드카드 선택자](https://www.geeksforgeeks.org/wildcard-selectors-and-in-css-for-classes/)는 한 번에 모든 지난 날짜나 미래 날짜를 선택하는 좋은 방법입니다. 예를 들어 `.task-due[data-task-due^="past-"]`를 사용하여 마감 기한이 지난 작업을 모두 선택할 수 있습니다. 이와 관련된 예시는 아래에서 확인할 수 있습니다.

**태그 데이터 속성**은 특정 태그에 따라 서식을 적용하기 위해 각 태그의 내용을 데이터 속성으로 반복합니다. 태그 `<a>` 요소에는 태그 이름의 *사용 가능한* 버전인 `data-tag-name` 속성이 추가됩니다. 이는 HTML 속성으로 사용할 수 없는 문자(`&`, `"`)가 대시로 바뀌었음을 의미합니다.

데이터 속성은 해당 구성 요소(예: 마감일 구성 요소)와 완전한 작업 `li` 양쪽에 추가되어 CSS 규칙이 작업 전체를 스타일링하기 쉽도록 합니다(예: 오늘이 마감된 작업은 다른 색상으로, 태그에 따라 작업 색상 지정) 또는 하나의 관련 구성 요소만 스타일링하는 경우.

예외적으로, 태그 데이터 속성은 렌더링된 설명 내에서 태그의 `<a>` 요소에만 추가됩니다. 그러나 여전히 CSS `:has` 선택자를 사용하여 태그에 따라 전체 작업 설명을 서식 지정할 수 있습니다. 아래 예시에서 확인할 수 있습니다.

> [!warning]
CSS `:has` 선택자는 Obsidian 설치 버전 1.1.9 이상에서 사용할 수 있습니다. 현재 설치된 버전을 확인하려면 Obsidian 명령어 "디버그 정보 표시"를 실행하세요.

**팁:** [CSS 와일드카드 선택자](https://www.geeksforgeeks.org/wildcard-selectors-and-in-css-for-classes/)는 한 번에 모든 지난 날짜나 미래 날짜를 선택하는 좋은 방법입니다. 예를 들어 `.task-due[data-task-due^="past-"]`를 사용하여 마감 기한이 지난 작업을 모두 선택할 수 있습니다. 이와 관련된 예시는 아래에서 확인할 수 있습니다.

## 숨겨진 구성 요소, 그룹 및 단축 모드

**숨겨진 구성 요소**(예: 쿼리에서 `hide priority` 줄)는 다음과 같이 생성됩니다:

- 쿼리 컨테이너(`class="plugin-tasks-query-result"`)에 `tasks-layout-hide...` 클래스가 포함됩니다. 예: `tasks-layout-hide-priority`.
- 우선순위가 쿼리에서 렌더링되지 않더라도 상위 작업 요소(`li class="task-list-item"`)에는 여전히 숨겨진 구성 요소의 속성이 추가됩니다. 예: `data-task-priority="high"`.

**단축 모드**는 쿼리 컨테이너에 `tasks-layout-short-mode` 클래스가 추가됩니다.

**그룹화 규칙**은 쿼리 컨테이너에 `data-task-group-by` 속성을 추가합니다. 예: `data-task-group-by="due,scheduled"`.

## 사용자 정의 상태

작업 상태는 `task-list-item` `LI` 요소에 설정된 몇 가지 데이터 속성으로 나타냅니다:

- `data-task`는 *상태 기호*를 포함하며, 예를 들어 일반적인 TODO 작업의 경우 ""(빈 문자열), 완료된 일반 작업의 경우 "x" 또는 사용하는 다른 기호입니다.
- `data-task-status-type`은 *상태 유형*을 포함합니다. 예: "TODO", "DONE", "IN_PROGRESS".
- `data-task-status-name`은 *상태 이름*을 포함합니다. 예: "Todo", "Done", "In Progress".

이러한 속성은 작업 상태에 따라 작업을 스타일링하는 데 사용될 수 있으며, 대부분의 경우 상태 유형이 우선 선택되는 선택기로 사용됩니다.

## 스타일링 제한 사항

- 여기에서 설명한 CSS 클래스와 데이터 속성은 **소스 및 실시간 미리 보기 모드에서 Markdown에 대해 사용할 수 없습니다**.
- 특히, 여기에서 설명한 CSS 클래스는 다음과 같이 적용됩니다:
  - 읽기 모드,
  - 읽기 및 실시간 미리 보기 모드의 Tasks 쿼리 블록.
- 스타일은 [[파일 이름을 기본 날짜로 사용]] 옵션이 활성화된 경우 **자동 예정된 날짜에 액세스할 수 없습니다**.
  - 이 문제는 [이슈 #1947](https://github.com/obsidian-tasks-group/obsidian-tasks/issues/1947)에서 추적 중입니다.

## 추가 클래스

다음과 같은 추가 구성 요소에는 다음과 같은 클래스가 있습니다:

| 클래스                          | 사용법                                                                                                           |
| ------------------------------ | --------------------------------------------------------------------------------------------------------------- |
| plugin-tasks-query-explanation | `explain` 명령을 사용할 때 쿼리 설명을 보여주는 PRE에 적용됩니다.                                                 |
| tasks-backlink                 | 작업에서 표시되는 [[역링크|backlink]]를 감싸는 SPAN에 적용됩니다. |
| tasks-edit                     | 작업 옆에 표시되는 편집 버튼/아이콘을 감싸는 SPAN에 적용됩니다.                                                 |
| tasks-urgency                  | 작업에서 표시되는 긴급도 점수를 감싸는 SPAN에 적용됩니다.                                                         |
| tasks-group-heading            | H4, H5 및 H6 그룹 제목에 적용됩니다.                                                                               |

> [!released]
`tasks-group-heading`은 Tasks 1.6.0에서 도입되었습니다.<br>
`plugin-tasks-query-explanation`은 Tasks 1.19.0에서 도입되었습니다.

## CSS 예제

### 이 예제들에 대하여

다음 예제들은 [Obsidian CSS 스니펫](https://help.obsidian.md/How+to/Add+custom+styles#Use+Themes+and+or+CSS+snippets)으로 사용할 수 있습니다.

**팁:** 다음 예제들은 Obsidian이 제공하는 CSS 변수(`--var(...)`)를 사용하여 구체적인 색상 코드 대신 선택한 테마와 일치하는 결과를 얻기 위해 최대한 노력했습니다. 원하는 경우 구체적인 색상을 사용할 수도 있습니다.

> [!warning]
> 이러한 예제들은 설명을 위해 제공된 것일 뿐입니다: 유용하거나 좋은 디자인이거나 완벽한 CSS인 것을 주장하지 않습니다!
>
> 이러한 예제들은 Tasks 플러그인에서 제공하는 CSS 선택기의 사용법을 보여주기 위해 제공되었습니다.

#### 온라인에서 더 많은 예제

Tasks 플러그인의 사용자들은 자신만의 Obsidian CSS 스니펫을 다른 사람과 공유하기 위해 ["Show and tell" Discussions 카테고리](https://github.com/obsidian-tasks-group/obsidian-tasks/discussions/categories/show-and-tell)에 참여하도록 초대합니다.

Tasks 3.0.0 버전이 출시된 후 며칠 동안, 상기 링크에서 점점 더 많은 스니펫이 제공될 것으로 예상됩니다.

원하는 경우 여러분 자신의 스니펫도 추가해주세요!

### 일반 서식

태그, 내부 링크 및 작업의 반복 규칙을 회색으로 표시:

<!-- snippet: resources/sample_vaults/Tasks-Demo/.obsidian/snippets/tasks-plugin-tags-links-recurrence-gray.css -->
```css
.tasks-list-text a.tag {
    color: var(--list-marker-color);
}

.tasks-backlink a.internal-link {
    color: var(--list-marker-color);
}

.task-recurring {
    color: var(--list-marker-color);
}
```
<!-- endSnippet -->

예제:

![tasks-plugin-tags-links-recurrence-gray.css 스니펫 예제](../../images/tasks-plugin-tags-links-recurrence-gray-snippet.png)

### 체크박스 색상 우선순위 지정

다음 규칙은 작업 우선순위 이모티콘을 제거하고 작업의 우선순위에 따라 작업의 확인란을 보라색, 빨간색, 주황색, 파란색, 청록색 및 녹색으로 렌더링합니다:

<!-- snippet: resources/sample_vaults/Tasks-Demo/.obsidian/snippets/tasks-plugin-priority-as-checkbox-color.css -->
```css
.task-list-item[data-task-priority="highest"] input[type=checkbox] {
    box-shadow: 0px 0px 2px 2px var(--color-purple);
    border-color: var(--color-purple);
}

.task-list-item[data-task-priority="high"] input[type=checkbox] {
    box-shadow: 0px 0px 2px 2px var(--color-red);
    border-color: var(--color-red);
}

.task-list-item[data-task-priority="medium"] input[type=checkbox] {
    box-shadow: 0px 0px 2px 2px var(--color-orange);
    border-color: var(--color-orange);
}

.task-list-item[data-task-priority="normal"] input[type=checkbox] {
    box-shadow: 0px 0px 2px 2px var(--color-blue);
    border-color: var(--color-blue);
}

.task-list-item[data-task-priority="low"] input[type=checkbox] {
    box-shadow: 0px 0px 2px 2px var(--color-cyan);
    border-color: var(--color-cyan);
}

.task-list-item[data-task-priority="lowest"] input[type=checkbox] {
    box-shadow: 0px 0px 2px 2px var(--color-green);
    border-color: var(--color-green);
}

/* This part removes the regular priority emoticon */
span.task-priority {
    display: none;
}
```
<!-- endSnippet -->

예제:

![Example of tasks-plugin-priority-as-checkbox-color.css snippet](../../images/tasks-plugin-priority-as-checkbox-color-snippet.png)

### 커스텀 Task 스타일링

#### 상태 Symbols

상태 기호 `/`가 있는 작업의 확인란 주위에 녹색 후광을 만들려면 다음 CSS 스니펫을 추가하세요:

<!-- snippet: resources/sample_vaults/Tasks-Demo/.obsidian/snippets/tasks-plugin-style-status-symbols.css -->
```css
li.task-list-item[data-task="/"] .task-list-item-checkbox {
    box-shadow: 0 0 10px green !important;
}
```
<!-- endSnippet -->

For example, in Reading mode:

![Example of tasks-plugin-style-status-symbols.css snippet](../../images/tasks-plugin-style-status-symbols-snippet.png)

이 스크린샷은 체크박스의 스타일을 지정하기 위해 프리즘 테마를 선택한 상태에서 찍은 것입니다. 그림자에 대한 테마의 의견을 재정의하려면 '!중요'[flag](https://developer.mozilla.org/en-US/docs/Web/CSS/important)가 필요합니다.

#### 상태 유형

또는 상태 유형을 사용하여 상태 기호와 독립적인 규칙을 작성할 수도 있습니다.
여기서는 실행 가능한 모든 작업 주위에 녹색 후광을 표시합니다:

<!-- snippet: resources/sample_vaults/Tasks-Demo/.obsidian/snippets/tasks-plugin-style-status-types.css -->
```css
li.task-list-item[data-task-status-type="TODO"] .task-list-item-checkbox,
li.task-list-item[data-task-status-type="IN_PROGRESS"] .task-list-item-checkbox {
    box-shadow: 0 0 10px green !important;
}
```
<!-- endSnippet -->

For example, in Reading mode:

![Example of tasks-plugin-style-status-types.css snippet](../../images/tasks-plugin-style-status-types-snippet.png)

다시 말하지만, 스크린샷은 프리즘 테마로 찍은 것이며 그림자에 대한 테마의 의견을 무시하려면 '!중요'[플래그](https://developer.mozilla.org/en-US/docs/Web/CSS/important)가 필요합니다.

#### 오늘 마감(Due Today) 및 기한 초과(Overduw) 색상

다음 규칙은 '오늘' 마감일을 청록색으로, 기한이 지난 마감일을 빨간색으로 표시합니다:

<!-- snippet: resources/sample_vaults/Tasks-Demo/.obsidian/snippets/tasks-plugin-color-due-today-and-overdue.css -->
```css
/* A special color for the 'due' component if it's for today */
.task-list-item[data-task-status-type="TODO"] .task-due[data-task-due="today"] span,
.task-list-item[data-task-status-type="IN_PROGRESS"] .task-due[data-task-due="today"] span {
    background: var(--color-cyan);
    border-radius: 10px;
    padding: 2px 8px;
}

/* A special color for overdue due dates */
.task-list-item[data-task-status-type="TODO"] .task-due[data-task-due^="past-"] span,
.task-list-item[data-task-status-type="IN_PROGRESS"] .task-due[data-task-due^="past-"] span {
    background: var(--color-pink);
    border-radius: 10px;
    padding: 2px 8px;
}
```
<!-- endSnippet -->

예제:

![Example of tasks-plugin-color-due-today-and-overdue.css snippet](../../images/tasks-plugin-color-due-today-and-overdue-snippet.png)

완료, 취소 및 비작업 상태 유형이 있는 작업의 날짜가 강조 표시되지 않도록 선택기에 상태 유형만 포함한다는 점에 유의하세요.

### 특정 태그에 대한 강조 표시

다음 규칙은 설명 안의 `#task/atHome` 태그 주위에 녹색 빛을 추가합니다:

<!-- snippet: resources/sample_vaults/Tasks-Demo/.obsidian/snippets/tasks-plugin-highlight-specific-tag-green-glow.css -->
```css
a.tag[data-tag-name="#task/atHome"] {
    box-shadow: 0 0 5px green;
}
```
<!-- endSnippet -->

For example:

![Example of tasks-plugin-highlight-specific-tag-green-glow.css snippet](../../images/tasks-plugin-highlight-specific-tag-green-glow-snippet.png)

다음 규칙은 작업 설명에 `#task/strategic` 태그가 포함된 경우 둥근 빨간색 배경을 추가합니다:

<!-- snippet: resources/sample_vaults/Tasks-Demo/.obsidian/snippets/tasks-plugin-highlight-specific-tag-round-red-description.css -->
```css
.task-description span:has(.tag[data-tag-name="#task/strategic"]) {
    background: #ffbfcc;
    border-radius: 10px;
    padding: 2px 8px;
}
```
<!-- endSnippet -->

예제:

![Example of tasks-plugin-highlight-specific-tag-round-red-description.css snippet](../../images/tasks-plugin-highlight-specific-tag-round-red-description-snippet.png)

### 원(Circle) 체크박스

다음은 체크박스를 사각형이 아닌 원(Circle)으로 렌더링합니다:

<!-- snippet: resources/sample_vaults/Tasks-Demo/.obsidian/snippets/tasks-plugin-circular-checkboxes.css -->
```css
ul > li.plugin-tasks-list-item .task-list-item-checkbox {
    margin-inline-start: 0;
    margin: 5px 2px;
    border-radius: 50%;
}
```
<!-- endSnippet -->

예제:

![Example of tasks-plugin-circular-checkboxes.css snippet](../../images/tasks-plugin-circular-checkboxes-snippet.png)

### 그리드 레이아웃

다음은 작업 구조를 3줄 그리드로 정리한 것입니다:

- 첫 번째 줄에는 설명이 있습니다,
- 다양한 구성 요소가 두 번째 줄에 있습니다,
- 긴급성, 백링크 및 편집 버튼은 표시되는 경우 세 번째 줄에 있습니다.

<!-- snippet: resources/sample_vaults/Tasks-Demo/.obsidian/snippets/tasks-plugin-grid-layout.css -->
```css
ul > li.plugin-tasks-list-item {
    grid-template-columns: 25px auto;
    display: grid;
    align-items: top;
}

span.task-description {
    grid-row: 1;
    grid-column: 1/10;
}

span.tasks-backlink {
    grid-row: 2;
    grid-column: 2;
    font-size: small;
}

span.task-recurring {
    grid-row: 2;
    font-size: small;
    width: max-content;
}

span.task-due {
    grid-row: 2;
    font-size: small;
    width: max-content;
}

span.task-done {
    grid-row: 2;
    font-size: small;
    width: max-content;
}

.tasks-list-text {
    position: relative;
    display: inline-grid;
    width: max-content;
    grid-column-gap: 10px;
}

span.task-extras {
    grid-row: 2;
    grid-column: 2;
    font-size: small;
}

/* 읽기 모드에서 중첩된 글머리 기호가 그리드의 전체 너비를 차지하도록 합니다. */
li.task-list-item ul.has-list-bullet {
 grid-row: 3;
 grid-column: 1/10;
}
```
<!-- endSnippet -->

읽기 모드를 위한 예제:

![Example of tasks-plugin-grid-layout.css snippet in Reading view](../../images/tasks-plugin-grid-layout-snippet-reading.png)

작업 쿼리 블록 예제:

![Example of tasks-plugin-grid-layout.css snippet in Tasks query block](../../images/tasks-plugin-grid-layout-snippet-query.png)

### 전체 예제

다음은 전체 CSS 스니펫의 기본으로 사용할 수 있습니다:

<!-- snippet: resources/sample_vaults/Tasks-Demo/.obsidian/snippets/tasks-plugin-complete-example.css -->
```css
/* 태그가 너무 눈에 띄지 않도록 회색으로 표시되는 것이 좋습니다. */
.tasks-list-text a.tag {
    color: var(--list-marker-color);
}

/* 옵시디언의 기본값 대신 내부 링크도 회색으로 설정하세요. */
.tasks-backlink a.internal-link {
    color: var(--list-marker-color);
}

/* 반복 규칙을 회색으로 칠하면 덜 산만해집니다. */
.task-recurring {
    color: var(--list-marker-color);
}

/* 나에게 잘 맞는 들여쓰기 값 지정 */
ul.contains-task-list.plugin-tasks-query-result {
    padding: 0 10px;
}

/* 작업 설명이 너무 길어 줄 바꿈이 올바르게 이루어지려면 이 작업이 필요할 것 같습니다. */
span.tasks-list-text {
    width: auto;
}

/* 우선순위 이모티콘 대신 다채로운 색상의 동그란 체크박스로 작업의 우선순위를 표시하세요. */
.task-list-item[data-task-priority="highest"] input[type=checkbox] {
    box-shadow: 0px 0px 2px 2px var(--color-purple);
    border-color: var(--color-purple);
}

.task-list-item[data-task-priority="high"] input[type=checkbox] {
    box-shadow: 0px 0px 2px 2px var(--color-red);
    border-color: var(--color-red);
}

.task-list-item[data-task-priority="medium"] input[type=checkbox] {
    box-shadow: 0px 0px 2px 2px var(--color-orange);
    border-color: var(--color-orange);
}

.task-list-item[data-task-priority="normal"] input[type=checkbox] {
    box-shadow: 0px 0px 2px 2px var(--color-blue);
    border-color: var(--color-blue);
}

.task-list-item[data-task-priority="low"] input[type=checkbox] {
    box-shadow: 0px 0px 2px 2px var(--color-cyan);
    border-color: var(--color-cyan);
}

.task-list-item[data-task-priority="lowest"] input[type=checkbox] {
    box-shadow: 0px 0px 2px 2px var(--color-green);
    border-color: var(--color-green);
}

/* 이 부분에서는 일반 우선순위 이모티콘이 제거됩니다. */
span.task-priority {
    display: none;
}

/* '마감' 구성 요소의 경우 오늘을 위한 것이지만 아직 작업이 필요한 경우 특별한 색상을 지정합니다. */
.task-list-item[data-task-status-type="TODO"] .task-due[data-task-due="today"] span,
.task-list-item[data-task-status-type="IN_PROGRESS"] .task-due[data-task-due="today"] span {
    background: var(--color-cyan);
    border-radius: 10px;
    padding: 2px 8px;
}

/* 기한이 지난 작업, 아직 작업이 필요한 작업의 경우 특수 색상으로 표시합니다. */
.task-list-item[data-task-status-type="TODO"] .task-due[data-task-due^="past-"] span,
.task-list-item[data-task-status-type="IN_PROGRESS"] .task-due[data-task-due^="past-"] span {
    background: var(--color-pink);
    border-radius: 10px;
    padding: 2px 8px;
}

/* 확인란을 사각형이 아닌 원으로 만들기 */
ul > li.plugin-tasks-list-item .task-list-item-checkbox {
    margin-inline-start: 0;
    margin: 5px 2px;
    border-radius: 50%;
}

/* 다음 섹션에서는 작업 구성 요소를 그리드로 구성하므로 각 항목의 첫 번째 행에는 설명이 표시되고 대부분의 구성 요소는 두 번째 행에 표시됩니다. */
ul > li.plugin-tasks-list-item {
    grid-template-columns: 25px auto;
    display: grid;
    align-items: top;
}

span.task-description {
    grid-row: 1;
    grid-column: 1/10;
}

span.tasks-backlink {
    grid-row: 2;
    grid-column: 2;
    font-size: small;
}

span.task-recurring {
    grid-row: 2;
    font-size: small;
    width: max-content;
}

span.task-due {
    grid-row: 2;
    font-size: small;
    width: max-content;
}

span.task-done {
    grid-row: 2;
    font-size: small;
    width: max-content;
}

.tasks-list-text {
    position: relative;
    display: inline-grid;
    width: max-content;
    grid-column-gap: 10px;
}

span.task-extras {
    grid-row: 2;
    grid-column: 2;
    font-size: small;
}

/* 읽기 모드에서 중첩된 글머리 기호가 그리드의 전체 너비를 차지하도록 합니다. */
li.task-list-item ul.has-list-bullet {
 grid-row: 3;
 grid-column: 1/10;
}
```
<!-- endSnippet -->

예제:

![Example of tasks-plugin-complete-example.css snippet](../../images/tasks-plugin-complete-example-snippet.png)

## 부록: Tasks 3.0.0의 기존 CSS 코드조각 수정하기

이 섹션에서는 3.0.0으로 업데이트한 후 Tasks용 CSS 스니펫이 작동을 멈춘 경우 어떻게 해야 하는지 설명합니다.

### 요약

이 `diff` 전후 출력에 표시된 것처럼 CSS 선택기에서 `>`를 제거해 보세요:

```diff
- li.plugin-tasks-list-item > span.tasks-backlink > a {
+ li.plugin-tasks-list-item   span.tasks-backlink > a {
```

### 설명

위에서 설명한 주요 CSS 개선 사항으로 인해 쿼리 블록을 표시하기 위해 Tasks에서 생성되는 CSS 클래스가 약간 변경되었습니다.

위의 `diff` 출력에서 `>`는 '직접 자식'을 의미하며, 공백은 '일반 자식'을 의미합니다.

Tasks 3.0.0부터 `tasks-backlink` 스팬은 이제 다른 스팬(`tasks-extras`) 내부에 있으며 `plugin-tasks-list-item` 바로 아래에 있지 않습니다.

따라서 작업 3.0.0에서 작업의 CSS 블록이 작동을 멈춘 경우 `>`가 있는지 확인하여 공백으로 변경하세요.