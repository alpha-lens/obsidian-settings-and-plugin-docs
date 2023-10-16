---
created: 2023-10-14 T17:40
updated: 2023-10-14 T19:04
---
# 소개

[Templater](https://github.com/SilentVoid13/Templater)는 노트에 **변수**와 **함수** 결과를 삽입할 수 있는 템플릿 언어입니다. 또한 해당 변수와 함수를 조작하는 JavaScript 코드를 실행할 수도 있습니다.

[Templater](https://github.com/SilentVoid13/Templater)를 사용하면 수동 작업을 자동화하기 위한 강력한 템플릿을 생성할 수 있습니다.

## 간단한 예제

다음은 [Templater](https://github.com/SilentVoid13/Templater) 구문을 사용하는 템플릿 파일의 예입니다:

```javascript
---
creation date: 2023-10-10 19:35
modification date: 화요일 10일 10월 2023 19:35:34
---

<< [[2023-10-13]] | [[2023-10-15]] >>

# settings

> Imagination rules the world.
> — <cite>Napoleon</cite>
```

위의 템플릿을 삽입하면 다음과 같은 결과가 생성됩니다:

````
---
creation date: 2021-01-07 17:20
modification date: Thursday 7th January 2021 17:20:43
---

<< [[2021-04-08]] | [[2021-04-10]] >>

# 테스트 테스트

> 더 잘 알 때까지 최선을 다하세요. 그리고 더 잘 알 때 더 잘하세요.
> &mdash; <cite>Maya Angelou</cite>
````