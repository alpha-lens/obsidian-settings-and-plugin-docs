---
publish: true
---

# 쿼리 속성

<span class="related-pages">#feature/scripting</span>

> [!released]
> 쿼리 속성은 Tasks 4.7.0에서 소개되었습니다.

## 소개

Tasks에서는 검색 쿼리를 포함하는 파일의 속성을 프로그래밍 및 스크립팅을 통해 액세스할 수 있도록 기능을 확장하고 있습니다.

- [[Placeholders-ko|플레이스홀더]]

이 페이지에서는 쿼리에서 액세스할 수 있는 모든 정보를 문서화합니다.

> [!warning]
>
> - 현재로서는 이러한 속성을 [[Placeholders-ko|플레이스홀더]]에서만 사용할 수 있습니다.
> - 플레이스홀더는 [[Custom Filters-ko|사용자 지정 필터]] 및 [[Custom Grouping-ko|사용자 지정 그룹화]]에 사용할 수 있지만 따옴표로 둘러싸여야 합니다. 예를 들어: `'{{query.file.folder}}'`.
> - 향후 릴리스에서 사용자 정의 필터 및 그룹에서 직접 `query.file.folder`와 같은 표현식을 사용할 수 있게 될 것입니다.

## 쿼리 파일 속성의 값

<!-- placeholder to force blank line before included text --><!-- include: QueryProperties.test.query_file_properties.approved.md -->

| 필드 | 유형 | 예제 |
| ----- | ----- | ----- |
| `query.file.path` | `string` | `'root/sub-folder/쿼리를 포함하는 파일.md'` |
| `query.file.pathWithoutExtension` | `string` | `'root/sub-folder/쿼리를 포함하는 파일'` |
| `query.file.root` | `string` | `'root/'` |
| `query.file.folder` | `string` | `'root/sub-folder/'` |
| `query.file.filename` | `string` | `'쿼리를 포함하는 파일.md'` |
| `query.file.filenameWithoutExtension` | `string` | `'쿼리를 포함하는 파일'` |

<!-- placeholder to force blank line after included text --><!-- endInclude -->

1. `query.file`은 `TasksFile` 객체입니다.
1. 현재의 [TasksFile 소스 코드](https://github.com/obsidian-tasks-group/obsidian-tasks/blob/main/src/Scripting/TasksFile.ts)를 확인하여 해당 기능을 탐색할 수 있습니다.
1. `.md` 파일 이름 확장자의 존재는 [[Filters-ko#File Path|path]] 및 [[Filters-ko#File Name|filename]]에서의 기존 규칙과 일치하도록 선택되었습니다.
1. `query.file.pathWithoutExtension`은 Tasks 4.8.0에서 추가되었습니다.
1. `query.file.filenameWithoutExtension`은 Tasks 4.8.0에서 추가되었습니다.
