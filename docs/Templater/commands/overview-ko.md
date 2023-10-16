---
created: 2023-10-14 T17:59
updated: 2023-10-14 T19:04
---
# 명령어

## 명령어 유형

[Templater](https://github.com/SilentVoid13/Templater)는 2가지 종류의 여는 태그를 정의하여 2가지 유형의 **명령어**를 사용합니다:

- `< %` : 보간(interpolation) 명령어입니다. 내부에 있는 표현식의 결과를 출력합니다.
- `< %*` : [JavaScript 실행 명령어](./execution-command-ko.md)입니다. 내부에 있는 JavaScript 코드를 실행합니다. 기본적으로 아무 것도 출력하지 않습니다.

명령어의 닫는 태그는 항상 동일합니다: `%>`

## 명령어 유틸리티

3가지 다른 종류의 명령어 외에도, 명령어 유틸리티를 사용할 수 있습니다. 이들은 모든 종류의 명령과 함께 여는 태그에서 선언되며 작동합니다. 사용 가능한 명령어 유틸리티는 다음과 같습니다:

- [공백 제어(Whitespace Control)](./whitespace-control-ko.md)
- [동적(Dynamic) 명령](./dynamic-command-ko.md)