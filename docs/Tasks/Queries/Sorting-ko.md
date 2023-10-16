---
publish: true
---

# 정렬하기

## 목차

이 페이지는 길어서, 주요 섹션으로 이동하는 링크를 제공합니다:

- [[#기본 사항]]
- [[#작업 상태별로 정렬하기]]
- [[#작업 내 날짜별로 정렬하기]]
- [[#다른 작업 속성별로 정렬하기]]
- [[#파일 속성별로 정렬하기]]
- [[#다중 정렬 기준]]
- [[#노트]]
- [[#역순으로 정렬하기]]
- [[#예시]]

## 기본 사항

기본적으로 Tasks는 작업을 우리가 "긴급성"이라 부르는 계산된 점수에 따라 정렬합니다.

기본값과 다른 쿼리 결과를 원하면, 쿼리에 최소한 하나의 `sort by` 라인을 추가해야 합니다.

## 작업 상태 별로 정렬하기

자체적으로 커스텀화한 상태를 추가하는 등 더 자세한 정보는,  [[Statuses]]를 참조하세요.

### 상태

- `sort by status` (완료 또는 할 일)

### 상태 이름

- `sort by status.name` (완료, 할 일, 취소됨, 진행 중, 알 수 없음, 매우 중요한 사용자 지정 상태 등 - 알파벳 순으로 정렬)

> [!released]
`sort by status.name`은 Tasks 1.23.0에서 도입되었습니다.

### 상태 유형

- `sort by status.type` (`IN_PROGRESS`, `TODO`, `DONE`, `CANCELLED`, 그리고 `NON_TASK` 순서대로 정려됩니다.)

> [!released]
`sort by status.type`은 Tasks 1.23.0에서 도입되었습니다.

## 작업 내 날짜 별로 정렬하기 

### 완료 날짜 

- `sort by done`(작업이 완료된 날짜)

### 마감 날짜 

- `sort by due`(작업의 마감일)

### 예정된 날짜 

 -  `sort by scheduled` (작업이 예정된 날짜)
 
 ### 시작날짜 
 
 - ` sort by start` (작업 시작일)
 
 ### 생성된 날짜 
 
 - ` sort by created` (작업 생성일)
 
 > [!released]
 `sort by created`는 Tasks 2.0.0에서 도입되었습니다.
 
 ### 발생날짜 
 
 - `sort by happens` (시작일, 예정일, 마감일 중 가장 이른 날짜)
 
 > [!released]
 `sort by happens`는 Tasks 1.21.0에서 도입되었습니다.
 
 ## 다른 작업 속성 별로 정렬하기
 
 ### 설명
 
 - `sort by description` (작업 설명)
 
 ### 우선순위 
 
 - ` sort by priority` (작업의 우선순위; "낮음"은 "없음"보다 아래입니다: [[Priority|우선순위]])
 
 ### 긴급성
 
 - `sort by urgency` ([[Urgency|긴급성]])
 
 ### 반복 
 
 - `sort by recurring`(반복 작업이 비반복 작업보다 먼저 정렬됩니다: [[Recurring Tasks]])
 
### 태그

태그가 Tasks 플러그인에서 어떻게 작동하는지에 대한 중요한 정보는 [[Tags]]를 참조하세요.

- `sort by tag` (작업의 설명)

태그로 정렬하려면 기본적으로 설명에서 찾은 첫 번째 태그로 정렬합니다. 그 이후의 태그로 정렬하려면 쿼리 끝에 인덱스를 지정할 수 있습니다. 최적의 정렬을 위해 모든 작업은 동일한 수의 태그를 가져야 하며, 태그는 동일한 순서로 있어야 합니다. 인덱스는 1부터 시작하며, 이것이 기본값입니다.

예를 들어, 이 쿼리는 설명에서 찾은 두 번째 태그로 정렬합니다.

    ```tasks
    sort by tag 2
    ```

> [!released]
태그 정렬은 Tasks 1.6.0에서 도입되었습니다.

## 파일 속성 별로 정렬하기

### 파일 경로

- `sort by path` (작업을 포함하는 파일의 경로)

### 루트

현재 작업을 포함하는 최상위 폴더별로 정렬하는 것은 불가능합니다.

### 폴더

현재 작업을 포함하는 폴더별로 정렬하는 것은 불가능합니다.

### 파일 이름

- `sort by filename` (작업을 포함하는 파일의 이름, 확장자 포함)
  - 같은 파일 이름을 가진 다른 노트들의 작업이 분류될 것임에 주목하세요.

> [!released]
`sort by filename` 은 Tasks 1.21.0에서 도입되었습니다.

### 제목 

- `sort by heading`(작업 앞에 있는 제목; 제목이 없는 파일들이 다른 작업들보다 앞으로 갑니다.)

> [!released]
`sort by heading` 은 Tasks 1.21.0에서 도입되었습니다.


## 다중정령 기준 

여러개의 ' sort by' 쿼리 옵션들을 추가할 수 있고, 각각 별도 줄에 위치해야 합니다.
첫번째 sort가 가장 우선순위가 높습니다.
각 후속 'sort'는 기존의 sorting 내부에서 sort 됩니다.


## 메모 

> [!info]
> 작업이 긴급성이 도입되기 전에 정렬된 방식대로 정렬되길 원한다면, 쿼리에 다음 'sort' 표현을 추가하세요:

    ```tasks
    sort by status
    sort by due
    sort by path
    ```

---

> [!info]
> 설명별로 정렬하는 것은 `[[Links]]`와 `[Links with an|Alias]` (파이프 노트)를 고려해야 합니다.
또한 `*italics*`와 `==highlights==`도 고려해야 합니다.
그것은 미리보기 모드에서 보이는 텍스트로 정렬합니다.

## 역순으로 정렬하기

정렬하고자 하는 속성의 이름 뒤에 `reverse` 키워드를 추가할 수 있습니다.
주어지면, 그 속성에 대한 정렬 순서는 역순이 됩니다.

`reverse`는 전체 결과 세트를 역순으로 할 것임을 주목하세요. 
예를 들어, `sort by done reverse`라고 하고 쿼리 결과가 완료 날짜가 없는 작업을 포함하는 경우, 완료 날짜가 없는 작업들이 먼저 나열됩니다.

## 예시

    ```tasks
    not done
    due today
    sort by due
    ```

    ```tasks
     done 
     sort by done reverse 
     ```
    
     ```tasks 
     not done 
     due before next monday 
     sort by status 
     sort by description reverse 
     sort by path  
      ```