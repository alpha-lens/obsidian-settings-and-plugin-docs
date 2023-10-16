---
created: 2023-10-14 T19:06
updated: 2023-10-14 T21:49
---
# 함수

Dataview 함수는 데이터를 조작하는 더 고급스러운 방법을 제공합니다. **[데이터 명령어](../queries/data-commands-ko.md)**(FROM을 제외한)에서 함수를 사용하여 필터링하거나 그룹화하거나, TABLE 열 또는 LIST 쿼리의 추가 출력과 같이 **[추가 정보](../queries/query-types-ko.md)**로 사용할 수 있습니다.

## 함수 작동 방식

함수는 [표현식](expressions-ko.md)의 다른 형태이며, 표현식을 사용할 수 있는 모든 곳에서 사용할 수 있습니다. 함수는 항상 새로운 값을 반환하며 다음 형식을 따릅니다.

```
functionname(parameter1, parameter2)
```

파라미터는 다시 [표현식](expressions-ko.md)이며, 리터럴, 메타데이터 필드 또는 다른 함수를 파라미터로 사용할 수 있습니다. 각 페이지에 대한 데이터 유형은 해당 페이지의 문서에 자세히 설명되어 있습니다. 괄호 내부의 정보에 주목하세요. 대괄호 내에 있는 매개변수인 `[display]`와 같은 것은 *선택적*이고 생략 가능함을 의미합니다. 각 함수의 기본 동작에 대해 자세히 알아보세요.

## 값 목록에서 함수 호출하기

대부분의 함수는 단일 값(예: `number`, `string`, `date` 등) 또는 해당 값의 목록에 적용할 수 있습니다. 함수가 목록에 적용되면 목록의 각 요소에 함수가 적용된 후 목록을 반환합니다. 예를 들어:

```js
lower("YES") = "yes"
lower(["YES", "NO"]) = ["yes", "no"]

replace("yes", "e", "a") = "yas"
replace(["yes", "ree"], "e", "a") = ["yas", "raa"]
```

이러한 일종의 **"함수 벡터화"**는 다음 정의에서 명시적으로 언급되지 않으며, 암묵적으로 다양한 기능 범위에서 사용할 수 있습니다.

## 생성자

값을 생성하는 생성자입니다.

### `object(key1, value1, ...)`

주어진 키와 값을 가진 새로운 객체를 생성합니다. 호출 시 키와 값은 번갈아 사용되어야 하며, 키는 항상 문자열/텍스트여야 합니다.

```js
object() => 빈 객체
object("a", 6) => a를 6에 매핑하는 객체
object("a", 4, "c", "yes") => a를 4에 매핑하고 c를 'yes'에 매핑하는 객체
```

### `list(value1, value2, ...)`

주어진 값을 가진 새로운 리스트를 생성합니다.

```js
list() => 빈 리스트
list(1, 2, 3) => 1, 2, 3을 포함하는 리스트
list("a", "b", "c") => "a", "b", "c"를 포함하는 리스트
```

### `date(any)`

제공된 문자열, 날짜 또는 링크 객체에서 날짜를 파싱할 수 있는 경우 해당 날짜를 반환하고 그렇지 않으면 null을 반환합니다.

```js
date("2020-04-18") = <2020년 4월 18일을 나타내는 date 객체>
date([[2021-04-16]]) = <주어진 페이지에 대한 date 객체로 file.day을 참조합니다.>
```

### `date(text, format)`

텍스트에서 지정된 형식의 luxon `DateTime`으로 날짜를 파싱합니다. 로캘화된 형식은 작동하지 않을 수 있습니다.
[Luxon 토큰](https://moment.github.io/luxon/#/formatting?id=table-of-tokens)을 사용합니다.

```js
date("12/31/2022", "MM/dd/yyyy") => 2022년 12월 31일에 대한 DateTime
date("210313", "yyMMdd") => DateTime(2021년 3월13일)
date("946778645000", "x") => DateTime(2000-01-02T03:04:05)
```

### `dur(any)`

주어진 문자열이나 기간에서 기간을 파싱하여 실패 시 null을 반환합니다.

```js
dur(8 minutes) = <8분>
dur("8 minutes, 4 seconds") = <8분 4초>
dur(dur(8 minutes)) = dur(8 minutes) = <8분>
```

### `number(string)`

주어진 문자열에서 첫 번째 숫자를 추출하여 가능한 경우 반환합니다. 문자열에 숫자가 없으면 null을 반환합니다.

```js
number("18 years") = 18
number(34) = 34
number("hmm") = null
```

### `string(any)`

임의의 값을 "합리적인" 문자열 표현으로 변환합니다. 이는 때로는 직접 쿼리에서 값을 사용하는 것보다 예쁘지 않은 결과를 생성할 수 있으며, 주로 날짜, 기간, 숫자 등을 문자열로 변환하여 조작하는 데 유용합니다.

```js
string(18) = "18"
string(dur(8 hours)) = "8 hours"
string(date(2021-08-15)) = "August 15th, 2021"
```

### `link(path, [display])`

주어진 파일 경로 또는 이름에서 링크 객체를 생성합니다. 두 개의 인수가 제공된 경우 두 번째 인수는 링크의 표시 이름입니다.

```js
link("Hello") => 'Hello'라는 이름의 페이지에 대한 링크
link("Hello", "Goodbye") => 'Hello'라는 이름의 페이지에 대한 링크이며 'Goodbye'로 표시됩니다.
```

### `embed(link, [embed?])`

링크 객체를 임베디드 링크로 변환합니다. Dataview 뷰에서 임베디드 링크는 지원이 제한적일 수 있지만 이미지의 임베딩은 작동해야 합니다.

```js
embed(link("Hello.png")) => "Hello.png" 이미지에 대한 임베디드 링크로 실제 이미지로 렌더링됩니다.
```

### `elink(url, [display])`

외부 URL(예: `www.google.com`)에 대한 링크를 생성합니다. 두 개의 인수가 제공된 경우 두 번째 인수는 링크의 표시 이름입니다.

```js
elink("www.google.com") => google.com으로 연결되는 링크 요소
elink("www.google.com", "Google") => google.com으로 연결되는 링크 요소이며 "Google"로 표시됩니다.
```

### `typeof(any)`

객체의 유형을 검사하기 위해 사용됩니다. 다른 연산자와 함께 사용하여 유형에 따라 동작을 변경할 수 있습니다.

```js
typeof(8) => "number"
typeof("text") => "string"
typeof([1, 2, 3]) => "array"
typeof({ a: 1, b: 2 }) => "object"
typeof(date(2020-01-01)) => "date"
typeof(dur(8 minutes)) => "duration"
```

---

## 숫자 연산

### `round(number, [digits])`

숫자를 지정된 소수 자릿수로 반올림합니다. 두 번째 인수가 지정되지 않은 경우 가장 가까운 정수로 반올림하고, 그렇지 않으면 지정된 소수 자릿수로 반올림합니다.

```js
round(16.555555) = 7
round(16.555555, 2) = 16.56
```

### `trunc(number)`

숫자의 소수점을 잘라내고 정수 부분만 반환합니다.

```js
trunc(12.937) = 12
trunc(-93.33333) = -93
trunc(-0.837764) = 0
```

### `floor(number)`

항상 내림하여 주어진 숫자보다 작거나 같은 가장 큰 정수를 반환합니다.
이는 음의 숫자가 더욱 음의 값을 갖게 합니다.

```js
floor(12.937) = 12
floor(-93.33333) = -94
floor(-0.837764) = -1
```

### `ceil(number)`

항상 올림하여 주어진 숫자보다 크거나 같은 가장 작은 정수를 반환합니다.
이는 음의 숫자가 더욱 양의 값을 갖게 합니다.

```js
ceil(12.937) = 13
ceil(-93.33333) = -93 
ceil(-0.837764)= 0 
```

### `min(a, b, ..)`

인수 목록 또는 배열에서 최소값을 계산합니다.

```js
min(1, 2, 3) = 1
min([1, 2, 3]) = 1

min("a", "ab", "abc") = "a"
```

### `max(a, b, ...)`

인수 목록 또는 배열에서 최대값을 계산합니다.

```js
max(1, 2, 3) = 3
max([1, 2, 3]) = 3

max("a", "ab", "abc") = "abc"
```

### `sum(array)`

배열의 모든 숫자 값을 합산합니다. 평균에 null 값이 포함되어 있는 경우 `nonnull` 함수를 사용하여 제거할 수 있습니다.

```js
sum([1, 2, 3]) = 6
sum([]) = null

sum(nonnull([null, 1 ,8])) =9 
```

### `product(array)`

숫자 목록의 곱을 계산합니다. 평균에 null 값이 포함되어 있는 경우 `nonnull` 함수를 사용하여 제거할 수 있습니다.

```js
product([1 ,2 ,3 ]) =6 
product([])= null 

product(nonnull([null ,1 ,2 ,4 ]))=8 
```
 
### `average(array)`
숫자 값의 숫자 평균을 계산합니다. 평균에 null 값이 포함되어 있는 경우 `nonnull` 함수를 사용하여 제거할 수 있습니다.
 ``` js  
average ([1 ,2 ,3 ]) =2 
average([])= null 

average(nonnull([null ,1 ,2 ]))=1.5
```
### `minby(array, function)`

제공된 함수를 사용하여 배열의 최소값을 계산합니다.

```js
minby([1, 2, 3], (k) => k) = 1
minby([1, 2, 3], (k) => 0 - k) => 3

minby(this.file.tasks, (k) => k.due) => 가장 이른 마감일
```

### `maxby(array, function)`

제공된 함수를 사용하여 배열의 최대값을 계산합니다.

```js
maxby([1, 2, 3], (k) => k) = 3
maxby([1, 2, 3], (k) => 0 - k) => 1

maxby(this.file.tasks, (k) => k.due)=> 가장 늦은 마감일 
```

--

## 객체, 배열 및 문자열 연산

컨테이너 객체 내부의 값을 조작하는 연산입니다.

### `contains()` 및 관련 함수

간단한 요약을 위해 몇 가지 예시를 제공합니다.

```js
contains("Hello", "Lo") = false
contains("Hello", "lo") = true

icontains("Hello", "Lo") = true
icontains("Hello", "lo") = true

econtains("Hello", "Lo") = false
econtains("Hello", "lo") = true
econtains(["this","is","example"], "ex") = false
econtains(["this","is","example"], "is") = true
```

#### `contains(object|list|string, value)`

주어진 컨테이너 유형에 주어진 값이 있는지 확인합니다. 첫 번째 인수가 객체, 리스트 또는 문자열인지에 따라 이 함수는 약간 다른 방식으로 작동합니다.
이 함수는 대소문자를 구분합니다.

- 객체의 경우, 주어진 이름과 일치하는 키가 있는지 확인합니다. 예:
    ```
    contains(file, "ctime") = true
    contains(file, "day") = true (file의 제목에 날짜가 포함되어 있으면 참, 그렇지 않으면 거짓)
    ```
- 리스트의 경우, 배열 요소 중 어느 하나가 주어진 값과 같은지 확인합니다. 예:
    ```
    contains(list(1, 2, 3), 3) = true
    contains(list(), 1) = false
    ```
- 문자열의 경우, 주어진 값이 문자열 내에 부분 문자열(즉, 내부)인지 확인합니다.
    ```
    contains("hello", "lo") = true
    contains("yes", "no") = false
    ```

#### `icontains(object|list|string, value)`

대소문자를 구분하지 않는 `contains()`의 버전입니다.

#### `econtains(object|list|string, value)`

"정확한 포함"은 문자열/리스트에서 정확한 일치가 있는지 확인합니다.
이 함수는 대소문자를 구분합니다.

- 문자열의 경우 [`contains()`](#containsobjectliststring-value)와 정확히 동일하게 작동합니다.
    ```
    econtains("Hello", "Lo") = false
    econtains("Hello", "lo") = true
    ```

- 리스트의 경우, 정확한 단어가 목록에 있는지 확인합니다.
    ```
    econtains(["These", "are", "words"], "word") = false
    econtains(["These", "are", "words"], "words") = true
    ```

- 객체의 경우, 정확한 키 이름이 객체에 있는지 확인합니다. 재귀적인 검사는 수행되지 **않습니다**.
  ```
  econtains({key:"value", pairs:"here"}, "here") = false
  econtains({key:"value", pairs:"here"}, "key") = true
  econtains({key:"value", recur:{recurkey: "val"}}, "value") = false
  econtains({key:"value", recur:{recurkey: "val"}}, "Recur") = false
  econtains({key:"value", recur:{recurkey: "val"}}, "recurkey") = false
  ```

### `containsword(list|string, value)`

`value`가 `string` 또는 `list`에 정확한 단어 일치가 있는지 확인합니다.
대소문자를 구분하지 않습니다.
입력 유형에 따라 출력이 다릅니다. 예시를 참조하세요.

- 문자열의 경우, 주어진 문자열에 단어가 있는지 확인합니다.
    ```
    containsword("word", "word") = true
    containsword("word", "Word") = true
    containsword("words", "Word") = false
    containsword("Hello there!", "hello") = true
    containsword("Hello there!", "HeLLo") = true
    containsword("Hello there chaps!", "chap") = false
    containsword("Hello there chaps!", "chaps") = true
    ```

- 리스트의 경우, 정확한 대소문자 구분 없는 일치 여부를 나타내는 부울 값 목록을 반환합니다.
   ```
   containsword(["I have no words.", "words"], "Word") = [false, false]
   containsword(["word", "Words"], "Word") = [true, false]
   containsword(["Word", "Words in word"],  WORD) =[true ,true]
   ```

### `extract(object, key1, key2, ...)`

객체에서 여러 필드를 추출하여 해당 필드만 있는 새로운 객체를 생성합니다.

```
extract(file,  ctime , mtime )= object( ctime , file.ctime , mtime , file.mtime)
extract(object( test , 1))= object()
```

### `sort(list)`

리스트를 정렬하여 정렬된 순서로 새로운 리스트를 반환합니다.

```
sort(list(3, 2, 1)) = list(1, 2, 3)
sort(list("a", "b", "aa")) = list("a", "aa", "b")
```

### `reverse(list)`

리스트를 반전시켜 역순으로 된 새로운 리스트를 반환합니다.

```
reverse(list(1, 2, 3)) = list(3, 2, 1)
reverse(list("a", "b", "c")) = list("c", "b", "a")
```

### `length(object|array)`

객체의 필드 수 또는 배열의 항목 수를 반환합니다.

```
length([]) = 0
length([1, 2 ,3])=3
length(object(hello ,1 ,goodbye ,2))=2
```

### `nonnull(array)`

모든 null 값을 제거한 새로운 배열을 반환합니다.

```
nonnull([])= []
nonnull([null ,false])=[false]
nonnull([1 ,2 ,3])=[1 ,2 ,3]
```


### `all(array)`

배열의 모든 값이 truthy인 경우에만 `true`를 반환합니다. 이 함수에 여러 인수를 전달할 수도 있으며,
이 경우 모든 인수가 truthy인 경우에만 `true`가 반환됩니다.

```
all([1, 2 ,3])= true
all([true,false])= false
all(true,false)= false
all(true,true,true)= true 
``` 

두 번째 인수로 함수를 전달하여 배열의 모든 요소가 술어(predicate)와 일치하는 경우에만 true를 반환할 수 있습니다.

```
all([1, 2 ,3], (x)=> x>0)= true
all([1, 2 ,3], (x)=> x>1)= false
all(["apple","pie",3], (x)=> typeof(x)="string")= false
```

### `any(array)`

배열의 값 중 하나라도 truthy인 경우 `true`를 반환합니다. 또한 여러 인수를 전달할 수 있으며,
이 경우 인수 중 하나라도 truthy인 경우에만 `true`를 반환합니다.

```
any(list(1, 2, 3)) = true
any(list(true, false)) = true
any(list(false, false, false)) = false
any(true, false) = true
any(false, false) = false
```

두 번째 인수로 함수를 전달하여 배열의 요소 중 일치하는 요소가 있는 경우에만 true를 반환할 수 있습니다.

```
any(list(1, 2 ,3), (x)=> x>2)= true 
 any(list(1 ,2 ,3), (x)=> x=0)=false 
```


### `none(array)`

배열의 값이 모두 falsy인 경우에만 `true`를 반환합니다.

```
none([]) = true
none([false ,false])=true 
none([false,true])=false 
none([1 ,2 ,3])=false  
``` 

두 번째 인수로 함수를 전달하여 배열의 요소가 일치하지 않는 경우에만 true를 반환할 수 있습니다.

```
 none([1 ,2 ,3], (x)=> x=0)=true 
 none([true,true], (x)=> x=false)=true  
 none(["Apple","Pi","Banana"], (x)=> startswith(x,"A"))=false  
``` 

### `join(array,[delimiter])`

배열의 요소들을 하나의 문자열로 결합합니다(즉, 모두 같은 줄에 렌더링됨). 두 번째 인수가 제공된 경우 각 요소는 주어진 구분자로 구분됩니다.

```
join(list(1, 2, 3)) = "1, 2, 3"
join(list(1, 2 ,3), " ")="1 2 3" 
join(6)="6" 
join(list())="" 
```


### `filter(array,predicate)`

프레디케이트에 따라 배열의 요소를 필터링하여 일치하는 요소로 이루어진 새로운 목록을 반환합니다.

```js
filter([1 ,2 ,3], (x)=> x>=2)= [2 ,3]  
filter(["yes","no","yas"], (x)=> startswith(x,"y"))=["yes","yas"]  
```

### `map(array,func)`

함수를 배열의 각 요소에 적용하여 매핑된 결과의 목록을 반환합니다.

```js
map([1 ,2 ,3], (x)=> x+2)= [3 ,4 ,5]  
map(["yes","no"], (x)=> x+"?")=["yes?","no?"]  
```

### `flat(array,[depth])`

배열의 하위 수준을 원하는 깊이까지 연결(concatenate)합니다. 기본값은 1레벨이지만,
여러 레벨을 연결할 수 있습니다. 예: `GROUP BY` 후 `rows` 리스트에서 배열 깊이를 줄일 때 사용할 수 있습니다.

```js
flat(list(1, 2, 3, list(4, 5), 6)) => list(1, 2, 3, 4, 5, 6)
flat(list(1 ,list(21 ,22), list(list (311 ,312 ,313))),4) => list(1 ,21 ,22 ,311 ,312 ,313)  
flat(rows.file.outlinks))=> 출력에서 파일 아웃링크의 모든 첫 번째 수준
```

---

## 문자열 연산

### `regextest(pattern, string)`

주어진 정규식 패턴이 문자열에서 찾을 수 있는지 확인합니다 (JavaScript 정규식 엔진 사용).

```js
regextest("\w+", "hello") = true
regextest(".", "a") = true
regextest("yes|no", "maybe") = false
regextest("what", "what's up dog?") = true
```

### `regexmatch(pattern, string)`

주어진 정규식 패턴이 *전체* 문자열과 일치하는지 확인합니다. JavaScript 정규식 엔진을 사용하며,
`regextest`와 달리 텍스트의 일부만 일치할 수 있습니다.

```js
regexmatch("\w+", "hello") = true
regexmatch(".", "a") = true
regexmatch("yes|no", "maybe") = false
regexmatch("what", "what's up dog?") = false
```

### `regexreplace(string, pattern, replacement)`

문자열에서 *정규식* `pattern`과 일치하는 모든 인스턴스를 `replacement`로 대체합니다. 이는 JavaScript의 replace 메서드를 내부적으로 사용하므로 `$1`과 같은 특수 문자를 사용하여 첫 번째 캡처 그룹을 참조할 수 있습니다.

```js
regexreplace("yes", "[ys]", "a") = "aea"
regexreplace("Suite 1000", "\d+", "-") = "Suite -"
```

### `replace(string, pattern, replacement)`

문자열에서 모든 `pattern`을 `replacement`로 대체합니다.

```js
replace("what", "wh", "h") = "hat"
replace("The big dog chased the big cat.", "big", "small") = "The small dog chased the small cat."
replace("test", "test", "no") = "no"
```

### `lower(string)`

문자열을 모두 소문자로 변환합니다.

```js
lower("Test") = "test"
lower("TEST") = "test"
```

### `upper(string)`

문자열을 모두 대문자로 변환합니다.

```js
upper("Test") = "TEST"
upper("test") = "TEST"
```

### `split(string, delimiter, [limit])`

주어진 구분 기호 문자열로 문자열을 분할합니다. 세 번째 인수를 제공하면 발생하는 분할 수를 제한합니다. 구분 기호 문자열은 정규식으로 해석됩니다. 구분 기호에 캡처 그룹이 있는 경우 일치하는 것들이 결과 배열에 삽입되고 일치하지 않는 캡처는 빈 문자열입니다.


```js
split("hello world",  "")= list( h ,e ,l ,l ,o ,  w ,o ,r,l,d)
split( hello   world" ," ")= list(hello,"","world")
split( hello there world" ," ",2)= list(hello,"there")
split( hello there world" ,(t?here)")= list(hello ,"there","world")
split( hello there world" ,( )(x)? )=list(hello," ","","there"," ","","world")
```
 

### `startswith(string, prefix)`

문자열이 주어진 접두사로 시작하는지 확인합니다.

```js
startswith("yes", "ye") = true
startswith("path/to/something", "path/") = true
startswith("yes", "no") = false
```

### `endswith(string, suffix)`

문자열이 주어진 접미사로 끝나는지 확인합니다.

```js
endswith("yes", "es") = true
endswith("path/to/something", "something") = true
endswith("yes", "ye") = false
```

### `padleft(string, length, [padding])`

왼쪽에 패딩을 추가하여 문자열의 길이를 원하는 길이까지 채웁니다. 패딩 문자를 지정하지 않으면 기본값으로 공백이 사용됩니다.

```js
padleft("hello", 7) = "  hello"
padleft("yes", 5, "!") = "!!yes"
```

### `padright(string, length, [padding])`

`padleft`와 동일하지만 오른쪽에 패딩을 추가합니다.

```js
padright("hello", 7) = "hello  "
padright("yes", 5, "!") = "yes!!"
```

### `substring(string, start, [end])`

문자열의 일부분을 가져옵니다. `start`에서 시작하여 `end`(지정되지 않은 경우 문자열의 끝)에서 끝납니다.

```js
substring("hello", 0 ,2)="he" 
substring("hello", 2 ,4)="ll" 
substring("hello", 2 )="llo" 
substring("hello",0)="hello"
```
### `truncate(string,length,[suffix])`

문자열을 최대 길이로 자르고(기본값은 `...`) 접미사를 포함합니다. 일반적으로 테이블에서 긴 텍스트를 자르는 데 유용합니다.

```js
truncate(Hello there!" ,8 )="Hello..."
truncate(Hello there!" ,8,"/")="Hello t/"
truncate(Hello there!" ,10 )="Hello t..."
truncate(Hello there!" ,10,"!")="Hello the!"
truncate(Hello there!" ,20 )=" Hello there!"
```
## 유틸리티 함수

### `default(field,value)`

`field`가 null인 경우에는 `value`를 반환하고 그렇지 않으면 'field'를 반환합니다. 기본값으로 null 값을 대체하는 데 유용합니다. 예를 들어 아직 완료되지 않은 프로젝트를 표시하려면 `"incomplete"`을 기본값으로 사용합니다.

```js
default(dateCompleted, "incomplete")
```

기본값은 두 인수 모두에 대해 벡터화됩니다. 목록 인수에서 명시적으로 기본값을 사용해야하는 경우 `ldefault`를 사용합니다.
이는 기본적으로 default와 동일하지만 벡터화되지 않습니다.

```js
default(list(1, 2, null), 3) = list(1, 2, 3)
ldefault(list(1, 2 ,null),3)=list(1 ,2 ,null) 
```

### `choice(bool,left,right)`

원시 if 문입니다 - 첫 번째 인수가 truthy이면 left를 반환하고 그렇지 않으면 right를 반환합니다.

```js
choice(true,"yes","no")="yes" 
choice(false,"yes","no")="no" 
choice(x>4,y,z)= y if x >4, else z  
```
### `striptime(date)`

날짜의 시간 구성 요소를 제거하고 연도, 월 및 일만 남깁니다. 시간에 관심이 없는 경우 날짜 비교에 유용합니다.

```js
striptime(file.ctime)=file.cday 
striptime(file.mtime)=file-ko.mday 
```
### `dateformat(date|datetime,string)`

서식 문자열을 사용하여 Dataview 날짜를 서식화합니다.
[Luxon tokens](https://moment.github.io/luxon/#/formatting?id=table-of-tokens)를 사용합니다.

```js
dateformat(file.ctime,"yyyy-MM-dd")="2022-01-05" 
dateformat(file.ctime,"HH:mm:ss")="12:18:04" 
dateformat(date(now),"x")="1407287224054" 
dateformat(file.mtime,"ffff")="Wednesday, August 6, 2014, 1:07 PM Eastern Daylight Time"
```

### `durationformat(duration,string)`

서식 문자열을 사용하여 Dataview 기간을 서식화합니다.
단일 인용부 안에 있는 모든 것은 토큰으로 처리되지 않으며
대신 출력에 입력된 대로 표시됩니다. 예제를 참조하세요.

다음 토큰을 사용할 수 있습니다:

- `S` 밀리초
- `s` 초
- `m` 분
- `h` 시간
- `d` 일
- `w` 주
- `M` 월
- `y` 년

```js
durationformat(dur("3 days 7 hours 43 seconds"), "ddd'd' hh'h' ss's'") = "003d 07h 43s"
durationformat(dur("365 days 5 hours 49 minutes"), "yyyy ddd hh mm ss") = "0001 000 05 49 00"
durationformat(dur("2000 years"), "M months") = "24000 months"
durationformat(dur("14d"), "s 'seconds'") = "1209600 seconds"
```

### `localtime(date)`

고정된 시간대의 날짜를 현재 시간대의 날짜로 변환합니다.

### `meta(link)`

링크의 메타데이터를 포함하는 객체를 가져옵니다. 링크에서 속성에 액세스하면 연결된 파일의 속성 값이 반환됩니다. `meta` 함수를 사용하면 링크 자체의 속성에 액세스할 수 있습니다.

`meta`로 반환되는 객체에는 여러 속성이 있습니다.

#### `meta(link).display`

링크의 표시 텍스트를 가져옵니다. 링크에 정의된 표시 텍스트가 없으면 null을 반환합니다.

```js
meta([[2021-11-01|Displayed link text]]).display = "Displayed link text"
meta([[2021-11-01]]).display = null
```

#### `meta(link).embed`

링크가 임베드인지 여부에 따라 true 또는 false입니다. 임베드 링크는 `![[Some Link]]`와 같이 느낌표로 시작하는 링크입니다.

#### `meta(link).path`

링크의 경로 부분을 가져옵니다.

```js
meta([[My Project]]).path = "My Project"
meta([[My Project#Next Actions]]).path = "My Project"
meta([[My Project#^9bcbe8]]).path = "My Project"
```

#### `meta(link).subpath`

링크의 하위 경로(subpath)를 가져옵니다. 파일 내 제목으로 링크하는 경우 하위 경로는 제목의 텍스트입니다. 블록으로 링크하는 경우 하위 경로는 블록 ID입니다. 이러한 경우가 아니면 하위 경로는 null입니다.

```js
meta([[My Project#Next Actions]]).subpath = "Next Actions"
meta([[My Project#^9bcbe8]]).subpath = "9bcbe8"
meta([[My Project]]).subpath = null
```

이를 사용하여 특정 제목 아래의 작업을 선택할 수 있습니다.

````
```dataview
task
where meta(section).subpath = "Next Actions"
```
````

#### `meta(link).type`

링크가 전체 파일, 파일 내 제목 또는 파일 내 블록에 연결되는지 여부에 따라 "file", "header" 또는 "block" 값을 갖습니다.

```js
meta([[My Project]]).type = "file"
meta([[My Project#Next Actions]]).type = "header"
meta([[My Project#^9bcbe8]]).type = "block"
```