---
created: 2023-10-14 T19:05
updated: 2023-10-14 T22:22
---
# 코드 블록 참조

Dataview JavaScript 코드 블록은 코드 블록에 `dataviewjs` 언어 사양을 사용하여 생성됩니다:

~~~
```dataviewjs
dv.table([], ...)
```
~~~

API는 암묵적으로 제공되는 `dv` (또는 `dataview`) 변수를 통해 사용할 수 있으며, 이를 통해 정보를 쿼리하고 HTML을 렌더링하고 보기를 구성할 수 있습니다.

비동기 API 호출은 `⌛`로 표시됩니다.

## 쿼리
쿼리 메서드를 사용하면 Dataview 인덱스에서 페이지 메타데이터를 쿼리할 수 있으며, 이 데이터를 렌더링하려면 [렌더 섹션](#렌더)의 메서드를 사용합니다.

### `dv.current()`

현재 스크립트가 실행 중인 페이지에 대한 페이지 정보(통해 `dv.page()`)를 가져옵니다.

### `dv.pages(source)`

단일 문자열 인수인 `source`를 받으며, [쿼리 언어 소스](../../reference/sources-ko.md)와 동일한 형식입니다.
페이지 객체의 [데이터 배열](../data-array-ko.md)을 반환합니다. 페이지 객체는 모든 필드 값을 가진 일반 객체입니다.

```js
dv.pages() 
// => 볼트 내 모든 페이지
dv.pages("#books") 
// => 태그 'books'가 있는 모든 페이지
dv.pages('"folder"') 
// => "folder" 폴더에서 모든 페이지
dv.pages("#yes or -#no") 
// => 태그 #yes가 있는 모든 페이지 또는 태그 #no가 없는 페이지
dv.pages('"folder" or #tag') 
// => 태그 #tag가 있는 모든 페이지 또는 "folder" 폴더에서의 페이지
```

참고로, 폴더는 문자열 내에서 이중 따옴표로 감싸야 합니다 (예: `dv.pages("folder")`는 작동하지 않지만 `dv.pages('"folder"')`은 작동합니다) - 이것은 쿼리 언어에서 소스를 작성하는 방식과 정확히 일치하기 위함입니다.

### `dv.pagePaths(source)`

`dv.pages`와 유사하지만, 주어진 소스와 일치하는 페이지의 경로들의 [데이터 배열](../data-array-ko.md)을 반환합니다.

```js
dv.pagePaths("#books") 
// => 태그 'books'가 있는 페이지들의 경로들
```

### `dv.page(path)`

단순한 경로나 링크를 전체 페이지 객체에 매핑합니다. 링크 해석을 자동으로 수행하며, 확장자가 없으면 자동으로 확장자를 추론합니다.

```js
dv.page("Index") 
// => /Index에 대한 페이지 객체
dv.page("books/The Raisin-ko.md") 
// => /books/The Raisin-ko.md에 대한 페이지 객체
```

## 렌더링

### `dv.el(element, text)`

주어진 HTML 요소에 임의의 텍스트를 렌더링합니다.
```js
dv.el("b", "This is some bold text");
```

`cls`를 사용하여 요소에 추가할 사용자 정의 클래스를 지정하고, `attr`을 사용하여 추가 속성을 지정할 수도 있습니다.

```js
dv.el("b", "This is some text", { cls: "dataview dataview-class", attr: { alt: "Nice!" } });
```

### `dv.header(level, text)`

주어진 텍스트로 레벨 1부터 6까지의 헤더를 렌더링합니다.

```js
dv.header(1, "Big!");
dv.header(6, "Tiny");
```

### `dv.paragraph(text)`

문단에 임의의 텍스트를 렌더링합니다.

```js
dv.paragraph("This is some text");
```

### `dv.span(text)`

스팬에 임의의 텍스트를 렌더링합니다 (문단과 달리 위/아래 패딩 없음).

```js
dv.span("This is some text");
```

### `dv.execute(source)`

임의의 dataview 쿼리를 실행하고 현재 페이지에 포함시킵니다.

```js
dv.execute("LIST FROM #tag");
dv.execute("TABLE field1, field2 FROM #thing");
```
 
### ` dv.executeJs(source)`

임의의 DataviewJS 쿼리를 실행하고 현재 페이지에 포함시킵니다.

```js
dv.executeJs("dv.list([1, 2, 3])");
```

### ` dv.view(path, input)`

`dv` 및 `input`을 전달하여 지정된 경로의 JavaScript 파일을 로드하고 실행하는 복잡한 함수입니다.
이를 통해 여러 페이지에서 사용자 정의 뷰 코드를 재사용할 수 있습니다. 파일 I/O가 포함되므로 이 함수는 비동기 함수입니다.
결과를 기다리려면 결과에 `await` 키워드를 사용하세요!

```js
await dv.view("views/custom", { arg1: ..., arg2: ... });
```

뷰 스크립트는 `dv` 객체(API 객체)와 두 번째 인수인 `input` 객체에 액세스할 수 있습니다. 이는 `dv.view()`의 두 번째 인수가 되는 것과 정확히 일치합니다.

참고: `.view()`에서 디렉터리 이름은 항상 볼트 루트에서 시작합니다.

#### 예시
이 예제에서는 `scripts` 디렉터리에 있는 사용자 지정 스크립트 파일인 `view1.js`가 있습니다.

**파일:** `scripts/view1.js`
```js
console.log(`Loading view1`);

function foo(...args) {
  console.log('foo is called with args', ...args);
}
foo(input)
```

그리고 'projects'라는 Obsidian 문서가 있습니다. 'projects/customViews-ko.md'라는 경로에서 `dv.view()`를 호출하여 'scripts/view1.js' 경로를 사용합니다.

**문서:** `projects/customViews-ko.md`
```js
await dv.view("scripts/view1", { arg1: 'a', arg2: 'b' }) 
```

위의 스크립트가 실행되면 다음이 출력됩니다.

```
Loading view1
foo is called with args {arg1: 'a', arg2: 'b'}
```

## Dataviews

### `dv.list(elements)`

주어진 요소들의 dataview 목록을 렌더링합니다. 일반 배열과 데이터 배열 모두 허용됩니다.

```js
dv.list([1, 2, 3]) => 1, 2, 3의 목록
dv.list(dv.pages().file.name) => 모든 파일 이름의 목록
dv.list(dv.pages().file.link) => 모든 파일 링크의 목록
dv.list(dv.pages("#book").where(p => p.rating > 7)) => 등급이 7보다 큰 모든 책의 목록
```

### `dv.taskList(tasks, groupByFile)`

`Task` 객체들의 dataview 목록을 렌더링합니다. 첫 번째 인수는 필수이며 두 번째 인수인 `groupByFile`은 선택적입니다.
`groupByFile`이 제공되고 true인 경우 작업은 자동으로 파일별로 그룹화됩니다.

```js
// '#project'로 표시된 페이지에서 모든 작업 나열하기.
dv.taskList(dv.pages("#project").file.tasks)

// '#project'로 표시된 페이지에서 *완료되지 않은* 모든 작업 나열하기.
dv.taskList(dv.pages("#project").file.tasks
    .where(t => !t.completed))

// '#project'로 표시된 페이지에서 '#tag' 태그가 있는 모든 작업 나열하기.
dv.taskList(dv.pages("#project").file.tasks
    .where(t => t.text.includes("#tag")))
```

### `dv.table(headers, elements)`

dataview 테이블을 렌더링합니다. `headers`는 열 제목의 배열이고, `elements`는 행의 배열입니다. 각 행은 자체적으로 열의 배열입니다.
행 내에서 각 열이 배열인 경우에만 글머리 기호와 함께 렌더링됩니다.

```js
dv.table(
	["Col1", "Col2", "Col3"],
		[
			["Row1", "Dummy", "Dummy"],
			["Row2", 
				["Bullet1",
				 "Bullet2",
				 "Bullet3"],
			 "Dummy"],
			["Row3", "Dummy", "Dummy"]
		]
	);
```

책 정보를 등급별로 정렬하여 간단한 테이블로 렌더링하는 예시입니다.

```js
dv.table(["File", "Genre", "Time Read", "Rating"], dv.pages("#book")
    .sort(b => b.rating)
    .map(b => [b.file.link, b.genre, b["time-read"], b.rating]))
```

## Markdown Dataviews

Markdown 문자열로 렌더링되는 함수들로, 이후에 원하는대로 렌더링하거나 조작할 수 있습니다.

### `dv.markdownTable(headers, values)`

`dv.table()`과 동일하지만 일반적인 Markdown 형식으로 반환됩니다. 열 제목과 2D 배열의 요소를 사용하여 테이블을 렌더링합니다.

```js
// 등급별로 정렬된 책 정보의 간단한 테이블을 렌더링합니다.
const table = dv.markdownTable(["File", "Genre", "Time Read", "Rating"], dv.pages("#book")
    .sort(b => b.rating)
    .map(b => [b.file.link, b.genre, b["time-read"], b.rating]))

dv.paragraph(table);
```

### `dv.markdownList(values)`

`dv.list()`와 동일하지만 일반적인 Markdown 형식으로 반환됩니다. 주어진 요소들의 목록을 렌더링합니다.

```js
const markdown = dv.markdownList([1, 2, 3]);
dv.paragraph(markdown);
```

### `dv.markdownTaskList(tasks)`

`dv.taskList()`와 동일하지만 일반적인 Markdown 형식으로 반환됩니다. 작업 목록을 렌더링합니다.

```js
const markdown = dv.markdownTaskList(dv.pages("#project").file.tasks);
dv.paragraph(markdown);
```
 
## 유틸리티

### `dv.array(value)`

주어진 값을 데이터 배열로 변환합니다. 값이 이미 데이터 배열인 경우 변경 없이 반환됩니다.

```js
dv.array([1, 2, 3]) => dataview 데이터 배열 [1, 2, 3]
```

### `dv.isArray(value)`

주어진 값이 배열 또는 데이터 배열인 경우 true를 반환합니다.

```js
dv.isArray(dv.array([1, 2, 3])) => true
dv.isArray([1, 2, 3]) => true
dv.isArray({ x: 1 }) => false
```

### `dv.fileLink(path, [embed?], [display-name])`

텍스트 경로를 Dataview `Link` 객체로 변환합니다. 필요에 따라 링크가 포함되고 표시 이름을 지정할 수도 있습니다.

```js
dv.fileLink("2021-08-08") => "2021-08-08" 파일에 대한 링크
dv.fileLink("book/The Raisin", true) => "The Raisin"에 대한 링크를 포함시킵니다.
dv.fileLink("Test", false, "Test File") => 표시 이름이 "Test File"인 파일 "Test"에 대한 링크
```

### `dv.sectionLink(path, section, [embed?], [display?])`

텍스트 경로와 섹션 이름을 Dataview `Link` 객체로 변환합니다. 필요에 따라 링크가 포함되고 표시 이름을 지정할 수도 있습니다.

```js
dv.sectionLink("Index", "Books") => [[Index#Books]]
dv.sectionLink("Index", "Books", false, "My Books") => [[Index#Books|My Books]]
```

### `dv.blockLink(path, blockId, [embed?], [display?])`

텍스트 경로와 블록 ID를 Dataview `Link` 객체로 변환합니다. 필요에 따라 링크가 포함되고 표시 이름을 지정할 수도 있습니다.

```js
dv.blockLink("Notes", "12gdhjg3") => [[Index#^12gdhjg3]]
```

### `dv.date(text)`

텍스트 및 링크를 luxon의 `DateTime`으로 변환합니다. 만약 `DateTime`이 제공된 경우 변경 없이 반환됩니다.

```js
dv.date("2021-08-08") => 2021년 8월 8일의 DateTime
dv.date(dv.fileLink("2021-08-07")) => 2021년 8월 7일의 DateTime
```

### `dv.duration(text)`

텍스트를 luxon의 `Duration`으로 변환합니다. Dataview 기간 유형과 동일한 구문 분석 규칙을 사용합니다.

```js
dv.duration("8 minutes") => 8분의 Duration { 8 minutes }
dv.duration("9 hours, 2 minutes, 3 seconds") => 9시간 2분 3초의 Duration { 9 hours, 2 minutes, 3 seconds }
```

### `dv.compare(a, b)`

두 가지 임의의 JavaScript 값에 대해 dataview의 기본 비교 규칙을 사용하여 비교합니다.
사용자 정의 비교기를 작성하고 기본 동작으로 되돌리려는 경우 유용합니다. `a < b`인 경우 음수 값을 반환하고,
`a = b`인 경우 0을 반환하며, `a > b`인 경우 양수 값을 반환합니다.

```js
dv.compare(1, 2) = -1
dv.compare("yes", "no") = 1
dv.compare({ what: 0 }, { what: 0 }) = 0
```

### `dv.equal(a, b)`

두 가지 임의의 JavaScript 값이 Dataview의 기본 비교 규칙에 따라 동일한지 여부를 확인하여 true 또는 false를 반환합니다.

```js
dv.equal(1, 2) = false
dv.equal(1, 1) = true
```

### `dv.clone(value)`

날짜, 배열 및 링크를 포함한 모든 Dataview 값에 대해 깊은 복제를 수행합니다.

```js
dv.clone(1) = 1
dv.clone({ a: 1 }) = { a: 1 }
```

### `dv.parse(value)`

복잡한 Dataview 유형 (주로 링크, 날짜 및 기간을 지원하는 유형)으로 임의의 문자열 개체를 구문 분석합니다.

```js
dv.parse("[[A]]") = Link { path: A }
dv.parse("2020-08-14") = DateTime { 2020-08-14 }
dv.parse("9 seconds") = Duration { 9 seconds }
```
 
## 파일 I/O

이러한 유틸리티 메서드는 모두 `io` 하위 API에 포함되어 있으며 모두 *비동기*입니다 (⌛ 표시).

### ⌛ ` dv.io.csv(path, [origin-file])`

주어진 경로에서 CSV 파일을 로드합니다. 상대 경로는 선택적인 원본 파일에 상대적으로 해결됩니다 (제공되지 않으면 현재 파일을 기본값으로 사용). 각 요소가 CSV 값의 객체인 dataview 배열을 반환하며, 파일이 존재하지 않는 경우 `undefined`를 반환합니다.

```js
await dv.io.csv("hello.csv") => [{ column1: ..., column2: ...}, ...]
```

### ⌛ `dv.io.load(path, [origin-file])`

주어진 경로에서 내용을 비동기적으로 로드합니다. 상대 경로는 선택적인 원본 파일에 상대적으로 해결됩니다 (제공되지 않으면 현재 파일을 기본값으로 사용). 파일이 존재하지 않는 경우 문자열 내용 또는 `undefined`를 반환합니다.

```js
await dv.io.load("File") => "# File
This is an example file..."
```

### `dv.io.normalize(path, [origin-file])`

상대 링크 또는 경로를 절대 경로로 변환합니다. `origin-file`이 제공된 경우 링크가 해당 파일에서 해결되도록 해상도가 됩니다. 제공되지 않은 경우 현재 파일과 관련하여 경로가 해결됩니다.

```js
dv.io.normalize("Test") => "dataview/test/Test-ko.md", "dataview/test" 안에 있을 때
dv.io.normalize("Test", "dataview/test2/Index-ko.md") => "dataview/test2/Test-ko.md", 현재 파일과 관계없이
```

## 쿼리 평가

### ⌛ `dv.query(source, [file, settings])`

Dataview 쿼리를 실행하고 결과를 구조화된 반환 형식으로 반환합니다.
이 함수의 반환 형식은 실행되는 쿼리 유형에 따라 다양하지만 항상 결과 유형을 나타내는 `type`을 포함하는 객체입니다. 이 버전의 `query`는 결과 유형을 반환합니다. 쿼리 실행에 실패한 경우 오류가 발생하는 대신 오류 대신 예외를 던지도록 하는 `tryQuery`를 사용할 수 있습니다.

```javascript
await dv.query("LIST FROM #tag") =>
    { successful: true, value: { type: "list", values: [value1, value2, ...] } }

await dv.query(`TABLE WITHOUT ID file.name, value FROM "path"`) =>
    { successful: true, value: { type: "table", headers: ["file.name", "value"], values: [["A", 1], ["B", 2]] } }

await dv.query("TASK WHERE due") =>
    { successful: true, value: { type: "task", values: [task1, task2, ...] } }
```

`dv.query`는 두 가지 추가적인 선택적 인수도 허용합니다:
1. `file`: 쿼리를 해결할 파일 경로 (`this`에 대한 참조의 경우). 기본값은 현재 파일입니다.
2. `settings`: 쿼리 실행을 위한 실행 설정입니다. 이것은 주로 고급 사용 사례이며 (사용 가능한 모든 옵션을 보려면 API 구현을 직접 확인하는 것이 좋습니다).

### ⌛ `dv.tryQuery(source, [file, settings])`

`dv.query`와 완전히 동일하지만 실행 실패 시 JavaScript 예외가 발생하여 결과 유형 대신 오류를 던집니다.

### ⌛ `dv.queryMarkdown(source, [file], [settings])`

`dv.query()`와 동일하지만 렌더링된 Markdown으로 반환됩니다.

```js
await dv.queryMarkdown("LIST FROM #tag") =>
    { successful: true, value: { "- [[Page 1]]
- [[Page 2]]" } }
```

### ⌛ `dv.tryQueryMarkdown(source, [file], [settings])`

`dv.queryMarkdown()`와 완전히 동일하지만 구문 분석 실패 시 오류를 던집니다.

### `dv.tryEvaluate(expression, [context])`

임의의 dataview 표현식 (예를 들어 `2 + 2` 또는 `link("text")` 또는 `x * 9`)를 평가하여 JavaScript 예외가 발생합니다. `this`는 항상 현재 파일을 나타내는 암묵적 변수입니다.

```js
dv.tryEvaluate("2 + 2") => 4
dv.tryEvaluate("x + 2", {x: 3}) => 5
dv.tryEvaluate("length(this.file.tasks)") => 현재 파일의 작업 수
```

### `dv.evaluate(expression, [context])`

임의의 dataview 표현식 (예: `2 + 2` 또는 `link("text")` 또는 `x * 9`)을 평가하여 결과의 `Result` 객체를 반환합니다. 결과 유형을 확인하기 위해 `result.successful`을 확인한 다음 (`result.value` 또는 `result.error`) 중 하나를 가져올 수 있습니다. 실패한 평가에 대해 오류를 발생시키려면 실패하는 경우에도 예외를 throw하는 간단한 API인 'dv.tryEvaluate'를 사용하세요.

```js
dv.evaluate("2 + 2") => Successful { value: 4 }
dv.evaluate("2 +") => Failure { error: "Failed to parse ... " }
```