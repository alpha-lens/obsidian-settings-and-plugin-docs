---
publish: true
---

# 필터 결합하기

## 요약

> [!released]
Tasks 1.9.0에서 도입되었습니다.

Tasks에서 제공하는 [[Filters|개별 필터]]는 `(`와 `)`로 감싸서 각각을 묶고, `AND`, `OR`, `NOT`과 같은 부울 연산자로 결합하여 강력한 방식으로 함께 사용할 수 있습니다.

예를 들어:

````text
```tasks
not done
(due after yesterday) AND (due before in two weeks)
(tags include #inbox) OR (path includes Inbox) OR (heading includes Inbox)
```
````

위의 tasks 블록의 3개 줄은 개별 필터를 나타내며, 이러한 3개의 필터 줄에 모두 일치하는 작업만 표시됩니다.

## 구문

하나 이상의 필터를 부울 연산자를 통해 한 줄에 결합하여 새로운 강력하고 유연한 필터를 만들 수 있습니다.

다음 규칙이 적용됩니다:

- 개별 필터는 괄호인 `(`와 `)`로 둘러싸여야 합니다.
- 지원되는 연산자: `AND`, `OR`, `NOT`, `AND NOT`, `OR NOT` 및 `XOR`.
- 연산자는 대소문자를 구분합니다: 대문자여야 합니다.
- 연산자 주위에 공백을 추가해야 합니다.
- 더 많은 괄호인 `( )`를 사용하여 추가적으로 필터들을 중첩시킬 수 있습니다.
- 긴 필터를 여러 줄에 걸쳐 작성하기 위해 마지막에 백슬래시(\\)를 사용할 수 있으며, [[Line Continuations]]에서 설명합니다.
- 한 줄에 결합된 필터의 수나 괄호 중첩 수에는 실질적인 제한이 없습니다.

권장 사항:

- 큰따옴표(`"`)로 필터를 둘러싸도록 할 수도 있지만, 복잡한 쿼리 내에서 중첩되면 잘못된 결과가 나올 수 있으므로 부울 조합을 구축하기 위해 오직 `( )`만 사용하는 것을 권장합니다.
- 두 개 이상의 필터를 결합할 때 의도한 로직이 제대로 작동하도록 하려면 `( )`을 자유롭게 사용하세요. 실행 우선순위' 섹션 참조.

기술적으로 말하면, 각 줄은 암묵적으로 'AND' 관계가 유지됩니다(따라서 완전한 역호환성 유지), 하지만 한 줄에서 여러 개의 '( )'과 함께 'AND', 'OR', 'NOT', 'AND NOT', 'OR NOT' 및 'XOR'와 함께 여러 개의 필터가 포함될 수 있습니다.

### 실행 우선순위

연산자는 다음 순서대로 평가됩니다:

1. NOT
2. XOR
3. AND
4. OR

따라서 다음 두 가지 검색 조건은 정확히 동일합니다 - 두 번째 예제에서 추가적인 괄호 주목:

````text
(tag includes #XX) OR (tag includes #YY) AND (tag includes #ZZ)
````

````text
(tag includes #XX) OR ( (tag includes #YY) AND (tag includes #ZZ) )
````

그리고 다음 두 가지 검색 조건 역시 정확히 동일합니다:

```text
(tag includes #XX) AND (tag includes #YY) OR (tag includes #ZZ)
```

```text
( (tag includes #XX) AND (tag includes #YY) ) OR (tag includes #ZZ)
```

복잡한 검색 조건을 만들 때 의도된 동작이 되도록 확신하기 위해 `( )`을 자주 사용하는 것이 가장 안전합니다.

## 부울 연산자

다음 부울 연산자가 지원됩니다.

### AND

> **모든** 필터 일치 요구 

`AND`와 함께 여러 개의 필터를 결합하면 _모든_ 해당하는 작업만 표시됩니다.

예를 들어, 시작 날짜가 있는 "some" 단어가 포함된 작업을 표시하는 경우 다음과 같이 입력할 수 있습니다:

 ````text 
(has start date) AND(description include some)
 ```

Tasks는 모든 필요한 결과중 일치하지 않으면 해당 결과중 하나라도 맞아야 하기 때문에 위 예제는 아래 예제와 동일합니다:
 
 ``` text 
has start date 
description include some 
 ```

특히, "AND"는 "OR" 및 "NOT"과 함께 사용되었을 때 매우 유용합니다.


**주의**: 대화 형태에서 "`inbox`"가 경로(path)` 안에 있는 파일과 "`#inbox"` 태그가 있는 태스크 모두 보여주세요."라고 요청한다면 보통 양쪽 조건 중 _하나_ 가 충족되어야 하므로 boolean logic 에서 '`or`' 로 나타내야 합니다.


### OR 

> 하나 이상의 맞는 조건을 요구합니다.
> 원문 : Require **any** filter to match

다음과 같이 `OR` 연산자를 사용하여 함께 필터를 결합하면, 해당하는 필터 중 적어도 하나에 일치하는 작업이 표시됩니다.

예를 들어, 경로에 "inbox"가 포함된 파일의 작업과 태스크 라인에 태그 "#inbox"가 있는 작업을 모두 표시하려면 다음과 같이 입력할 수 있습니다:

````text
```tasks
not done
(path includes inbox) OR (description includes #inbox)
```
````

### NOT

> 해당 필터가 일치하지 않아야 함

간단한 예로, 다음 두 가지는 동일합니다:

````text
path does not include inbox
````

````text
NOT (path includes inbox)
````
---

`NOT`은 보다 복잡한 표현식을 부정하는 데 유용합니다.

더 현실적인 예로, 다음의 반대 조건:

````text
(path includes x) OR (description includes #x)
````
...는 다음과 같이 새로운 로직 검사 없이 표현할 수 있습니다:

```text
NOT ( (path includes x) OR (description includes #x) )
```


`(filter a) XOR (filter b) XOR (filter c)`는 세 개의 필터 중 하나만 일치하는 작업 및 **세 개의 필터 모두와 일치하는 작업**을 나타냅니다.

## 예제

### 파일 경로와 태그를 사용하여 작업 관리하기

주간 회의 노트에서 People에 대한 작업이 있고, 그 외의 다른 노트에서는 이름으로 태그를 참조할 수 있습니다:

 ````text 
 ```tasks 
not done 
(path include Peter) OR(tags include #Peter)
 ```
 ```

### 대기 중인 작업 찾기

무언가 기다리고 있는 작업을 찾고 싶지만 'waiting'은 여러 가지 방법으로 맞춰쓰일 수 있습니다:
 `` ` text 
 ```tasks 
not done 
(description include waiting) OR \  \
  (description include waits) OR \  \
  (description include wartet)
 ```
 `` ` 

### 오늘 이외의 날짜에 대한 매일 루틴작성하기
 
# Show all tasks I CAN do in this area:
(tags include #context/loc1) OR \
(tags include #context/loc2) OR \
(tags include #context/loc3)

#### 여러 장소 중 하나에서 

근처 위치 중 아무거나 선택할 수 있습니다:
 ``` text  
# Show all tasks I CAN do in this area:
(tags include #context/loc1 )OR\
( tags incluee# context / loc2 )OR\
( tags incluee# context / loc3 )
 ```

#### 어느 장소에서도 아닌 경우 

특정 지역에서 할 수 없는 _다른_ 모든 할 일을 검토하려면 원래 쿼리 주위에 'NOT'(``) 을 사용하세요. 
 
 ``` text  
# Show all tasks I CANNOT do in this area - EASY WAY:
NOT ((tags includ e context / loc1 )OR\
( tags includ e context / loc2 )OR\
( tags includ e context / loc3 ))
 ```
위와 같은 'NOT' 사용 방법은 나중에 그룹 내부에 새 컨텍스트가 추가되더라도 간단한 검색 및 교체(find-and-replace)만으로 양쪽 task block 에 추가될 수 있다는 점이 좋습니다.
위 코드는 아래 코드보다 유지 관리하기 쉽습니다.

- `includes`를 `does not incluee` 로 변경합니다.
- `OR` 을 `AND` 로 변경합니다. 

 ``` text  
# Show all tasks I CANNOT do in this area - HARDER WAY :
(tags does not incluee context / loc1 )AND\ 
( tags does not incluee context / loc2 )AND\  
( tags does not incluee context / loc3 )
 ```