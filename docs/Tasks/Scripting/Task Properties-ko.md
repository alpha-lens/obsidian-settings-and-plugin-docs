---
publish: true
---

# 작업 속성

<span class="related-pages">#feature/scripting</span>

> [!released]
> 작업 속성은 Tasks 4.0.0에서 소개되었습니다.

## 소개

점점 더 많은 위치에서, Tasks는 작업의 값을 프로그래밍 또는 스크립팅을 통해 접근할 수 있게 해줍니다:

- [[Grouping-ko#사용자 정의 그룹|그룹화#사용자 정의 그룹]]
- [[Filters-ko#사용자 정의 필터|필터#사용자 정의 필터]]

이 페이지는 액세스할 수 있는 Tasks의 모든 정보 조각을 문서화합니다.

## 작업 상태에 대한 값

더 많은 정보와 사용자 정의 상태를 추가하는 방법에 대한 자세한 내용은 [[Statuses-ko|Statuses]]를 참조하십시오.

<!-- included text 앞에 빈 줄을 넣어 강제로 공백 줄을 만듭니다. --><!-- include: TaskProperties.test.task_status.approved.md -->

| 필드 | 유형 1 | 예제 1 | 유형 2 | 예제 2 |
| ----- | ----- | ----- | ----- | ----- |
| `task.isDone` | `boolean` | `false` | `boolean` | `false` |
| `task.status.name` | `string` | `'할 일'` | `string` | `'진행 중'` |
| `task.status.type` | `string` | `'TODO'` | `string` | `'IN_PROGRESS'` |
| `task.status.typeGroupText` | `string` | `'%%2%%TODO'` [^commented] | `string` | `'%%1%%IN_PROGRESS'` [^commented] |
| `task.status.symbol` | `string` | `' '` | `string` | `'/'` |
| `task.status.nextSymbol` | `string` | `'x'` | `string` | `'x'` |

<!-- included text 뒤에 빈 줄을 넣어 강제로 공백 줄을 만듭니다. --><!-- endInclude -->

1. `task.status.typeGroupText` (Tasks 4.9.0에서 추가)는 사용자 정의 그룹 함수에서 상태 유형을 자연스러운 순서로 정렬하는 편리한 방법입니다.

## 작업 날짜에 대한 값

<!-- included text 앞에 빈 줄을 넣어 강제로 공백 줄을 만듭니다. --><!-- include: TaskProperties.test.task_dates.approved.md -->

| 필드 | 유형 1 | 예제 1 | 유형 2 | 예제 2 |
| ----- | ----- | ----- | ----- | ----- |
| `task.created` | `TasksDate` | `2023-07-01 00:00` | `TasksDate` | `` |
| `task.start` | `TasksDate` | `2023-07-02 00:00` | `TasksDate` | `` |
| `task.scheduled` | `TasksDate` | `2023-07-03 00:00` | `TasksDate` | `` |
| `task.due` | `TasksDate` | `2023-07-04 00:00` | `TasksDate` | `` |
| `task.done` | `TasksDate` | `2023-07-05 00:00` | `TasksDate` | `` |
| `task.happens` | `TasksDate` | `2023-07-02 00:00` | `TasksDate` | `` |

<!-- included text 뒤에 빈 줄을 넣어 강제로 공백 줄을 만듭니다. --><!-- endInclude -->

1. 각각의 값은 `TasksDate` 객체입니다. [[#TasksDate 속성의 값]] 섹션에서 가능한 작업을 보여줍니다.
1. 현재 저장된 날짜는 시간이 없거나 정확히는 해당 날의 시작인 자정, 로컬 시간입니다.
1. 예를 들어, 날짜 속성의 예제 사용에 대한 자세한 내용은 [[Grouping-ko#마감일|그룹화#마감일]]을 참조하십시오.
1. `task.happens`는 `task.due`, `task.scheduled` 및 `task.start` 중 가장 이른 날짜입니다.

## TasksDate 속성의 값

<!-- included text 앞에 빈 줄을 넣어 강제로 공백 줄을 만듭니다. --><!-- include: TaskProperties.test.task_date_fields.approved.md -->

| 필드 | 유형 1 | 예제 1 | 유형 2 | 예제 2 |
| ----- | ----- | ----- | ----- | ----- |
| `task.due` | `TasksDate` | `2023-07-04 00:00` | `TasksDate` | `` |
| `task.due.moment` | `Moment` | `moment('2023-07-04 00:00')` | `null` | `null` |
| `task.due.formatAsDate()` | `string` | `'2023-07-04'` | `string` | `''` |
| `task.due.formatAsDate('undated')` | `string` | `'2023-07-04'` | `string` | `'undated'` |
| `task.due.formatAsDateAndTime()` | `string` | `'2023-07-04 00:00'` | `string` | `''` |
| `task.due.formatAsDate('undated')` | `string` | `'2023-07-04'` | `string` | `'undated'` |
| `task.due.format('dddd')` | `string` | `'Tuesday'` | `string` | `''` |
| `task.due.toISOString()` | `string` | `'2023-07-04T00:00:00.000Z'` | `string` | `''` |
| `task.due.toISOString(true)` | `string` | `'2023-07-04T00:00:00.000+00:00'` | `string` | `''` |
| `task.due.category.name` | `string` | `'미래'` | `string` | `'미지정'` |
| `task.due.category.sortOrder` | `number` | `3` | `number` | `4` |
| `task.due.category.groupText` | `string` | `'%%3%% 미래'` [^commented] | `string` | `'%%4%% 미지정'` [^commented] |
| `task.due.fromNow.name` | `string` | `'22일 후'` | `string` | `''` |
| `task.due.fromNow.sortOrder` | `number` | `320230704` | `number` | `0` |
| `task.due.fromNow.groupText` | `string` | `'%%320230704%% 22일 후'` [^commented] | `string` | `''` |

<!-- included text 뒤에 빈 줄을 넣어 강제로 공백 줄을 만듭니다. --><!-- endInclude -->

1. 이러한 예는 `task.due`를 가리키지만, [[#작업 날짜에 대한 값]] 섹션에 표시된 다른 모든 날짜 속성에서도 사용할 수 있습니다.
1. `TasksDate` 서식 지정 메서드는 [moment.js 형식 문자](https://momentjs.com/docs/#/displaying/format/)을 사용합니다.
1. 현재 [TasksDate 소스 코드](https://github.com/obsidian-tasks-group/obsidian-tasks/blob/main/src/Scripting/TasksDate.ts)를 참조하여 구현을 살펴볼 수 있습니다.
1. `task.due.toISOString(true)`는 UTC 변환을 방지합니다. [moment 문서](https://momentjs.com/docs/#/displaying/as-iso-string/)를 참조하십시오.
1. `category`는 날짜를 4개의 이름 분류 그룹으로 나눕니다:
    - `과거`
    - `오늘`
    - `미래`
    - `미지정`
    - 그리고 그들은 위에서 나열한 순서대로 1, 2, 3 및 4로 번호가 매겨집니다.
1. `fromNow`는 [현재로부터의 시간](https://momentjs.com/docs/#/displaying/fromnow/)별로 날짜를 그룹화합니다. 예를 들어:
    - `2개월 전`
    - `8일 전`
    - `11시간 후`
    - `5일 후`
    - `3개월 후`
    - `1년 후`
1. `category` 속성은 Tasks 4.9.0에서 추가되었습니다.
1. `fromNow` 속성은 Tasks 4.9.0에서 추가되었습니다.

## 기타 작업 속성에 대한 값

<!-- included text 앞에 빈 줄을 넣어 강제로 공백 줄을 만듭니다. --><!-- include: TaskProperties.test.task_other_fields.approved.md -->

| 필드 | 유형 1 | 예제 1 | 유형 2 | 예제 2 |
| ----- | ----- | ----- | ----- | ----- |
| `task.description` | `string` | `'운동하기 #할 일 #건강'` | `string` | `'간단한 작업'` |
| `task.descriptionWithoutTags` | `string` | `'운동하기'` | `string` | `'간단한 작업'` |
| `task.priorityNumber` | `number` | `2` | `number` | `3` |
| `task.priorityName` | `string` | `'중간'` | `string` | `'보통'` |
| `task.priorityNameGroupText` | `string` | `'%%2%% 중간 중요도'` [^commented] | `string` | `'%%3%% 보통 중요도'` [^commented] |
| `task.urgency` | `number` | `3.3000000000000007` | `number` | `1.9500000000000002` |
| `task.isRecurring` | `boolean` | `true` | `boolean` | `false` |
| `task.recurrenceRule` | `string` | `'매일 반복'` | `string` | `''` |
| `task.tags` | `string[]` | `['#할 일', '#건강']` | `any[]` | `[]` |
| `task.originalMarkdown` | `string` | `'  - [ ] 운동하기 #할 일 #건강 🔼 🔁 매일 반복 ➕ 2023-07-01 🛫 2023-07-02 ⏳ 2023-07-03 📅 2023-07-04 ✅ 2023-07-05 ^dcf64c'` | `string` | `'- [ ] 간단한 작업'` |

<!-- included text 뒤에 빈 줄을 넣어 강제로 공백 줄을 만듭니다. --><!-- endInclude -->

1. `task.description`의 시작과 끝에 있는 공백이 제거됩니다.
1. `task.description`에는 태그도 포함됩니다.
1. `task.priorityNameGroupText` (Tasks 4.9.0에서 추가)는 사용자 정의 그룹 함수에서 우선 순위 이름을 자연스러운 순서로 정렬하는 편리한 방법입니다.
1. `task.isRecurring`:
    - 유효한 재발을 가진 작업인 경우 `true`
    - 유효한 재발을 가지지 않는 경우:
        - 작업에 재발 규칙이 없는 경우
        - 재발 규칙이 유효하지 않은 경우 (예: `🔁 일주일마다`와 같은 경우)
    - `false`입니다.
1. `task.recurrenceRule`은 다음 중 하나입니다:
    - 유효한 재발 규칙이 있는 경우:
        - 재발 규칙의 표준화된 텍스트
        - 예를 들면 `매주 7주마다`
        - 이 텍스트는 프로그래밍 방식으로 생성되고 표준화되며 수동으로 입력된 작업의 텍스트와 정확히 일치하지 않을 수 있습니다.
        - 예를 들어 `🔁 매주 일요일`이 포함된 작업은 `매주 일요일`의 `task.recurrenceRule` 값이 됩니다.
    - 작업에 재발 규칙이 없는 경우 또는 재발 규칙이 유효하지 않은 경우 (`🔁 7주마다`와 같은 경우):
        - 빈 문자열(`''`)입니다.
1. 설정에서 활성화된 [[전역 필터]]가 있고 필터가 태그인 경우, `task.tags`에서 해당 태그가 제거됩니다.

## 파일 속성에 대한 값

<!-- included text 앞에 빈 줄을 넣어 강제로 공백 줄을 만듭니다. --><!-- include: TaskProperties.test.task_file_properties.approved.md -->

| 필드 | 유형 1 | 예제 1 | 유형 2 | 예제 2 |
| ----- | ----- | ----- | ----- | ----- |
| `task.file.path` | `string` | `'some/folder/fileName.md'` | `string` | `''` |
| `task.file.pathWithoutExtension` | `string` | `'some/folder/fileName'` | `string` | `''` |
| `task.file.root` | `string` | `'some/'` | `string` | `'/'` |
| `task.file.folder` | `string` | `'some/folder/'` | `string` | `'/'` |
| `task.file.filename` | `string` | `'fileName.md'` | `string` | `''` |
| `task.file.filenameWithoutExtension` | `string` | `'fileName'` | `string` | `''` |
| `task.hasHeading` | `boolean` | `true` | `boolean` | `false` |
| `task.heading` | `string` | `'내 헤더'` | `null` | `null` |

<!-- included text 뒤에 빈 줄을 넣어 강제로 공백 줄을 만듭니다. --><!-- endInclude -->

1. `task.file`은 `TasksFile` 객체입니다.
1. 현재의 [TasksFile 소스 코드](https://github.com/obsidian-tasks-group/obsidian-tasks/blob/main/src/Scripting/TasksFile.ts)를 확인하여 해당 기능을 탐색할 수 있습니다.
1. `.md` 파일 이름 확장자의 존재는 [[Filters#파일 경로|경로]] 및 [[Filters#파일 이름|파일 이름]]에서의 기존 규칙과 일치하도록 선택되었습니다.
1. `task.file.pathWithoutExtension`은 Tasks 4.8.0에서 추가되었습니다.
1. `task.file.filenameWithoutExtension`은 Tasks 4.8.0에서 추가되었습니다.

[^commented]: `%% ... %%` 주석 내의 텍스트는 화면에서 숨겨집니다. 이는 그룹 제목을 정렬하는 데 사용됩니다.