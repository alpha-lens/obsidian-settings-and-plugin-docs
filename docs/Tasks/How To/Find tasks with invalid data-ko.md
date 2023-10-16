---
publish: true
---

# 잠재적으로 잘못된 데이터를 가진 작업 찾기

## 동기

성능상의 이유로 Tasks는 일부 사용자가 기대하는 것과 다르게 마크다운 라인에서 데이터를 읽을 때 엄격합니다.

예방 차원에서 주기적으로 보관소의 데이터를 확인하여, seemingly valid한 데이터지만 Tasks에서 찾을 수 없는 작업이 있는지 확인하는 것이 유용할 수 있습니다.

## 잠재적으로 빠진 이모지 식별하기

### 예제 이모지 문제

다음 작업에서는 마감일과 완료일 뒤에 인식되지 않은 텍스트가 있습니다.

```text
- [x] check 📅 2022-12-29 ✅ 2023-01-09 > appointment 19.1.
```

Tasks는 다음과 같은 날짜 지정되지 않은 작업을 본다:

`check 📅 2022-12-29 ✅ 2023-01-09 > appointment 19.1.`

### 읽히지 않은 이모지 식별하기

다음 tasks 블록은 설명에 이모지가 포함된 모든 작업을 나열하며, 일반적으로 Tasks에 의해 해석되지 않은 데이터를 나타냅니다. 일반적으로 줄의 끝에 이모지 표시자와 태그 외에도 텍스트가 있는 경우입니다.

````text
```tasks
# These description instructions need to be all on one line:
(description includes ⏫ ) OR (description includes 🔼 ) OR (description includes 🔽 ) OR (description includes 📅 ) OR (description includes ⏳ ) OR (description includes 🛫 ) OR (description includes ✅ ) OR (description includes 🔁 )

# Optionally, uncomment this line and exclude your templates location
# path does not include _templates

group by path
```
````

오류는 해당 Task를 편집하여 해결할 수 있으며, 해석되지 않은 값이 나타나는 위치보다 앞쪽에 있는 모든 텍스트를 옮기면 됩니다.

## 잘못된 날짜를 가진 작업 찾기

### 예제 날짜 문제

다음 작업에는 잘못된 마감일이 있습니다:

```text
- [ ] Do stuff 📅  2023-12-32
```

### 문제 있는 날짜 식별하기

다음 tasks 블록은 유효하지 않은 날짜가 포함된 모든 작업을 나열합니다. 즉, Tasks에서 해석되어있을 가능성이 없는 데이터입니다.

````text
```tasks
(done date is invalid) OR (due date is invalid) OR (scheduled date is invalid) OR (start date is invalid)

# Optionally, uncomment this line and exclude your templates location
# path does not include _templates

group by path 
``` 
````

유효하지 않은 날짜와 관련된 오류는 [[작성하거나 편집 Task|'작성하거나 편집 Task' Modal]]을 사용하여 쉽게 수정할 수 없으며 원래 값을 보여주기 대신 잘 못된 값들을 placeholder text로 보여줍니다.

따라서 발견한 작업들을 수정하려면 [[Backlinks|backlink]]를 사용하여 원래 줄로 이동하고 오류를 수정하세요.

## 유효하지 않은 반복 규칙 

현재 유효하지 않은 반복 규칙이 있는 모든 작업들을 찾아내는 방법이 현재로서 구현되어있진 않습니다.


## 추가 정보 

관련 문서 섹션:

 - [[Getting Started#Limitations and warnings|Limitations and warnings parsing tasks]]
 - [[Filters#Finding Tasks with Invalid Dates|Finding Tasks with Invalid Dates]].