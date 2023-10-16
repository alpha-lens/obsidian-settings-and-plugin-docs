# 쿼리 설명하기

## 개요: 'explain' 명령어

> [!released]
Tasks 1.19.0에서 도입되었습니다.

`explain` 명령어는 Tasks 블록이 Live Preview 및 Reading 모드에서 볼 때 검색 결과의 시작 부분에 추가 출력을 제공합니다.

이에는 여러 가지 이점이 있습니다:

- 날짜 기반 필터를 이해하기 쉽습니다:
  - 필터 내의 날짜는 확장되어, 실제 검색에 사용된 날짜가 표시됩니다.
- 부울 쿼리 로직이 더욱 명확해집니다.
  - `AND`, `OR`, `NOT` 등을 통한 쿼리 조합이 더욱 명확하게 보여집니다.
- [[Global Filter|전역 필터]]가 활성화된 경우 설명에 포함됩니다.
  - 이를 통해 종종 결과에서 작업이 누락된 이유를 설명할 수 있습니다.
- [[Global Query|전역 쿼리]]가 활성화된 경우 해당 내용도 설명에 포함됩니다.

## 예제

### 필터 내의 날짜가 확장됨

예를 들어, 다음과 같은 텍스트가 tasks query block에 위치한 경우:

<!-- snippet: DocsSamplesForExplain.test.explain_expands_dates.approved.query.text -->
```text
starts after 2 years ago
scheduled after 1 week ago
due before tomorrow
explain
```
<!-- endSnippet -->

결과는 `2022-10-21`일 때 다음과 같이 시작됩니다:

<!-- snippet: DocsSamplesForExplain.test.explain_expands_dates.approved.explanation.text -->
```text
Explanation of this Tasks code block query:

starts after 2 years ago =>
  start date is after 2020-10-21 (Wednesday 21st October 2020) OR no start date

scheduled after 1 week ago =>
  scheduled date is after 2022-10-14 (Friday 14th October 2022)

due before tomorrow =>
   due date is before Saturday, October 22, 2022 
```
<!-- endSnippet -->

검색되는 날짜들이 요일까지 명확하게 표시되는 것을 확인할 수 있습니다.

또한 "starts" 검색은 시작일 없는 작업도 일치한다고 보여줍니다.

### 정규식(Regular Expressions) 설명하기

> [!released]
> Tasks4.3.0에서 도입되었습니다.

예를 들어, 다음과 같은 [[정규식(Regular Expressions)|정규식]]을 tasks query block에 위치한 경우:

<!-- snippet: DocsSamplesForExplain.test.explain_regular_expression.approved.query.text -->
```text
explain
path regex matches /^Root/Sub-Folder/Sample File\.md/i
```
<!-- endSnippet -->

결과는 다음과 같이 시작됩니다:

<!-- snippet: DocsSamplesForExplain.test.explain_regular_expression.approved.explanation.text -->
```text
Explanation of this Tasks code block query:

path regex matches /^Root/Sub-Folder/Sample File\.md/i =>
   using regex : '^Root\/Sub-Folder\/Sample File\.md' with flag 'i'
```
<!-- endSnippet -->

### 부울 조합 표시하기

예를 들어, 다음과 같은 텍스트가 tasks query block에 위치한 경우:

<!-- snippet: DocsSamplesForExplain.test.explain_boolean_combinations.approved.query.text -->
```text
explain 
not done 
(due before tomorrow) AND (is recurring)
```
<!-- endSnippet -->

결과는 `2022년10월21일`일 때 다음과 같이 시작됩니다:

<!-- snippet: DocsSamplesForExplain.test.explain_boolean_combinations.approved.explanation.text -->
```text
Explanation of this Tasks code block query:

not done

(due before tomorrow) AND (is recurring) =>
  AND (All of):
    due date is before 2022-10-22 (Saturday 22nd October 2022)
    is recurring
```
<!-- endSnippet -->

### 더 복잡한 조합이 표시됩니다

복잡한 부울 조합의 경우, 괄호를 잘못 사용하기 쉽습니다. `explain`을 사용하면 해석된 논리가 쉽게 확인할 수 있습니다.

예를 들어, 다음과 같은 텍스트가 tasks query block에 위치한 경우:

<!-- snippet: DocsSamplesForExplain.test.explain_nested_boolean_combinations.approved.query.text -->
```text
explain
( (description includes 1) AND (description includes 2) AND (description includes 3) ) OR ( (description includes 5) AND (description includes 6) AND (description includes 7) ) AND NOT (description includes 7)
```
<!-- endSnippet -->

결과는 `2022-10-21`일 때 다음과 같이 시작됩니다:

<!-- snippet: DocsSamplesForExplain.test.explain_nested_boolean_combinations.approved.explanation.text -->
```text
Explanation of this Tasks code block query:

( (description includes 1) AND (description includes 2) AND (description includes 3) ) OR 
( 
    (
        description includes 5
        ) 
    AND 
    (
        description include s6
        )
    AND 
    (
        description include s7
     )
)
AND NOT (
   description include s7
   )
```
<!-- endSnippet -->

### 전역 쿼리가 표시됩니다

> [!released]
전역 쿼리 설정은 Tasks3.5.0에서 추가되었습니다.

다음 [[전역 쿼리|global query]]와 함께:

<!-- snippet: DocsSamplesForExplain.test.explain_example_global_query.approved.query.text -->
```text
limit 50 
heading includes tasks 
```
<!-- endSnippet -->

다음 텍스트가 tasks query block에 위치한 경우:

<!-- snippet: DocsSamplesForExplain.test.explain_explains_task_block_with_global_query_active.approved.query.text -->
```text
not done 
due next week 
explain 
```
<!-- endSnippet -->

결과는 `2022-10-21`일 때 다음과 같이 시작됩니다:

<!-- snippet: DocsSamplesForExplain.test.explain_explains_task_block_with_global_query_active.approved.explanation.text -->
```text
Explanation of the global query:
heading includes tasks

At most 50 tasks.

Explanation of this Tasks code block query:
not done

due next week =>
due date is between:
2022-10-24(Monday 24th October 2022)
and 
2022-10-30(Sunday 30th October 2022), inclusive.
```
<!-- endSnippet -->

### Placeholder 값이 확장됩니다

> [!released]
> Placeholder는 Tasks4.7.0에서 도입되었습니다.

다음 [[쿼리 속성|Query Properties]]을 [[플레이스홀더|placeholders]]로 가진 다음 쿼리를 파일 `some/sample/file path.md`의 tasks query block에 위치시킬 때:

 <!-- snippet: DocsSamplesForExplain.test.explain_placeholders.approved.query.text -->
 ``` text  
 explain  
 path inc ludes {{query.file.path}}  
 root inclu des {{query.file.root}}  
 folder includ es {{query.file.folder}}  
 filename incl udes {{query.file.filename}}  
 ```
 <!-- endSnippet -->  

결과는 다음과 같이 시작합니다 :

 <!-- snippet: DocsSamplesForEx plain .test .ex plain _placeholders.appr o ved .explanation.tex t -->   
 ``` text   
 Explanation of this Tasks code block qu e ry : 

 path i ncludes some/sample/file p ath.md  

 root i ncludes some/  

 folder in cludes some/sample/  

 filename in cludes file path.md    
 ```
 <!-- en d Snippet -->   

## 설명 결과 스타일링하기

### 기본 스타일

가독성을 위해 설명은 고정폭 글꼴(`PRE` 블록)로 표시되며, 텍스트가 화면 너비보다 넓으면 가로 스크롤바가 나타납니다. 그렇지 않으면 작은 화면 장치에서 설명을 사용할 수 없게 될 것입니다.

### 결과를 사용자 정의하기

Obsidian의 [CSS 스니펫](https://help.obsidian.md/How+to/Add+custom+styles#Use+Themes+and+or+CSS+snippets)을 사용하여 설명 블록의 모양을 변경할 수 있습니다.

예를 들어, [이 CSS 스니펫](https://github.com/obsidian-tasks-group/obsidian-tasks/blob/gh-pages/resources/sample_vaults/Tasks-Demo/.obsidian/snippets/tasks-plugin-explain-text-blue.css)`tasks-plugin-expla in -t ext-blue.css`는 설명 블록의 텍스트를 파란색으로 만듭니다 :

 <!--snippet : resources /sample_vaults/Tasks-Demo/. obsidian /snippets/tasks -plugin-expl ain-text-blue.css-->     
 ```css   
 /* Make the T asks plugin's 'expla in' output stand out in blue */     
.plugin-tasks-query-explanat ion {      
color : var(--color-bl ue);    
}       
 ```
<!-- endSnippet -->
