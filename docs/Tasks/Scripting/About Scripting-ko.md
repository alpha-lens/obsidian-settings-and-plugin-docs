---
publish: true
---

# 스크립팅에 대해

<span class="related-pages">#index-pages #기능/스크립팅</span>

## 소개

이 문서는 Tasks 내에서 검색을 더 세밀하게 제어하기 위한 기능에 대한 점차적으로 확장되는 문서 세트의 시작입니다.

여기서 '스크립팅'이라는 용어를 매우 넓은 의미로 사용합니다:

- 현재로서는 Tasks 쿼리 블록에서 JavaScript 표현식을 작성하는 것만을 의미합니다.
- 시간이 지남에 따라 더 포괄적인 것으로 진화할 예정입니다.

## 플레이스홀더 기능

- [[Placeholders-ko]] - 원시 Tasks 쿼리에서 플레이스홀더 텍스트를 사용하여 쿼리를 포함하는 파일의 일부 속성(예: `{{query.file.path}}`)을 참조할 수 있습니다.

## 스크립팅 기능

- [[Custom Filters-ko|커스텀 필터]] - 짧은 JavaScript 표현식을 작성하여 작업 검색 필터를 만듭니다.
  - [[Filters-ko]] 문서에 추가된 많은 `filter by function` 예제도 참조하세요.
- [[커스텀 그룹화]] - 짧은 JavaScript 표현식을 작성하여 Tasks 쿼리 결과에서 작업 그룹 이름을 만듭니다.
  - [[Grouping-ko]] 문서에 추가된 많은 `group by function` 예제도 참조하세요.

## 스크립팅 참조

- [[Task Properties-ko]] - 사용 가능한 모든 작업 속성, 예: `task.description`, `task.file.path`.
  - 참고: 속성은 [[Quick Reference-ko]]에도 나열되어 있습니다.
- [[Query Properties-ko]] - 사용 가능한 모든 쿼리 속성, 예: `query.file.path`, `query.file.path` - [[Placeholders-ko]]를 통해 사용할 수 있습니다.
- [[Expressions-ko]] - Tasks 코드 블록에서 사용하기 위해 JavaScript 표현식이 작동하는 방법에 대한 백그라운드 정보입니다.