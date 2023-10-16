# 구문

[Templater](https://github.com/SilentVoid13/Templater)는 명령을 선언하기 위해 사용자 정의 템플릿 엔진인 [rusty_engine](https://github.com/SilentVoid13/rusty_engine)의 구문을 사용합니다. 이 구문에 익숙해지기까지는 약간의 시간이 필요할 수 있지만, 한 번 이해하면 그리 어렵지 않습니다.

Templater의 모든 함수는 **명령어**를 사용하여 호출되는 JavaScript 객체입니다.

## 명령어 구문

명령어에는 반드시 여는 태그 `<%`와 닫는 태그 `%>`가 모두 있어야 합니다.

`tp.date.now` 내부 함수를 사용하는 완전한 명령어 예시: `<% tp.date.now() %>`

## 함수 구문

### 객체 계층구조

내부 함수나 사용자 함수와 같은 Templater의 모든 함수들은 `tp` 객체 아래에서 사용할 수 있습니다. 모든 함수들은 `tp` 객체의 자식이라고 할 수 있습니다. "자식" 객체에 접근하기 위해서는 점 표기법 `.`을 사용해야 합니다.

즉, Templater 함수 호출은 항상 `tp.<무언가>`로 시작합니다.

#### 함수 호출

함수를 호출하려면, 해당하는 문법을 따라서 이름 뒤에 여는 괄호와 닫는 괄호를 추가해야 합니다.

예를 들어, `tp.date.now()` 내부 함수를 호출하기 위해서는 `tp.date.now()`를 사용합니다.

함수는 인수와 선택적 인수를 가질 수 있습니다. 이들은 여는 괄호와 닫는 괄호 사이에 배치됩니다.

```javascript
tp.date.now(arg1_value, arg2_value, arg3_value, ...)
```

모든 인수는 올바른 순서로 전달되어야 합니다.

함수의 인수에는 다양한 **타입**이 있을 수 있습니다. 다음은 함수의 가능한 타입 중 일부입니다:

- `string` 타입은 값을 단일 또는 이중 따옴표(`"value"` 또는 `'value'`)로 감싸야 함을 의미합니다.
- `number` 타입은 정수 값이어야 합니다(`15`, `-5`, ...).
- `boolean` 타입은 값이 `true` 또는 `false`(소문자)만 가능하며 그 외의 값은 허용되지 않습니다.

인수의 타입을 호출할 때 준수해야 하며, 그렇지 않으면 작동하지 않습니다.

### 함수 문서 구문

Templater의 내부 함수에 대한 문서화 구문은 다음과 같이 사용됩니다:

```javascript
tp.<my_function>(arg1_name: type, arg2_name?: type, arg3_name: type = <default_value>, arg4_name: type1|type2, ...)
```

여기서:

- `arg_name`은 인수에 대한 **상징적인** 이름으로, 해당 인수가 무엇을 의미하는지 이해하기 위한 것입니다.
- `type`은 인수에 대한 예상 타입입니다. 내부 함수를 호출할 때 이 타입을 준수해야 하며, 그렇지 않으면 오류가 발생합니다.

인수가 선택적이면 물음표 `?`로 표시됩니다. 예: `arg2_name?: type`

인수에 기본값이 있는 경우 등호 `=`를 사용하여 지정합니다. 예: `arg3_name: type = <default_value>`.

인수의 타입이 다양할 수 있는 경우 파이프 `|`를 사용하여 지정합니다. 예: `arg4_name: type1|type2`

#### 구문 경고

이 구문은 문서화 목적으로만 사용되며 함수 호출 시 인자의 이름, 타입 및 기본값을 지정해서는 안 됩니다. [여기](./syntax-ko.md#function-invocation)에서 설명한 대로 값만 필요합니다.

##### 예시

`tp.date.now` 내부 함수 문서를 살펴보겠습니다:

```
tp.date.now(format: string = "YYYY-MM-DD", offset?: number|string, reference?: string, reference_format?: string)
```

이 내부 함수에는 4개의 선택적 인수가 있습니다:

- format은 문자열 형식의 인수로 기본값은 `"YYYY-MM-DD"`입니다.
- offset은 숫자 형식이거나 문자열 형식일 수 있습니다.
- reference는 문자열 형식입니다.
- reference_format은 문자열 형식입니다.

따라서 이 내부 함수의 **유효한 호출**은 다음과 같습니다:

- `<% tp.date.now() %>`
- `<% tp.date.now("YYYY-MM-DD", 7) %>`
- `<% tp.date.now("YYYY-MM-DD", 7, "2021-04-09", "YYYY-MM-DD") %>`
- `<% tp.date.now("dddd, MMMM Do YYYY", 0, tp.file.title, "YYYY-MM-DD") %>` *파일 이름이 "YYYY-MM-DD" 형식인 경우를 가정합니다.

반면에 **유효하지 않은 호출**은 다음과 같습니다:

- `tp.date.now(format: string = "YYYY-MM-DD")`
- `tp.date.now(format: string = "YYYY-MM-DD", offset?: 0)`
