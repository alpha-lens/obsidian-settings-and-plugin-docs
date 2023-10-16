---
publish: true
---

## 레이아웃 명령

개별 요소를 숨기고 표시할 수 있으며 "hide"와 "show" 명령을 사용하여 해당 요소의 이름을 함께 지정합니다.

다음과 같은 요소가 있습니다.

- `edit button` (편집 버튼)
- `backlink` (역링크)
- `urgency` (긴급도)
- `priority` (우선순위)
- `created date` (작성 날짜)
- `start date` (시작 날짜)
- `scheduled date` (예약 날짜)
- `due date` (마감 날짜)
- `done date` (완료 날짜)
- `recurrence rule` (반복 규칙)
- `tags` (태그)
- `task count` (작업 수)

> [!Info] `hide tags`에 대한 정보
>
> 1. `hide tags`로 인식된 Obsidian에서만 태그가 숨겨집니다.
>     - Tasks는 Obsidian보다 태그를 인식하는 데 있어서 조금 더 관대합니다. 예를 들어, `#123`은 Tasks에서 태그로 처리되며 Tasks의 검색, 정렬 및 그룹화 코드에 포함되므로 숨겨지지 않습니다.
>     - 그러나 `#123`은 Obsidian이 [유효한 태그로 인식하지 않음](https://help.obsidian.md/ko/Editing+and+formatting/Tags#%ED%83%9C%EA%B7%B8+%ED%94%8C%EB%9F%AC%EC%8A%A4) 때문에 숨겨지지 않습니다.
>     - 자세한 정보는 [[태그#태그 인식]]을 참조하십시오.
> 2. 개별 태그를 숨기거나 표시할 수는 없습니다. 이에 대한 내용은 [토론 #848](https://github.com/obsidian-tasks-group/obsidian-tasks/discussions/848)에서 추적 중입니다.

> [!released]
> `urgency`는 Tasks 1.14.0에 도입되었습니다.<br>
> `created date`는 Tasks 2.0.0에 도입되었습니다.<br>
> `tags`는 Tasks 4.1.0에 도입되었습니다.

`urgency`를 제외한 이러한 요소는 기본적으로 표시됩니다. 따라서 이러한 요소 중 어느 것도 표시하지 않으려면 `hide` 명령을 사용하거나 긴급도 점수를 표시하려면 `show` 명령을 사용하면 됩니다.

> [!released]
> `show` 명령은 Tasks 1.14.0에 도입되었습니다.

예:

    ```tasks
    no due date
    path includes GitHub
    hide recurrence rule
    hide task count
    hide backlink
    show urgency
    ```


## 단축 모드

단축 모드에서는 쿼리 결과에 이모지만 표시되고 구체적인 반복 규칙이나 날짜는 표시되지 않습니다.
마우스를 작업 위로 가져가면 툴팁에 규칙과 날짜가 표시됩니다.

명령은 `short mode`입니다.

예:

    ```tasks
    not done
    short mode
    ```
