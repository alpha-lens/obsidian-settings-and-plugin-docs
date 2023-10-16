---
created: 2023-10-14 T17:40
updated: 2023-10-14 T19:04
---
# 용어

[Templater](https://github.com/SilentVoid13/Templater)의 작동 방식을 이해하기 위해 몇 가지 용어를 정의해 보겠습니다.

- **템플릿(Template)**은 **[명령어](./commands/overview-ko.md)**를 포함하는 파일입니다.
- 여는 태그 `로 시작하고 닫는 태그 `로 끝나는 텍스트 조각을 우리는 **[명령어](./commands/overview-ko.md)**라고 부릅니다.
- **함수(Function)**는 **명령어** 내에서 호출할 수 있는 값을 반환하는 객체입니다.

사용할 수 있는 두 가지 종류의 함수가 있습니다:

- [내부 함수(Internal functions)](./internal-functions/overview-ko.md): 플러그인에 내장된 미리 정의된 함수입니다. 예를 들어, `tp.date.now`는 현재 날짜를 반환하는 내부 함수입니다.
- [사용자 함수(User functions)](./user-functions/overview-ko.md): 사용자가 직접 정의한 함수입니다. 사용자 스크립트나 시스템 명령일 수 있습니다.

### 예시

다음 템플릿은 2개의 명령어를 포함하며, 각각 다른 내부 함수를 호출합니다:

```
Yesterday: 2023-10-13
Tomorrow: 2023-10-15
```

다음 파트에서 해당 명령어를 작성하는 데 필요한 구문을 살펴보겠습니다.