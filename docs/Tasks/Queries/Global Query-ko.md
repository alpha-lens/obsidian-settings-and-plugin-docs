---
publish: true
---

# Global Query

## 요약

> [!released]
Global Query 설정은 Tasks 3.5.0에 추가되었습니다.

Global Query는 [[Global Filter]]의 강력하고 유연한 대안입니다.

Tasks는 vault의 모든 쿼리 시작 부분에 추가할 설정을 할 수 있습니다.

> [!example]
> Global Query를 `/tasks 포함`으로 설정하면 다음 작업 블록:
>
>     ```tasks
>     tags include work
>     ```
>
> 아래와 같이 실행됩니다:
>
>     ```tasks
>     path includes /tasks
>     tags include work
>     ```

## Global Query 무시하기

특정 Tasks 블록에서 Global Query를 무시해야 하는 경우 블록의 어느 곳에나 `ignore global query` 명령을 추가할 수 있습니다.

예를 들어, 이를 사용하면 기본적으로 특정 폴더에서 작업을 무시하도록 할 수 있습니다. 그리고 몇 가지 검색에서는 해당 폴더의 작업을 검색할 수 있도록 할 수 있습니다.

> [!example]
>
> ```tasks
> tags include work
> ignore global query
> ```

> [!released]
`ignore global query` 명령은 Tasks 4.6.0에 추가되었습니다.

## 예제

현재, 작업 블록에서 허용되는 어떤 쿼리든 Global Query로 작동합니다. 이 기능은 모든 쿼리에 대해 기본적으로 [필터](Filters) 또는 [레이아웃 옵션](Layout)을 적용하는 데 특히 유용합니다.

> [!warning]
> Global Query에서 설정한 필터 또는 레이아웃 옵션을 무시하는 것이 항상 가능한 것은 아닙니다. 이에 대한 여러 문제를 계속 추적하고 있습니다: [issue #1619](https://github.com/obsidian-tasks-group/obsidian-tasks/issues/1619) 및 [issue #1806](https://github.com/obsidian-tasks-group/obsidian-tasks/issues/1806).

### [[Layout]]

> [!example]
> **단축 모드 켜기**
>
>     ```tasks
>     short mode
>     ```

> [!example]
> **우선순위 숨기기**
>
>     ```tasks
>     hide priority
>     ```
>
> > [!info]
> > 이 작업 블록에서 `show priority`를 사용하여 이를 무시할 수 있습니다.

> [!example]
> **최대 50개의 작업 표시**
>
>
>     ```tasks
>     limit 50
>     ```
>
> > [!info]
> > 해당 작업 블록에서 새로운 제한을 지정하여이를 무시할 수 있습니다.

### [[Filters]]

> [!example]
> **특정 제목 아래의 작업만 표시**
>
>     ```tasks
>     heading includes Task
>     ```

> [!example]
> **특정 경로에서 작업 제외**
>
>     ```tasks
>     path regex does not match /^_templates/
>     ```

## 설정

[[Settings|Tasks Options pane]]에서 vault의 global query를 제어하는 다음 설정은 다음과 같습니다.

![글로벌 쿼리 설정의 기본 설정을 보여주는 설정 옵션의 이미지입니다.](../images/settings-global-query.png)

글로벌 쿼리를 변경하면 Obsidian을 다시 시작할 필요는 없지만 열린 쿼리는 새로 고쳐야 할 수 있습니다.
