---
created: 2023-10-14 T19:06
updated: 2023-10-14 T21:49
---
# Dataview 개발하기

Dataview는 고수준 플러그인 API와 TypeScript 정의, 유틸리티 라이브러리를 포함하고 있습니다. 설치하려면 다음과 같이 하시면 됩니다:

```bash
npm install -D obsidian-dataview
```

**참고**: 로컬 시스템에 [Git](http://git-scm.com/)이 이미 설치되어 있지 않은 경우, 먼저 설치해야 합니다. Git 설치를 완료하려면 장치를 재시작해야 할 수도 있습니다.

##### Dataview API에 접근하기

`getAPI()` 함수를 사용하여 Dataview 플러그인 API를 얻을 수 있습니다. 이는 `DataviewApi` 객체를 반환하며, 데이터뷰 렌더링, 데이터뷰 버전 확인, 데이터뷰 이벤트 라이프사이클에 연결 및 데이터뷰 메타데이터 쿼리 등 다양한 유틸리티 기능을 제공합니다.

```ts
import { getAPI } from "obsidian-dataview";

const api = getAPI();
```

사용 가능한 전체 API 정의는 [index.ts](https://github.com/blacksmithgu/obsidian-dataview/blob/master/src/index.ts)나 플러그인 API 정의인 [plugin-api.ts](https://github.com/blacksmithgu/obsidian-dataview/blob/master/src/api/plugin-api.ts)에서 확인할 수 있습니다.

##### Dataview 이벤트에 바인딩하기

다음과 같이 데이터뷰 메타데이터 이벤트에 바인딩할 수 있습니다. 이는 모든 파일 업데이트와 변경 시 발생합니다.

```ts
plugin.registerEvent(plugin.app.metadataCache.on("dataview:index-ready", () => {
    ...
});

plugin.registerEvent(plugin.app.metadataCache.on("dataview:metadata-change",
    (type, file, oldPath?) => { ... }));
```

MetadataCache에 연결된 모든 이벤트에 대해서는 [index.ts](https://github.com/blacksmithgu/obsidian-dataview/blob/master/src/index.ts)를 확인하세요.

##### 값 유틸리티

`Values`를 통해 객체의 유형을 확인하고 비교할 수 있는 다양한 유틸리티에 접근할 수 있습니다:

~~~ts
import { getAPI, Values } from "obsidian-dataview";

const field = getAPI(plugin.app)?.page('sample.md').field;
if (!field) return;

if (Values.isHtml(field)) // 무언가 실행
else if (Values.isLink(field)) // 무언가 실행
// ...
~~~