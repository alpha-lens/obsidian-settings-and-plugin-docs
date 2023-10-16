---
publish: true
---

# Tasks API

<span class="related-pages">#plugin/quickadd</span>

## Tasks API 인터페이스

> [!released]
Tasks API 인터페이스는 Tasks 2.0.0에서 도입되었습니다.

Tasks는 다른 플러그인, 스크립트 또는 동적 코드 블록에서 Tasks를 통합하는 데 사용할 수 있는 API를 제공합니다.

Tasks API는 `app.plugins.plugins['obsidian-tasks-plugin'].apiV1`에서 사용할 수 있습니다. 여기서 `app`은 Obsidian 앱입니다. Obsidian 앱에 대한 참조는 일반적으로 `this.app`을 통해 사용할 수 있지만, 실행 스크립트의 컨텍스트에 따라 달라집니다.

이것은 API가 노출하는 인터페이스입니다:

```typescript
/**
 * Tasks API v1 interface
 */
export interface TasksApiV1 {
    /**
     * 작업 UI를 열고 입력된 작업의 Markdown 문자열을 반환합니다.
     *
     * @returns {Promise<string>} 작업의 Markdown 문자열이 포함된 프로미스이며, 데이터 입력이 취소된 경우 빈 문자열을 반환합니다.
     */
    createTaskLineModal(): Promise<string>;
}
```

## `createTaskLineModal(): Promise<string>;`

> [!released]
이 메서드는 Tasks 2.0.0에서 도입되었습니다.

이 메서드는 Tasks [[작업 생성 또는 편집|작업 생성 또는 편집 UI]]를 열고 입력된 작업의 Markdown을 반환합니다.
데이터 입력이 취소된 경우 빈 문자열이 반환됩니다.

### 기본 사용법

```javascript
const tasksApi = this.app.plugins.plugins['obsidian-tasks-plugin'].apiV1;
let taskLine = await tasksApi.createTaskLineModal();

// 반환된 값을 원하는 대로 사용하세요.
// 작업의 Markdown을 포함한 문자열입니다.
console.log(taskLine);
```

> [!warning]
> 이 함수는 `Promise`를 반환합니다. 항상 결과를 `await` 해야 합니다!

### QuickAdd와 함께 사용하기
가장 일반적인 사용 시나리오 중 하나는 아마도 [QuickAdd](https://github.com/chhoumann/quickadd) 플러그인과 함께 사용하여 특정 파일에 자동으로 작업을 추가하는 것입니다.

이를 위해 다음 코드를 캡처 형식으로 입력해야 합니다:

<!-- markdownlint-disable code-fence-style -->
~~~markdown
```js quickadd
return await this.app.plugins.plugins['obsidian-tasks-plugin'].apiV1.createTaskLineModal();
```
~~~
<!-- markdownlint-enable code-fence-style -->

자세한 내용은 [QuickAdd - 인라인 스크립트](https://quickadd.obsidian.guide/docs/InlineScripts)를 참조하십시오.

#### QuickAdd 캡처 생성

다음 단계를 따라 다음 옵션들이 나타나도록 하세요 (QuickAdd 0.12.0에서 테스트되었습니다):

![스크린샷 - QuickAdd 캡처 생성](../../images/quickadd-settings-create-capture.png)

1. QuickAdd 옵션을 엽니다.
2. `Name` 상자에 `작업 추가`라고 입력합니다.
3. `Template` 버튼을 클릭하고 `Capture`를 선택합니다.
4. `Add Choice`를 클릭합니다.

#### QuickAdd 캡처 구성

![스크린샷 - QuickAdd 캡처 구성 열기](../../images/quickadd-settings-configure-capture.png)

1. 추가된 새로운 행에서 톱니바퀴(⚙) 아이콘을 클릭합니다.
2. 아래의 값을 입력하세요. (`Capture format` 상자에 입력할 코드는 위에서 확인하세요.)

QuickAdd 캡처 설정 스크린샷 (예시)
![스크린샷 - QuickAdd 캡처 구성 수정](../../images/api-create-taskline-modal-quickadd-capture-example.png)