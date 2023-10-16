# 공백 제어(Whitespace Control)

기본적으로, Templater의 **명령어**는 어떠한 줄바꿈도 제거하지 않습니다. 명령어는 해당 값으로 대체되고 그게 끝입니다.

그러나 때로는 명령어가 삽입된 후에 일부 공백을 제어하는 것이 유용할 수 있습니다. 이 명령어 유틸리티가 바로 그 역할을 합니다.

예를 들어, 다음과 같은 템플릿이 있다고 가정해 보겠습니다:

```
<%* if (tp.file.title == "MyFile" ) { %>
This is my file!
<%* } else { %>
This isn't my file!
<%* } %>
Some content ...
```

조건이 거짓인 경우(참일 때도 동일하게) 다음과 같은 출력을 생성합니다. 빈 줄에 주목하세요:

```

This isn't my file!

Some content ...
```

**실행 명령어**(output을 생성하지 않는 명령어)에 의해 생성된 빈 줄을 제거하고 싶을 수 있습니다.

공백 제어를 위한 특정 구문이 있습니다:

- 태그(`<%_`)의 **처음**에 밑줄 `_`을 사용하면 명령어 **앞의 모든** 공백을 제거합니다.
- 태그(`_%>`)의 **끝**에 밑줄 `_`을 사용하면 명령어 **뒤의 모든** 공백을 제거합니다.
- 태그(`<%-`)의 **처음**에 대시 `-`를 사용하면 명령어 **앞의 한 개의** 줄 바꿈 문자를 제거합니다.
- 태그(`-%>`)의 **끝**에 대시 `-`를 사용하면 명령어 **뒤의 한 개의** 줄 바꿈 문자를 제거합니다.

우리 예제에서는, 빈 줄을 제거하기 위해 다음과 같은 템플릿(태그 끝에 대시 `-`가 있는 것에 주목하세요)을 사용할 것입니다. 이로써 실행 명령어 이후에 있는 빈 줄들이 제거됩니다:

```
<%* if (tp.file.title == "MyFile" ) { -%>
This is my file!
<%* } else { -%>
This isn't my file!
<%* } -%>
Some content ...
```

이로써 다음과 같은 출력이 생성됩니다:

```
This isn't my file!
Some content ...
```