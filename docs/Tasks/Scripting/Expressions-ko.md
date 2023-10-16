---
publish: true
---

# 표현식

<span class="related-pages">#feature/scripting</span>

> [!released]
> 표현식은 Tasks 4.0.0에서 소개되었습니다.

## 소개

> [!Note]
> JavaScript 언어의 상세한 설명을 작성하는 것은 이 설명서의 범위를 벗어납니다.
>
> 우리는 초보자를 위한 자료와 신중하게 생각해 볼 만한 예제 몇 가지를 제공하여 여러분에게 아이디어를 제공하고 스스로 실험하고 기능을 시도하도록 권장합니다.

## 표현식이란 무엇인가요?

- 언어는 JavaScript입니다.
- 표현식은 문자열 명령입니다.
- 한 줄에 맞아야 합니다.
  - Tasks 4.4.0부터 변수, 함수, `if` 블록 및 유사한 것을 사용할 수 있습니다. [[#더 복잡한 표현식]] 참조.
- 컨텍스트에 따라 하나 또는 두 개의 작업이 표현식으로 전달되며 계산이 수행됩니다.
  - 사실상 Tasks 4.0.0부터는 실제로 하나의 작업만 전달되어 [[Custom Grouping-ko|사용자 정의 그룹화]]를 구현합니다.
  - Tasks 4.2.0부터는 하나의 작업만 전달하여 [[Custom Filters-ko|사용자 정의 필터]]를 구현합니다.
- Tasks는 그러한 입력을 기반으로 값을 계산합니다.

## 예제 표현식

표현식의 실질적인 가치는 Tasks 데이터에서 값을 계산하는 데 있습니다.

이 섹션에서는 인위적으로 단순한 고정된 표현식을 사용하여 사용 가능한 기능을 보여주기 위해 사용합니다.

아래 각 줄은 다음 양식을 따릅니다.

~~~text
표현식 => 결과
~~~

### 간단한 표현식

일부 예제 표현식:

<!-- placeholder to force blank line before included text --><!-- include: Expression.test.Expression_result.approved.md -->

~~~text
'hello' => 'hello'
"hello" => 'hello'
"" => ''
[] => []
"" || "No value" => 'No value'
false => false
true => true
1 => 1
0 => 0
0 || "No value" => 'No value'
1.0765456 => 1.0765456
6 * 7 => 42
["heading1", "heading2"] => ['heading1', 'heading2']
[1, 2] => [1, 2]
null => null
null || "No value" => 'No value'
undefined => undefined
undefined || "No value" => 'No value'
"I _am_ not _italic_".replaceAll("_", "\\_") => 'I \_am\_ not \_italic\_'
~~~

<!-- placeholder to force blank line after included text --><!-- endInclude -->

참고:

- 작은따옴표(`'`)와 큰따옴표(`"`)는 일반적으로 동등하며 원하는 것을 사용할 수 있습니다.
- `||`는 '또는'을 의미합니다. `||` 왼쪽의 표현식이 실패하면 대신 `||` 오른쪽의 표현식이 사용됩니다.
- 이러한 값을 실험해 볼 수 있도록 그룹 함수 행에 추가할 수 있습니다.
- `return` 문을 작성하지 않으면 Tasks가 대신 추가합니다.

### 더 복잡한 표현식

Tasks 4.4.0부터는 표현식에서 더 복잡한 구조도 사용할 수 있습니다.

- `return` 문
- 이름이 있는 변수
- `if` 문
- 함수

<!-- placeholder to force blank line before included text --><!-- include: Expression.test.Expression_returns_and_functions.approved.md -->

~~~text
return 42 => 42
const x = 1 + 1; return x * x => 4
if (1 === 1) { return "yes"; } else { return "no" } => 'yes'
function f(value) { if (value === 1 ) { return "yes"; } else { return "no"; } } return f(1) => 'yes'
~~~

<!-- placeholder to force blank line after included text --><!-- endInclude -->
