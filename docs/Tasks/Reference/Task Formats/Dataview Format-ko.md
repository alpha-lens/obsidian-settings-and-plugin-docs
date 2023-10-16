---
publish: true
---

# Dataview 형식

<span class="related-pages">#task-formats #task-format/dataview #plugin/dataview</span>

## Dataview 형식의 읽기 및 쓰기

> [!릴리스]
> Tasks 3.3.0에서 소개되었습니다.

Tasks는 이제 작업 라인에 데이터를 추가하는 데 사용되는 dataview 플러그인의 텍스트 기반 형식을 지원하고 있습니다.

> [!경고]
> 현재 dataview 형식 지원은 부분적으로 구현되었으며 dataview 동작과 몇 가지 중요한 차이점이 있습니다.
>
> 호환성을 개선하기 위해 노력하겠지만, 그동안 **이 페이지를 주의 깊게 읽어 주십시오**.

## 대괄호 안의 인라인 필드

Tasks는 특히 작업 목록 항목에서 [Dataview의 대괄호 안의 인라인 필드](https://blacksmithgu.github.io/obsidian-dataview/annotation/add-metadata/#inline-fields)를 읽습니다.

즉, `key:: value` 문자열을 작업 라인의 대괄호 `[]` 또는 괄호 `()`로 감싸서 작성해야 합니다.

그러나 Tasks가 작업 라인을 *쓸 때*, 항상 대괄호 `[]`로 쓰기 때문에 초기에 괄호 `()`로 작성하더라도 항상 대괄호로 작성됩니다.

대괄호 `[]`와 괄호 `()`는 [Dataview에서 표시되는 방식](https://blacksmithgu.github.io/obsidian-dataview/annotation/add-metadata/#inline-fields)에서 차이가 있습니다. 괄호 구문을 사용하면 Dataview는 필드 값만 표시하고 키를 표시하지 않습니다.

### 라이브 프리뷰에서 올바른 표시를 보장하기 위한 사항

> [!팁]
> 소스 또는 라이브 프리뷰에서 **dataview 필드 중 하나라도 밑줄이 그어진 경우**, 라이브 프리뷰에서 모든 데이터를 볼 수 있도록 **필드를 분리**해야 합니다. 다음 중 하나로 필드를 분리하십시오:
>
> - 2개의 공백
> - 쉼표와 공백
>
> [[작업 만들기 또는 편집]] 모달은 dataview 필드 사이에 자동으로 2개의 공백을 넣습니다.

> [!경고]
> `[Text][More Text]`은 [참조형 스타일 링크](https://daringfireball.net/projects/markdown/syntax#link)라는 마크다운 기능입니다.
>
> Obsidian에서 라이브 프리뷰가 **활성화된 경우**, Obsidian은 두 번째 대괄호 내의 모든 내용을 **숨깁니다**.
>
> 따라서 여러 인라인 필드가 있는 작업:
>
> ```text
> - [ ] This is a task [priority:: high] [start:: 2023-04-24] [due:: 2023-05-01]
> ```
>
> 라이브 프리뷰가 활성화된 경우 다음과 같이 보입니다:
>
> > - [ ] This is a task <u>priority:: high</u> [due:: 2023-05-01]
>
> ---
>
> 이 문제는 Tasks 플러그인의 범위를 벗어난 것이지만 다음의 해결책 중 하나를 사용하여 해결할 수 있습니다:
>
> - Obsidian에서 라이브 프리뷰를 **끕니다**.
> - 각 필드를 최소한 2개의 공백으로 분리합니다.
>
> > [!예시]
>   >
>   > ```text
>   >  - [ ] This is a task [priority:: high]  [start:: 2023-04-24]  [due:: 2023-05-01]
>   >  ```
>
> - 각 필드를 쉼표로 분리합니다.
>
> > [!예시]
>   >
>   > ```text
>   >  - [ ] This is a task [priority:: high], [start:: 2023-04-24], [due:: 2023-05-01]
>   > ```

## 지원되는 Dataview 필드

다음 예시에서는 Tasks 플러그인이 dataview 필드를 파싱하는 데 지원되는 모든 필드를 보여줍니다.

> [!팁]
> 아래의 모든 예제에서 필드는 대괄호 `[...]`로 표시됩니다.
>
> Tasks는 또한 괄호 `(...)`에서 dataview 필드를 읽습니다.

### 날짜용 Dataview 형식

이 이름들은 [dataview의 문서](https://blacksmithgu.github.io/obsidian-dataview/annotation/metadata-tasks/#field-shorthands)에서 동일한 필드와 일치합니다.

```markdown
- [ ] #task 만들어진 날짜가 있는 작업 [created:: 2023-04-17]
- [ ] #task 예정 날짜가 있는 작업 [scheduled:: 2023-04-14]
- [ ] #task 시작 날짜가 있는 작업 [start:: 2023-04-15]
- [ ] #task 마감 날짜가 있는 작업 [due:: 2023-04-16]
- [x] #task 완료 날짜가 있는 작업 [completion:: 2023-04-17]
```

자세한 정보는 [[날짜]]를 참조하세요.

### 우선순위용 Dataview 형식

> [!정보]
> 이 이름들은 Tasks에서 사용하기 위해 선택된 것으로 dataview에서 알려진 이름이 아닙니다. 물론 dataview에서 검색할 수 있습니다.

<!-- 스니펫: DocsSamplesForTaskFormats.test.Serializer_Priorities_dataview-snippet.approved.md -->
```md
- [ ] #task 가장 낮은 우선순위  [priority:: lowest]
- [ ] #task 낮은 우선순위  [priority:: low]
- [ ] #task 보통 우선순위
- [ ] #task 중간 우선순위  [priority:: medium]
- [ ] #task 높은 우선순위  [priority:: high]
- [ ] #task 가장 높은 우선순위  [priority:: highest]
```
<!-- endSnippet -->

자세한 정보는 [[우선순위]]를 참조하세요.

### Recurrence 용 Dataview 포맷

> [!정보]
> 이 이름은 Tasks에서 사용하기 위해 선택된 것으로 [dataview 기능 요청 #878](https://github.com/blacksmithgu/obsidian-dataview/issues/878)에서 제안되었으며 dataview에서 아직 알려지지 않았습니다. 물론 dataview에서 검색할 수 있습니다.

```markdown
- [ ] #task 반복 작업입니다 [repeat:: every day when done]
```

자세한 정보는 [[Recurring Tasks-ko|재발용 작업]]을 참조하세요.

## Auto-Suggest 및 Dataview 형식

Dataview 형식은 Tasks의 [[자동 제안]] 기능을 완전히 지원하지만 사용자는 수동으로 대괄호 (`[]` 또는 `()`)를 입력해야 합니다. 이 기능은 `설정 > 편집기 > 자동 대괄호 쌍`이 활성화된 경우 가장 잘 작동합니다.

Tasks 4.6.1 이후로 자동 제안 메뉴는 대괄호 `[]` 또는 괄호 `()` 사이에서만 나타납니다.

## Dataview 형식의 제한 사항

필수 독서 자료:

- [[About Task Formats-ko#Impact of non-default formats on Tasks behaviour|작업 형식 정보#작업 형식이 기능에 미치는 영향]]
- [[About Task Formats-ko#Limitations of task format support|작업 형식 정보#작업 형식 지원 제한]]

Dataview의 자체 작업 라인 구문 분석과 비교하여 추가 제한 사항:

- Tasks는 아직 작업 라인 내의 Dataview 필드를 어디에서든 임의로 읽을 수 없습니다. Dataview가 이를 허용하더라도 현재는 작업 라인을 일치하는 전역 필터 중 하나와 일치해야 하는 작업 라인에서만 Dataview 필드를 읽습니다.
  - Dataview는 [frontmatter](https://blacksmithgu.github.io/obsidian-dataview/annotation/add-metadata/#frontmatter)에서 필드를 읽지 않습니다.
  - [인라인 필드](https://blacksmithgu.github.io/obsidian-dataview/annotation/add-metadata/#inline-fields)는 이미 작업으로 간주되는 라인 외부에서도 읽지 않습니다.