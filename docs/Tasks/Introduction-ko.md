---
publish: true
---

# Introduction

## 새로운 변경 사항

- X.Y.Z: 🔥 새로운 도움말 페이지 [[알려진 제한 사항]] 추가
- 4.9.0: 🔥 [[Task Properties|작업 속성]] `task.priorityNameGroupText`와 `task.status.typeGroupText` 추가, 예:
  - `group by function task.priorityNameGroupText + ': ' + task.status.typeGroupText`
- 4.9.0: 🔥 [[Task Properties#작업 날짜 속성의 값|작업 날짜 속성]]을 분류하는 데 사용하는 `task.due.category.groupText` 추가, 예:
  - `group by function task.due.category.groupText`
- 4.9.0: 🔥 [지금부터의 시간](https://momentjs.com/docs/#/displaying/fromnow/)별로 날짜를 그룹화하는 [[Task Properties#작업 날짜 속성의 값|작업 날짜 속성]] 추가, 예:
  - `group by function task.due.fromNow.groupText`
- 4.8.0: 🔥 [[Query Properties#쿼리 파일 속성의 값|쿼리 파일 속성]] `query.file.pathWithoutExtension`와 `query.file.filenameWithoutExtension` 추가
- 4.8.0: 🔥 [[Task Properties#파일 속성의 값|작업 파일 속성]] `task.file.pathWithoutExtension`와 `task.file.filenameWithoutExtension` 추가
- 4.7.0: 🔥 쿼리의 파일 경로, 루트, 폴더 및 이름으로 필터링 및 그룹화하기 위해 [[Query Properties]]와 [[Placeholders]] 사용
- 4.6.0: 🔥 [[Filters#날짜 검색 옵션|날짜 검색 옵션]]으로 `이 날 또는 그 전`과 `이 날 또는 그 후` 추가
- 4.6.0: 🔥 [[Filters#날짜 범위 옵션|날짜 범위 검색 옵션]]으로 `이전 또는 그 전`과 `이전 또는 그 후` 추가
- 4.5.0: 🔥 리스트 항목 중 `+` 기호로 시작하는 작업 지원
- 4.4.0: 🔥 사용자 정의 필터 및 그룹에서 [[Expressions#복잡한 표현식|변수, if 문 및 함수]] 지원 추가
- 4.3.0: 🔥 버그 수정, 사용성 개선 및 [[Regular Expressions|정규 표현식]] 검색에 대한 `explain` 지원 추가
- 4.2.0: 🔥 [[Custom Filters|사용자 정의 필터링]] 추가
- 4.1.0: 🔥 [[Layout|태그 숨기기 및 보이기]] 추가
- 4.0.0: 🔥 [[Custom Grouping|사용자 정의 그룹화]] 추가, [[Task Properties|작업 속성]]을 사용하여 [[표현식|표현식]] 생성 - Tasks에서 전체적으로 [[스크립팅에 대해|스크립팅]]의 시작!
- 3.9.0: 🔥 [[Priority#우선 순위와 순서|가장 낮은 및 가장 높은]] 우선 순위 추가
- 3.8.0: 🔥 각 그룹당 작업 수를 제한하는 [[Limiting#각 그룹의 작업 수 제한|작업 제한]] 추가
- 3.8.0: 🔥 새로운 반복 작업의 [[Recurring Tasks#새 작업 순서|순서를 제어]]하는 옵션 추가
- 3.7.0: 🔥 그룹의 [[Grouping#그룹 역순|역순 정렬]] 지원 추가
- 3.6.0: 🔥 [[Grouping#긴급도|긴급도에 따른 그룹화]] 추가
- 3.6.0: 🔥 [[Sorting#반복에 따라 정렬|반복에 따른 정렬]] 추가
- 3.5.0: 🔥 새로운 [[Global Query]] 기능 추가
- 3.4.0: 🔥 [[Backlinks|Backlink]]를 클릭하면 정확한 작업 라인으로 이동
- 3.4.0: Tasks는 최소 Obsidian 1.1.1 이상을 요구합니다.
- 3.3.0: 🔥 다양한 [[About Task Formats|작업 형식]] 지원 - [[Dataview Format]]로 시작합니다.

## 이 사이트에서 탐색

다음은 모든 페이지로 연결되는 주요 페이지 및 섹션입니다:

> [!Info] 탐색
> ### 기본
>
> - [[설치]]
> - [[시작하기에 대해|시작하기 ...]]
>   - [[상태에 대해|상태 ...]]
> - [[쿼리에 대해|쿼리 ...]]
> - [[빠른 참조]]
>
> ### 고급 및 상세
>
> - [[스크립팅에 대해|스크립팅 ...]]
> - [[고급에 대해|고급 ...]]
> - [[다른 플러그인에 대해|다른 플러그인 ...]]
> - [[참조에 대해|참조 ...]]
>   - [[상태 컬렉션에 대해|상태 컬렉션 ...]]
>   - [[작업 형식에 대해|작업 형식 ...]]
>
> ### 도움말
>
> - [[해제에 대해|해제에 대해 ...]]
> - [[지원 및 도움말에 대해|지원 및 도움말에 대해 ...]]
> - [[유용한 링크]]

## Obsidian 지식 베이스를 위한 작업 관리

[Obsidian](https://obsidian.md/) 보루트 전체에서 작업을 추적합니다.
원하는 곳에서 쿼리하고 완료로 표시합니다.
마감일, 반복 작업 (반복), 완료 날짜, 체크리스트 항목의 하위 집합 및 필터링을 지원합니다.

보기 또는 쿼리에서 작업 상태를 전환하면 소스 파일이 업데이트됩니다.

> 버그를 제출하려면 [[버그 보고]]를 사용하세요.
>
> 아이디어를 제출하려면 [기능 요청 양식](https://github.com/obsidian-tasks-group/obsidian-tasks/issues/new?assignees=&labels=type%3A+enhancement&template=feature-request.yaml)을 사용하세요.
>
> 질문이 있으면 [Q&A 토론](https://github.com/obsidian-tasks-group/obsidian-tasks/discussions/categories/q-a)을 통해 도움을 요청하세요. **새 토론**을 클릭하십시오.
>
> 작업에 대한 흥미로운 사용 사례 또는 재미있는 사용 사례를 공유하려면 [Show and Tell Discussions 섹션](https://github.com/obsidian-tasks-group/obsidian-tasks/discussions/categories/show-and-tell)에서 **새 토론**을 클릭하십시오.

각 릴리스의 변경 사항은 [릴리스 페이지](https://github.com/obsidian-tasks-group/obsidian-tasks/releases)를 확인하세요.

## 스크린샷

- *모든 스크린샷은 기본적으로 설정되지 않은 글로벌 필터 `#task`를 가정합니다 (이를 참조하여 "시작하기"도 참조).*
- *테마는 기본 Obsidian 테마입니다.*

![ACME Tasks](images/acme.png)
`ACME` 노트에 일부 작업이 있습니다.

![중요한 프로젝트 작업](images/important_project.png)
`중요한 프로젝트` 노트에도 일부 작업이 있습니다.

![작업 쿼리](images/tasks_queries.png)
`작업` 노트는 글로벌 창고에서 모든 작업을 모아 쿼리를 사용하여 표시합니다.

![만들기 또는 편집 모달](images/modal.png)
`작업: 만들기 또는 편집` 명령은 작업을 편집할 때 도움이됩니다.