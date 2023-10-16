---
publish: true
---

# 사용자 정의 상태 설정

## 동기

이 페이지에서는 Tasks 보관소에서 사용하는 상태를 사용자 정의하는 방법을 보여줍니다. `[`와 `]` 사이에 사용할 문자와 기호, 그리고 해당 상태들의 이름을 결정한 후에 설정할 수 있습니다.

### 기본 (내장) 상태

설치된 상태로, Tasks 플러그인은 작업에 대해 두 가지 상태만 지원합니다:

```text
- [ ] 아직 완료되지 않은 TODO 작업입니다.
- [x] 완료된 DONE 작업입니다.
```

- TODO 작업을 클릭하면 DONE으로 변경됩니다.
- DONE 작업을 클릭하면 TODO로 변경됩니다.

### 사용자 정의 상태

많은 사용자가 취소, 위임, 차단 등과 같은 다른 상태를 나타내고 싶어합니다.

> [!released]
사용자 정의 상태는 Tasks 1.23.0에서 소개되었습니다.

Tasks는 이제 설정에서 사용자 정의 상태를 추가하여 작업의 체크박스를 클릭했을 때 다음에 어떤 일이 발생하는지 강력하게 제어할 수 있도록 합니다.

## Task Statuses Settings

Task Statuses 섹션을 처음 볼 때 Tasks 설정에서 보이는 내용입니다:

![초기 Task Statuses 옵션](../images/settings-statuses-initial.png)

[[Status Settings]]에서 자세히 읽어볼 수 있습니다.

## 예제: 우선 순위가 있는 일련의 상태 추가하기

### 목표

중요한 작업들이 다른 모든 것과 구분되도록 하기 위해 서로 순환하는 3개의 상태 집합을 만들고 싶다고 가정해봅시다:

<!-- placeholder to force blank line before included text --><!-- include: DocsSamplesForStatuses.test.DefaultStatuses_important-cycle.approved.md -->

| Status Symbol | Next Status Symbol | Status Name | Status Type | Needs Custom Styling |
| ----- | ----- | ----- | ----- | ----- |
| `!` | `D` | 중요함 - 할 일 (Important - Todo) | `TODO` | Yes |
| `D` | `X` | 중요함 - 진행 중 (Important - In Progress) ㅣ IN_PROGRESS ㅣ Yes |
| `X` ㅣ ! ㅣ 중요함 - 완료됨 (Important - Done) ㅣ DONE ㅣ Yes |

<!-- placeholder to force blank line after included text --><!-- endInclude -->

### 절차

1. Tasks 설정 창 열기
2. 스크롤하여 'Add New Task Status'를 클릭하기
    - 이렇게 하면 새로운 빈 status가 생성됩니다:
    - ![새로운 빈 status 추가 후 설정](../images/settings-custom-statuses-added-1.png)
3. 연필 아이콘(수정 아이콘) 클릭하기
    - 이렇게 하면 [[Editing a Status]](https://github.com/PiotrSss/obsidian-tasks/blob/master/docs/Documentation/Editing%20a%20status.md#editing-a-status-editing-a-status)상세 편집 모달창이 열립니다.
    - 유효하지 않은 값임을 나타내기 위해 붉은색으로 표시됩니다.
    - 어떤 부분이 유효하지 않은지 확실하지 않으면 확인 표시 버튼(체크 마크 버튼)을 클릭하면 몇 초 동안 설명 메시지가 팝업으로 나타납니다.
    - ![상태 수정 모달창](../images/settings-custom-statuses-dialog-1.png)
4. 원하는 값을 입력하세요 (목표 항목에 있는 테이블 참조):
    - ![새로운 status 값을 입력하세요](../images/settings-custom-statuses-dialog-2.png)
5. 확인 표시 버튼(체크 마크 버튼)을 클릭하여 새로운 status를 저장하고 결과를 확인하세요:
   ![새로운 status 값을 저장한 후](../images/settings-custom-statuses-added.png)
6. 목표 항목에 있는 다른 두 개의 status도 반복해서 추가하세요. 그러면 새로운 status 흐름이 잘 반영된 것을 확인할 수 있습니다:
   `[!]` -> `[D]` -> `[X]` -> `[!]`
   ![다른 두 개의 새로운 status 추가 후](../images/settings-custom-statuses-important-loop-added.png)

> [!info]
> 변경된 status는 수정된 태스크와 이후에 열리는 메모에 바로 적용됩니다.
>
> 실험 및 여러분의 스테터스 설정 중일 때 Obsidian 재시작 필요 없으며, 단지 태스크 보관소 내 모든 태스크를 다시 읽으려면 Obsidian 재시작만 필요합니다.(예: 검색 결과 등). 
>
> 만족할 만큼 스테터스 설정한 경우, 모든 태스크와 검색 결과가 올바른 설정값으로 사용되도록 하기 위해 Obsidian 재부팅 권장합니다.


> [!warning]
현재 Tasks는 동일한 기호(symbol)를 가진 여러 개(status 생성 시), 많아야 첫 번째 symbol만 인식하며 나머지 symbol은 무시합니다 . 의심 되신다면 [[Create or edit Task|‘Create or edit Task’ Modal]]의 상태 드롭다운에서 사용 가능한 상태를 확인하세요.

### 새로운 상태 테스트하기

이제 [[Create or edit Task|‘Create or edit Task’ Modal]]을 사용하여 새로운 작업을 생성하고 해당 작업의 상태를 설정할 수 있습니다:

![작업 수정 모달은 즉시 새로운 상태를 보여줍니다](../images/modal-showing-new-statuses.png)

중요한 작업을 생성하세요:

```text
- [!] #task 중요한 일 처리하기
```

읽기 모드로 전환합니다.
그런 다음 위의 작업의 체크박스를 클릭합니다.
다음과 같이 변경됩니다:

```text
- [D] #task 중요한 일 처리하기
```

다시 반복 - 대문자 `X`에 주목하세요:

```text
- [X] #task 중요한 일 처리하기 ✅ 2023-01-09
```

다시 반복합니다:

```text
- [!] #task 중요한 일 처리하기
```

## 더 많은 상태 추가

[[Status Settings#Bulk-adding Statuses|상태 대량 추가]]는 한 번에 여러 개의 상태를 빠르게 추가하는 다양한 방법을 보여줍니다.

## 관련 페이지

<!-- force a blank line --><!-- include: snippet-statuses-overview.md -->

> [!info]
> Statuses(또는 "대체 체크박스")를 이해하고 설정하기 위한 주요 단계:
>
> - Status가 무엇인지 이해하기:
>   - [[Statuses]]
>   - [[Custom Statuses]]
> - 사용자 정의 상태에 대한 스타일링 체계 선택: 이는 사용자 정의 상태의 이름과 기호를 결정합니다:
>   - 일반적인 예시는 [[About Status Collections]]에서 확인할 수 있습니다.
> - 사용자 정의 상태 스타일링 설정하기
>  - [[Style custom statuses|사용자 정의 상태 스타일링 방법]].
>  - Tasks에서 사용자 정의 상태 구성하기
> - 새로운 유연성을 활용하기 위해 작업 검색 업데이트 (선택 사항)
>   - [[Filters#Filters for Task Statuses|Filters for Task Statuses]]

<!-- force a blank line --><!-- endInclude -->
