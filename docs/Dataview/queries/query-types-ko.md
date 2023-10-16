---
created: 2023-10-14 T19:06
updated: 2023-10-14 T22:29
---
# 쿼리 유형(Query Types)

**쿼리 유형(Query Type)**은 dataview 쿼리의 출력 형식을 결정합니다. dataview 쿼리에 지정하는 **첫 번째이자 유일한 필수 사항**입니다. `LIST`, `TABLE`, `TASK`, `CALENDAR` 네 가지 옵션이 있습니다.

쿼리 유형은 또한 쿼리가 실행되는 **정보 수준(information level)**을 결정합니다. `LIST`, `TABLE`, `CALENDAR`는 **페이지 수준(page level)**에서 작동하며, `TASK` 쿼리는 `file.tasks` 수준에서 작동합니다. 이에 대해서는 "TASK" 쿼리 유형에서 자세히 설명하겠습니다.

모든 Query Type은 사용 가능한 모든 [데이터 명령어(Data Commands)](data-commands-ko.md)와 조합하여 결과 집합을 정제할 수 있습니다. Query Types와 Data Commands 간의 상호작용에 대해서는 [Dataview 사용 방법](../index-ko.md#how-to-use-dataview) 및 [구조 페이지(structure)](structure-ko.md)를 참조하세요.

!!! summary "쿼리 유형"
    쿼리 유형은 쿼리의 출력 형식을 결정합니다. 이것은 쿼리에 대한 유일한 필수 정보입니다.

## LIST

`LIST` 쿼리는 파일 링크 또는 그룹 이름(그룹화된 경우)으로 구성된 글머리 기호 목록을 출력합니다. 파일 또는 그룹 정보와 함께 **추가 정보를 하나** 지정할 수 있습니다.

!!! summary "쿼리 유형 `LIST`"
    `LIST`는 각 결과에 대해 한 가지 추가 정보를 표시하는 글머리 기호 목록을 출력합니다.

가장 간단한 LIST 쿼리는 볼트의 모든 파일을 글머리 기호 목록으로 출력합니다:

~~~
```dataview 
LIST
```
~~~

**결과**

- [Classic Cheesecake](#)
- [Git Basics](#)
- [How to fix Git Cheatsheet](#)
- [League of Legends](#)
- [Pillars of Eternity 2](#)
- [Stardew Valley](#)
- [Dashboard](#)


그러나, 물론 원하는 페이지만 나열하도록하기 위해 [데이터 명령어(Data Commands)](data-commands-ko.md)를 사용할 수 있습니다:

~~~
```dataview
LIST 
FROM #games/mobas OR #games/crpg
```
~~~

**결과**

- [League of Legends](#)
- [Pillars of Eternity 2](#)

### 추가 정보 표시

쿼리에 **추가 정보**를 추가하려면, `LIST` 명령어 바로 다음에 추가 정보를 지정하고, 가능한 데이터 명령어 앞에 위치시킵니다:

~~~
```dataview 
LIST file.folder
```
~~~

**결과**

- [Classic Cheesecake](#): Baking/Recipes
- [Git Basics](#): Coding
- [How to fix Git Cheatsheet](#): Coding/Cheatsheets
- [League of Legends](#): Games
- [Pillars of Eternity 2](#): Games
- [Stardew Valley](#): Games/finished
- [Dashboard](#):

추가 정보는 하나만 추가할 수 있으며, 여러 개를 추가할 수는 없습니다. 그러나 단순한 메타데이터 필드 대신 계산된 값(computed value)을 지정하여 여러 필드의 정보를 포함시킬 수 있습니다:

~~~
```dataview 
LIST "File Path: " + file.folder + " _(created: " + file.cday + ")_"
FROM "Games"
```
~~~

**결과**

- [League of Legends](#): File Path: Games _(created: May 13, 2021)_
- [Pillars of Eternity 2](#): File Path: Games _(created: Februrary 02, 2022)_
- [Stardew Valley](#): File Path: Games/finished _(created: April 04, 2021)_

### 그룹화

**그룹화된 목록**은 기본적으로 그룹 키만 표시합니다.

~~~
```dataview 
LIST
GROUP BY type
```
~~~

**결과**

- game
- knowledge
- moc
- recipe

그룹화된 `LIST` 쿼리에서 일반적으로 하는 작업은 추가 정보로 파일 링크를 출력하는 것입니다. 이를 위해 추가 정보로 파일 링크를 지정합니다:

~~~
```dataview 
LIST rows.file.link
GROUP BY type
```
~~~

**결과**

- game:
    - [Stardew Valley](#)
    - [League of Legends](#)
    - [Pillars of Eternity 2](#)
- knowledge:
    - [Git Basics](#)
- moc:
    - [Dashboard](#)
- recipe:
    - [Classic Cheesecake](#)

### LIST WITHOUT ID

파일 이름이나 그룹 키가 목록 뷰에 포함되지 않도록 하려면 `LIST WITHOUT ID`를 사용할 수 있습니다. `LIST WITHOUT ID`는 `LIST`와 동일하게 작동하지만, 추가 정보가 있는 경우 파일 링크나 그룹 이름을 출력하지 않습니다.

~~~
```dataview
LIST WITHOUT ID
```
~~~

**결과**

- [Classic Cheesecake](#)
- [Git Basics](#)
- [How to fix Git Cheatsheet](#)
- [League of Legends](#)
- [Pillars of Eternity 2](#)
- [Stardew Valley](#)
- [Dashboard](#)

`LIST WITHOUT ID`는 추가 정보가 없기 때문에 `LIST`와 동일합니다!

~~~
```dataview
LIST WITHOUT ID type
```
~~~

**Output**

| moc (1) | recipe (1) | summary (1) | knowledge (1) | game (3) |
| --- | --- | --- | --- | --- |
| 1 pages of type moc  | 	1 pages of type recipe	| 1 pages of type summary	| 1 pages of type knowledge	| 3 pages of type game |

## TABLE

`TABLE` 쿼리 유형은 페이지 데이터를 표 형식으로 출력합니다. `TABLE` 쿼리에는 **쉼표로 구분된 목록**으로 추가 메타데이터 필드를 지정하여 `TABLE` 쿼리에 제공할 수 있습니다. 열로 사용할 수 있는 것은 일반적인 메타데이터 필드 뿐만 아니라 **계산 결과**도 지정할 수 있습니다. 선택적으로, `AS <header>` 구문을 사용하여 **테이블 헤더**를 지정할 수도 있습니다. 다른 모든 쿼리 유형과 마찬가지로 [데이터 명령어(Data Commands)](data-commands-ko.md)를 사용하여 쿼리의 결과 집합을 정제할 수 있습니다.

!!! summary "`TABLE` Query Type"
    `TABLE` 쿼리는 하나 이상의 메타데이터 값 또는 계산 결과의 표 형태 뷰를 생성합니다. `AS <header>`를 통해 열 제목을 지정하는 것이 가능합니다.

~~~
```dataview
TABLE
```
~~~

**결과**

| File (7) |
| ----- |
| [Classic Cheesecake](#) |
| [Git Basics](#) |
| [How to fix Git Cheatsheet](#) |
| [League of Legends](#) |
| [Pillars of Eternity 2](#) |
| [Stardew Valley](#) |
| [Dashboard](#) |

!!! hint "첫 번째 열 제목 변경"
    첫 번째 열 제목을 변경하려면 (기본적으로 "File" 또는 "Group") Dataview 설정에서 Table Settings -> Primary Column Name / Group Column Name으로 이동하세요.
    특정 `TABLE` 쿼리에만 이름을 변경하려면 `TABLE WITHOUT ID`를 참조하세요.

!!! info "결과 개수 비활성화"
    첫 번째 열은 항상 결과 개수를 표시합니다. 만약 표시하지 않으려면 Dataview 설정에서 비활성화할 수 있습니다. ("Display result count", 0.5.52 이후 사용 가능)

물론, `TABLE`은 하나 이상의 추가 정보를 지정하는 데 사용됩니다:

~~~
```dataview
TABLE started, file.folder, file.etags
FROM #games
```
~~~

**결과**

| File (3) | started | file.folder | file.etags | 
| --- | --- | --- | --- |
| [League of Legends](#)  | 	May 16, 2021 | 	Games	 | - #games/moba  | 
| [Pillars of Eternity 2](#)  | 	April 21, 2022 | 	Games	 | - #games/crpg | 
| [Stardew Valley](#) | 	April 04, 2021 | 	Games/finished	 |  - #games/simulation | 

!!! hint "암묵적 필드"
    `file.folder`와 `file.etags`에 대해 궁금하신가요? [페이지의 암묵적 필드](../annotation/metadata-pages-ko.md)에 대해 더 알아보세요.

### 사용자 정의 열 제목

`AS` 구문을 사용하여 열에 대한 **사용자 정의 제목**을 지정할 수 있습니다:

~~~
```dataview
TABLE started, file.folder AS Path, file.etags AS "File Tags"
FROM #games
```
~~~

**결과**

| File (3) | started | Path | File Tags |
| --- | --- | --- | --- |
| [League of Legends](#) 	| May 16, 2021	| Games	| - #games/moba |
| [Pillars of Eternity 2](#)	| April 21, 2022	| Games	|- #games/crpg |
| [Stardew Valley](#) 	  	| April 04, 2021

!!! info "공백이 있는 사용자 정의 제목"
    `File Tags`와 같은 공백이 있는 사용자 정의 제목을 사용하려면 이중 따옴표로 감싸야 합니다: `"File Tags"`.

특히 **계산 또는 표현식을 열 값으로 사용**하려는 경우 유용합니다:

~~~
```dataview
TABLE 
default(finished, date(today)) - started AS "Played for", 
file.folder AS Path, 
file.etags AS "File Tags"
FROM #games
```
~~~

**결과**

| File (3) | Played for | Path | File Tags |
| --- | --- | --- | --- |
| [League of Legends](#) 	| 1 years, 6 months, 1 weeks	| Games	| - #games/moba |
| [Pillars of Eternity 2](#)	| 7 months, 2 days  | Games | - #games/crpg |
| [Stardew Valley](#) 	| 4 months, 3 weeks, 3 days	| Games/finished	|- #games/simulation |

!!! hint "계산 및 표현식"
    표현식과 계산을 수행하는 기능에 대해서는 [표현식(expressions)](../reference/expressions-ko.md) 및 [함수(functions)](../reference/functions-ko.md)를 참조하세요.

### TABLE WITHOUT ID

첫 번째 열("File" 또는 기본적으로 "Group")을 출력하지 않으려면 `TABLE WITHOUT ID`를 사용할 수 있습니다. `TABLE WITHOUT ID`는 `TABLE`과 동일하게 작동하지만 추가 정보가 있는 경우 파일 링크나 그룹 이름을 첫 번째 열로 출력하지 않습니다.

예를 들어, 다른 식별 값을 출력하려는 경우에 사용할 수 있습니다:

~~~
```dataview
TABLE WITHOUT ID
steamid,
file.etags AS "File Tags"
FROM #games
```
~~~

**결과**

| steamid (3)  | File Tags |
| --- | --- |
| 560130 | - #games/crog |
| -       | - #games/moba   |
| 413150   |- #games/simulation |

또한, 특정 쿼리에서 첫 번째 열의 이름을 변경하려면 `TABLE WITHOUT ID`를 사용할 수도 있습니다.

~~~
```dataview
TABLE WITHOUT ID
file.link AS "게임",
file.etags AS "파일 태그"
FROM #games
```
~~~

**결과**

| 게임 (3) | 파일 태그 |
| --- | --- |
| [League of Legends](#) |  - #games/moba  | 
| [Pillars of Eternity 2](#)  | - #games/crpg | 
| [Stardew Valley](#) |  - #games/simulation |

!!! info "일반적으로 첫 번째 열 이름 변경하기"
    모든 경우에 첫 번째 열 이름을 변경하려면 Table Settings에서 이름을 변경하세요.

## TASK

`TASK` 쿼리는 주어진 [데이터 명령어(Data Commands)](data-commands-ko.md)(있는 경우)와 일치하는 **보드 내 모든 작업의 대화형 목록**을 출력합니다. `TASK` 쿼리는 다른 쿼리 유형과 비교하여 특별합니다. 왜냐하면 `TASK` 쿼리는 페이지가 아닌 **작업 자체를 결과로 제공**하기 때문입니다. 이것은 모든 [데이터 명령어(Data Commands)](data-commands-ko.md)가 작업 수준에서 실행되고, 작업 자체에 지정된 상태나 메타 데이터와 같은 세부 정보를 기반으로 작업을 세밀하게 필터링할 수 있게 합니다.

또한, `TASK` 쿼리는 DQL을 통해 파일을 **조작하는 유일한 방법**입니다. 일반적으로 Dataview는 파일의 내용에는 영향을 주지 않습니다. 그러나 Dataview 쿼리를 통해 작업을 확인하면 원본 파일에서도 작업이 **확인 처리**됩니다. Dataview 설정의 "Task Settings"에서 Dataview 블록 내에서 작업을 확인할 때 자동으로 `completion` 메타 데이터 필드를 설정하도록 선택할 수 있습니다. 다만, 이 기능은 Dataview 블록 내에서 작업을 확인하는 경우에만 동작합니다.

!!! summary "`TASK` Query Type"
    `TASK` 쿼리는 보드 내 모든 작업의 대화형 목록을 출력합니다. `TASK` 쿼리는 페이지 수준이 아닌 **작업 수준**에서 실행되며, 작업별로 세부적인 필터링이 가능합니다. 이것은 Dataview 중 유일하게 원본 파일에 변경 사항이 반영되는 명령어입니다.

~~~
```dataview
TASK
```
~~~

**결과**

- [ ] 신발 구매하기 #쇼핑
- [ ] 훈련 일정에 대해 폴에 메일 보내기
- [ ] 수학 과제 완료하기
    - [x] 논문 1 완료하기 [due:: 2022-08-13]
    - [ ] 장 3 다시 읽기 [due:: 2022-09-01]
    - [x] 치트시트 작성하기 [due:: 2022-08-02]
    - [ ] 장 1부터 4까지 요약 작성하기 [due:: 2022-09-12]
- [x] 물리학 과제 제출하기
- [ ] 엄마를 위해 새 베개 구매하기 #쇼핑
- [x] 작동하는 연필 구매하기 #쇼핑

다른 쿼리 유형과 마찬가지로 `TASK` 쿼리에서도 데이터 명령어를 사용할 수 있습니다. 데이터 명령어는 작업 수준에서 실행되므로, 작업 자체에 대한 암묵적 필드([tasks의 메타데이터](../annotation/metadata-tasks-ko.md))를 직접 사용할 수 있습니다.

~~~
```dataview
TASK
WHERE !completed AND contains(tags, "#shopping")
```
~~~

**결과**

- [ ] 신발 구매하기 #쇼핑 
- [ ] 엄마를 위해 새 베개 구매하기 #쇼핑 

작업을 그룹화하는 일반적인 사용 사례는 **작업이 생성된 파일별로 작업을 그룹화**하는 것입니다.

~~~
```dataview
TASK
WHERE !completed
GROUP BY file.link
```
~~~

**결과**

[2022-07-30](#) (1)

- [ ] 수학 과제 완료하기
    - [ ] 3장 다시 읽기
    - [ ] 1장부터 4장까지 요약 작성하기

[2022-09-21](#) (2)

- [ ] 신발 구매하기 #쇼핑 
- [ ] 훈련 일정에 대해 폴에 메일 보내기

[2022-09-27](#) (1)

- [ ] 엄마를 위해 새 베개 구매하기 #쇼핑

!!! hint "하위 작업 수 세기"
    `2022년 07-30`의 헤더에 있는 (1)을 눈치채셨나요? 하위 작업은 해당 부모 작업에 속하며 별도로 세어지지 않습니다. 또한, 필터링에 따라 동작이 다르게 처리됩니다.

### 하위 작업

들여쓰기된 탭 아래에 비들여쓰기된 작업이 있는 경우 해당 작업은 **하위 작업(child task)**로 간주됩니다.

- [ ] 집 청소하기
	- [ ] 부엌 청소하기
	- [x] 거실 정리하기
	- [ ] 침실 정리하기


!!! info "글머리 기호 항목의 하위 항목"
    글머리 기호 항목 아래의 들여쓰기된 작업은 엄밀히 말해 하위 작업이지만, 대부분의 경우 Dataview는 이를 일반적인 작업으로 처리합니다.

하위 작업은 **부모에 속합니다**. 즉, 만약 당신이 작업을 쿼리하는 경우, 자식 작업도 부모와 함께 결과 집합으로 반환됩니다.

~~~
```dataview
TASK
WHERE !completed
```
~~~

**결과**

- [ ] 집 청소하기
	- [ ] 부엌 청소하기
	- [x] 거실 정리하기
	- [ ] 침실 정리하기
- [ ] 차에 대해 보험에 전화하기

여기서 `거실 정리하기`는 쿼리와 일치하지 않지만, 부모인 `집 청소하기`는 일치하므로 포함됩니다.

부모는 일치하지 않지만 자식이 조건을 만족하는 경우 개별적인 하위 작업이 반환됩니다:

~~~
```dataview
TASK
WHERE urgent
```
~~~

**결과**

- [ ] 침실 정리하기 [urgent:: true]

## CALENDAR

`CALENDAR` 쿼리는 매월 기준의 달력을 출력하며, 각 결과는 해당 날짜를 가리키는 점으로 표시됩니다. `CALENDAR` 쿼리 유형은 추가 정보가 필요합니다. 이 추가 정보는 모든 쿼리된 페이지에 있는 [날짜](../annotation/types-of-metadata-ko.md#date)(또는 미설정)여야 합니다.

!!! summary "`CALENDAR` Query Type"
    `CALENDAR` 쿼리 유형은 주어진 메타 데이터 필드 날짜에 대한 점으로 표시되는 달력 보기를 생성합니다.

~~~
```dataview
CALENDAR file.ctime
```
~~~

**결과**

![](../assets/calendar_query_type.png)

`SORT`와 `GROUP BY`를 `CALENDAR`와 함께 사용할 수 있지만, **효과가 없습니다**. 또한, 주어진 메타 데이터 필드에 유효한 [날짜](../annotation/types-of-metadata-ko.md#date) 이외의 값이 포함되어 있으면 달력 쿼리는 렌더링되지 않습니다(필드는 비어 있을 수 있음). 유효한 페이지만 고려하려면 유효한 메타 데이터 값을 필터링할 수 있습니다:

~~~
```dataview
CALENDAR due
WHERE typeof(due) = "date"
```
~~~