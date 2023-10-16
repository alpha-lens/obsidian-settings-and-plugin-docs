---
created: 2023-10-14 T19:05
updated: 2023-10-14 T21:49
---
# 개요

Dataview JavaScript API는 dataview 인덱스와 쿼리 엔진에 액세스하여 복잡한 뷰나 다른 플러그인과의 상호 운용성에 유용한 임의의 JavaScript를 실행할 수 있습니다. 이 API는 플러그인을 위한 버전과 사용자를 위한 버전(또는 '인라인 API 사용')으로 제공됩니다.

## 인라인 액세스

다음을 통해 "DataviewJS" 블록을 생성할 수 있습니다:

~~~
```dataviewjs
dv.pages("#thing")...
```
~~~

이러한 코드 블록에서 실행되는 코드는 `dv` 변수에 액세스할 수 있으며, 이 변수를 통해 코드 블록과 관련된 dataview API 전체(`dv.table()`, `dv.pages()` 등)에 접근할 수 있습니다. 자세한 정보는 [코드블록 API 참조](./code-reference-ko.md)를 확인하세요.

## 플러그인 액세스

`app.plugins.plugins.dataview.api`를 통해 다른 플러그인이나 콘솔에서 Dataview Plugin API에 접근할 수 있습니다. 이 API는 코드블록 참조와 유사하지만, 쿼리를 실행하는 암시적 파일이 없기 때문에 약간 다른 인수를 가지고 있습니다. 자세한 정보는 [프로그램 인터페이스(API) 참조](./code-reference-ko.md)를 확인하세요.