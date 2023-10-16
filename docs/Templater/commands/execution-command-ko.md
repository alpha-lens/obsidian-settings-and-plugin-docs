---
created: 2023-10-14 T17:59
updated: 2023-10-14 T18:57
---
# JavaScript 실행 명령어

이 유형의 명령어를 사용하면 JavaScript 코드를 실행할 수 있습니다.

JavaScript 실행 명령어를 사용하면 JavaScript가 허용하는 거의 모든 작업을 수행할 수 있습니다. 아래에 일부 예시가 제공됩니다.

이 유형의 명령에서도 `tp` 객체와 모든 내부 변수/함수에 여전히 접근할 수 있습니다.

JavaScript 실행 명령어를 사용하면 전역 네임스페이스 변수에 액세스할 수 있습니다. 이는 `app` 또는 `moment`와 같은 요소에 액세스할 수 있다는 것을 의미합니다.

## 비동기 함수

일부 내부 함수는 비동기적입니다. 이러한 함수를 JavaScript 실행 명령어 내에서 호출할 때 필요한 경우 `await` 키워드를 사용하는 것을 잊지 마세요.

## JavaScript 실행 명령에서 값을 출력하는 방법은?

때로는 JS 실행 명령을 사용할 때 출력하고 싶은 것이 있을 수 있습니다.

우리의 템플릿 엔진이 모든 결과로 대체 문자열을 생성하여 처리된 파일 콘텐츠가 저장되는 변수 이름은 `tR`입니다. 이 문자열은 처리된 파일 콘텐츠를 포함합니다. JS 실행 명령에서 해당 변수에 접근할 수 있는 권한이 부여됩니다.

즉, JS 실행 명령에서 무언가를 출력하려면 출력할 내용을 `tR` 문자열 변수에 추가하기만 하면 됩니다.

예를 들어, 다음 명령어: `<%* tR += "test" %>`는 `test`를 출력합니다.

### 제안자(Suggesters)와 프롬프트(Prompts)

`tp.system.prompt()`와 `tp.system.suggester()`는 모두 변수에 값을 저장하기 위해 `await` 문을 사용해야 한다는 점에 유의해야 합니다.

## 예시

JavaScript 실행 명령어를 사용하여 수행할 수 있는 일부 예시입니다:

```javascript
	<%* if (tp.file.title.startsWith("Hello")) { %>
	This is a hello file !
	<%* } else { %>
	This is a normal file !
	<%* } %>
	    
	<%* if (tp.frontmatter.type === "seedling") { %>
	This is a seedling file !
	<%* } else { %>
	This is a normal file !
	<%* } %>
	    
	<%* if (tp.file.tags.contains("#todo")) { %>
	This is a todo file !
	<%* } else { %>
	This is a finished file !
	<%* } %>
	
	<%* function log(msg) {console.log(msg);} %>
	<%* log("Title: " + tp.file.title) %>
	    
	<%* tR += tp.file.content.replace(/stuff/, "things"); %>
```
