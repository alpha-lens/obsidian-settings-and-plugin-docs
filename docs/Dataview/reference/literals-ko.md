---
created: 2023-10-14 T19:06
updated: 2023-10-14 T22:39
---
# 리터럴

데이터뷰 쿼리 언어의 *리터럴*은 텍스트(`"Science"`)나 숫자(`2021`)와 같은 상수 값을 나타내는 **표현식**입니다. 이들은 [함수](functions-ko.md) 또는 [비교와 같은 표현식](./expressions-ko.md)의 일부로 사용될 수 있습니다. **리터럴**을 사용하는 몇 가지 [쿼리 예제](../queries/structure-ko.md)는 다음과 같습니다.

~~~
숫자 리터럴 2022를 비교에 사용
```dataview
LIST
WHERE file.day.year = 2022
```

텍스트 리터럴 "Math"를 함수 호출에 사용
```dataview
LIST
WHERE contains(file.name, "Math")
```

링크 리터럴 [[Study MOC]]를 소스로 사용
```dataview
LIST
FROM [[Study MOC]]
```

날짜 리터럴 date(yesterday)를 비교에 사용 
```dataview 
TASK 
WHERE !completed AND file.day = date(yesterday)
```

기간 리터럴 dur(2 days)를 비교에 사용 
```dataview 
LIST 
WHERE end - start > dur(2 days)
```
~~~

!!! summary "리터럴"
    리터럴은 Dataview Query Language (DQL)의 일부로 상수 값을 나타내는 **정적 값**입니다.

다음은 DQL에서 가능한, 하지만 전체적으로 erschöpfende 목록은 아닌 리터럴의 몇 가지 예입니다.

### 일반적인
리터럴|설명
-|-
`0`|숫자 0
`1337`|양수 1337
`-200`| 음수 -200
`"The quick brown fox jumps over the lazy dog"`| 텍스트 (문자열이라고도 함)
`[[Science]]`|"Science"라는 이름의 파일로의 링크
`[[]]`| 현재 파일로의 링크
`[1, 2, 3] ` | 숫자 1, 2 및 3으로 이루어진 목록 
 `[[1,2],[3,4]] ` | 목록 [1,2]와 [3,4]
 `{ a: 1 ,b:2 } ` | 키가 a와 b이고 값이 각각 1과 2인 객체 |
 `date(2021-07-14)` | 날짜 (자세한 내용은 아래 참조) |
 `dur(2 days)` | 기간 (자세한 내용은 아래 참조) |

!!! attention "필드 값으로서 리터럴"
    리터럴은 쿼리 내에서 사용될 때만 이렇게 해석되며 메타 데이터 값으로 사용될 때는 그렇지 않습니다. 필드에 대한 가능한 값 및 해당 데이터 유형에 대해서는 [메타데이터 유형](../annotation/types-of-metadata-ko.md)을 참조하십시오.

### 날짜

[Date ISO 형식의 필드 값](../annotation/types-of-metadata-ko.md#date)을 사용할 때마다 이러한 필드를 날짜 개체와 비교해야 합니다. Dataview는 내일, 현재 주의 시작 등과 같은 일반적인 사용 사례에 대한 약어를 제공합니다. `date()`는 텍스트에서 **함수**로도 호출될 수 있으며 날짜를 추출할 수 있습니다.

리터럴|설명
-|-
`date(2021-11-11)`|날짜, 2021년 11월 11일
`date(2021-09-20T20:17)` | 날짜, 2021년 9월 20일 오후 8시 17분
`date(today)` | 현재 날짜를 나타내는 날짜
`date(now)` | 현재 날짜와 시간을 나타내는 날짜
`date(tomorrow)` | 내일의 날짜를 나타내는 날짜
`date(yesterday)` | 어제의 날짜를 나타내는 날짜
`date(sow)` | 현재 주의 시작을 나타내는 날짜 
`date(eow)` | 현재 주의 끝을 나타내는 날자 
` date(som) `|현재 월의 시작을 나타내는 일자 
 ` date(eom) `|현재 월의 끝을 나타내는 일자 
 ` date(soy) `|현재 연도의 시작을 나타내는 일자 
 ` date(eoy) `|현재 연도의 끝을 나타내는 일자 

### 기간

기간은 시간 간격을 나타냅니다. 직접 [정의](../annotation/types-of-metadata-ko.md#duration)하거나 [날짜 계산](../annotation/types-of-metadata-ko.md#duration)을 통해 생성하여 비교 등에 사용할 수 있습니다.

#### 초
표현|설명
-|-
`dur(1 s)`|1초
`dur(3 s)`|3초
`dur(1 sec)`|1초
`dur(3 secs)`|3초
`dur(1 second)`|1초
`dur(3 seconds)`|3초

#### 분
표현|설명
-|-
`dur(1 m)`|1분
`dur(3 m)`|3분
`dur(1 min)`|1분
`dur(3 mins)`|3분
`dur(1 minute)`|1분 
`dur(3 minutes)` |  3분 

#### 시간 
| 표현 | 설명 |
| - | - |
| `dur(1 h)` | 1시간 |
| `dur(3 h)` | 3시간 |
| `dur(1 hr)` | 1시간 |
| `dur(3 hrs)` | 3시간 |
| `dur(1 hour)` |  1시간 |
| `dur(3 hours)` | 3시간 |

#### 일자 
표현 | 설명  
-|-   
`dur(1 d)`| 하루
`dur(3 d)`| 3일
`dur(1 day)`| 하루
`dur(3 days)`| 3일

#### 주
표현 | 설명 
-|-
`dur(1 w)`|1주일
`dur(3 w)`|3주일
`dur(1 wk)`|1주일
`dur(3 wks)`|3주일
`dur(1 week)`|1주일
`dur(3 weeks)`|3주일

#### 월 
표현 | 설명 
-|- 
`dur(1 mo)`|1개월
`dur(3 mo)`|3개월
`dur(1 month)`|1개월
`dur(3 months)`|3개월

#### 년도 
표현 | 설명  
-|-   
`dur(1 yr)`|1년
`dur(3 yrs)`|3년
`dur(1 year)`|1년
`dur(3 years)`|3년

#### 조합 
표현 | 설명 
-|-   
`dur(1 s, 2 m, 3 h)`|3시간 2분 1초
`dur(1 s 2 m 3 h)`|3시간 2분 1초
`dur(1s 2m 3h)`|3시간 2분 1초
`dur(1second 2min 3h)`|3시간 2분 1초