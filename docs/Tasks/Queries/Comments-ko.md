---
publish: true
---

# 주석

`#` 문자로 시작하는 모든 쿼리 줄은 주석으로 처리되어 무시됩니다.

예시:

    ```tasks
    not done
    # short mode를 활성화하려면 다음 줄의 주석을 해제하세요:
    # short mode
    ```

## 인라인 주석

> [!released]
> 인라인 주석은 Tasks 4.7.0에서 도입되었습니다.

[Mustache.js](https://www.npmjs.com/package/mustache) 주석도 한 줄 내에서 사용할 수 있습니다:

    ```tasks
    not done
    short mode {{! 이 주석은 무시될 것입니다 }}
    ```

`{{!`와 `}}` 사이의 텍스트는 무시됩니다. 여러 줄의 주석은 지원되지 않습니다 (아마도 [줄 계속](Line Continuations)과 함께 사용할 수는 있습니다).