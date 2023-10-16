# 스크립트 사용자 함수

이 유형의 사용자 함수를 사용하면 JavaScript 파일에서 JavaScript 함수를 호출하고 그 결과를 검색할 수 있습니다.

스크립트 사용자 함수를 사용하려면 Templater의 설정에서 스크립트 폴더를 지정해야 합니다. 이 폴더는 보관함에서 액세스할 수 있어야 합니다.

## 스크립트 사용자 함수 정의

예를 들어, Templater의 설정에서 `Scripts` 폴더를 스크립트 폴더로 지정했다고 가정해 봅시다.

Templater는 `Scripts` 폴더에 있는 모든 JavaScript (`.js` 파일) 스크립트를 로드합니다.

그런 다음 `Scripts/my_script.js`와 같은 이름으로 스크립트 파일을 생성할 수 있습니다 (`.js` 확장자가 필요합니다).

그런 다음 해당 스크립트를 사용자 함수로 호출할 수 있습니다. 함수 이름은 스크립트 파일 이름과 일치합니다.

스크립트는 [CommonJS 모듈 사양](https://flaviocopes.com/commonjs/)을 따르고 하나의 함수만 내보내야 합니다.

이전 예제인 `my_script.js`로 예시를 살펴보겠습니다.

앞서 언급한대로, 사용자 스크립트는 이전과 같이 직접 콘솔에 출력하는 대신 결과를 `return`해야 합니다:

```javascript
function my_function (msg) {
    return `Message from my script: ${msg}`;
}
module.exports = my_function;
```

이전 예제에서 완전한 명령어 호출은 다음과 같이 보입니다:

```javascript
<% tp.user.my_script("Hello World!") %>
```

이는 콘솔에 `Message from my script: Hello World!`를 출력합니다.

## 전역 네임스페이스

스크립트 사용자 함수에서는 여전히 `app` 또는 `moment`와 같은 전역 네임스페이스 변수에 액세스할 수 있습니다.

그러나 `tp` 또는 `tR`과 같은 템플릿 엔진 범위 변수에는 액세스할 수 없습니다. 이를 사용하려면 함수의 인수로 전달해야 합니다.


## 함수 인수

함수가 어떻게 정의되었느냐에 따라 원하는 만큼 많은 인수를 함수에 전달할 수 있습니다.

예를 들어, 모든 [내부 변수/함수](../internal-variables-functions/overview-ko.md)를 사용하기 위해 `tp` 객체를 함수에 전달할 수 있습니다: `<% tp.user.<사용자_함수_이름>(tp) %>`