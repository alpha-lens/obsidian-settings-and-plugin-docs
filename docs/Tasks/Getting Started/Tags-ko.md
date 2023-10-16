# 태그

## 태그란 무엇인가요?

Obsidian의 [태그 문서](https://help.obsidian.md/ko/editing-and-formatting/formatting-syntax#%ED%83%9C%EA%B7%B8)에는 다음과 같이 설명되어 있습니다:

> [!Quote]
> 태그는 원하는 노트를 빠르게 찾을 수 있도록 도와주는 키워드나 주제입니다.<br>
> 태그를 생성하려면 편집기에 해시태그 기호 (#)를 입력한 후 키워드를 입력하면 됩니다. 예: `#미팅`.

## 왜 태그를 사용해야 하나요?

태그 선택은 개인적인 결정입니다.

하지만 Tasks와 함께 사용할 수 있는 유용한 태그 예시 몇 가지를 살펴보겠습니다:

- GTD(Going Things Done) 개념을 위한 컨텍스트와 같은 것들:
  - `#context/work`, `#context/home/ground-floor`
- 하루 시작과 종료할 때 할 일:
  - `#when/morning`, `#when/evening`
- 분류:
  - `#🏢/companyA`

## 작업과 작업 라인에서의 태그

### 간단한 경우

태그를 해시태그 기호(`#`)로 시작하고 다음 문자 중 하나로 구성한다면, 아래 [[#Recognising Tags]] 섹션의 자세한 내용은 무시해도 됩니다.

- 알파벳 문자
- 밑줄(`_`)
- 하이픈(`-`)
- 슬래시(`/`)

### 태그 인식하기

Obsidian과 Tasks에서는 태그 인식 방식에 중요한 차이점이 있습니다.

> [!Info]
> 이러한 차이점들을 [issue #929](https://github.com/obsidian-tasks-group/obsidian-tasks/issues/929)에서 추적하고 있습니다.<br>
> 현재 Tasks에서의 태그 인식 방식이 Obsidian과 일관성을 가지도록 수정될 지 여부는 결정되지 않았습니다.

| 상황                                        | Obsidian                                                                                                                                                                                                                                                                                                                                                                             | Tasks 플러긴                                                                                                                 |
|---------------------------------------------| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| 허용되는 문자                              | <p>Obsidian의 [Tag format](https://help.obsidian.md/ko/editing-and-formatting/formatting-syntax/#tag-format) 참조</p><ul><li>알파벳 문자</li><li>숫자</li><li>밑줄 (`_`)</li><li>하이픈 (`-`)</li><li>[중첩된 태크](https://help.obsidian.md/ko/editing-and-formatting/formatting-syntax/#nested-tags)에 대해서만 슬래시 (`/`)</li></ul><p>tag 이름에 숫자가 포함되어야 합니다.</p>| <p>`space` 제외 모든 문자</p><ul><li>`!@#$%^&*(),.?":{}\|&lt;&gt;` 제외 </ul></p>| 
| 숫자만으로 이루어진 tags                     | tag 이름에 숫자가 포함되어야 합니다.<br>`1234`와 같은 경우 tag로 인식하지 않습니다.                                                                                                                                                                                                                                                                                                  | 모든 숫자로 이루어진 tags 에 대해 제약 없음<br>`1234`와 같은 경우 tag로 인식합니다.                                               |
| 부동 소수점 숫자처럼 보이는 tags             | tag 이름에 숫자가 포함되어야 합니다.<br>`12.34`와 같은 경우 tag로 인식하지 않습니다.                                                                                                                                                                                                                                                                                               | 모든 숫자로 이루어진 tags 에 대해 제약 없으며, `.`` 은 tag 에서 사용할 수 없습니다.<br>`12.34`라고 쓰여져 있다면, 실제론 `12`. 로 처리됩니다.|  
| `%%` 주석 안의 text                        | 무시됩니다.                                                                                                                                                                                                                                                                                                                                                                          | 인식됩니다.                                                                                                                  |
| `<!-- .... -->`` 주석 안의 text              | 무시됩니다.                                                                                                                                                                                                                                                                                                                                                                          | 인식됩니다.                                                                                                                  |

### YAML, Frontmatter 또는 파일 속성에서 사용하는 방법

Obsidian은 메모 시작 부분에 속성(옵션)을 추가할 수 있도록 해줍니다.

여기 예제가 있는데 그 중에서도 "tags"라고 하는 속성을 사용합니다:

```text
---
tags:
 - 🏷/some_tag
 - 🏢/companyA
---
```

Tasks 현재 해당 데이터를 읽지 않습니다.[discussion #232](https://github.com/jaygkay/Tasks-for-Obsidian/discussions/232).

현재 상황에서 [[Dataview]] 와 Task 함께 활용하여 우회적으로 작업 할 수 있는 방법은 [[Tags#wrapper-find-tasks-in-notes-with-particular-tag]] 페이지를 참조하세요.


### 작업 라인 내부의 태크 위치 정하기

- 어떤 위치든 어떤 순서든 상관없이 작업 내부에 들어갈 수 있으며,
  - 우선순위 등과 섞일 수 있습니다.
  - [[Auto-Suggest#wrapper-order-of-items-in-a-task]] 페이지 참조
- 그러나 Lines are edited by Tasks (예: [[Create or edit Task]] Modal), task completion 시, tags 가 변경 될수있습니다.
 
## 제한 사항

- [[Create or edit Task|‘Create or edit Task’ Modal]]의 Description 필드에서는 태그를 입력하는 동안 자동 완성 기능이 제공되지 않습니다.
  - 이에 대해서는 [discussion #229](https://github.com/obsidian-tasks-group/obsidian-tasks/discussions/229)에서 추적하고 있습니다.
- 전역 필터에 태그를 사용하는 경우, 검색어에 해당 태그를 포함하지 마십시오.
- Tasks는 태그(또는 다른 정보)를 파일 Frontmatter/YAML/속성에서 읽지 않습니다. 태그 값은 작업 라인에서만 읽힙니다.
  - 이에 대해서는 [discussion #232](https://github.com/obsidian-tasks-group/obsidian-tasks/discussions/232)에서 추적하고 있습니다.
  - YAML, Frontmatter 또는 파일 속성에서 작업하기 위해 Dataview와 Tasks를 함께 사용하는 우회 방법은 [[Tags#YAML, Frontmatter 또는 파일 속성에서 태그 사용하기]]을 참조하세요.

## 태그와 전역 필터

> [!Warning]
> 전역 필터가 활성화되어 있고, 해당 필터가 태그인 경우, **Tasks 검색에서 해당 전역 필터 태그를 사용하지 마십시오**.
> Tasks는 작업 라인을 읽을 때 전역 필터 태그를 제거하므로 예상한 결과를 얻을 수 없습니다.

## 관련 작업 블록 지시사항

다음 지시사항은 작업 라인의 태그를 사용합니다.

- `no tags`
- `has tags`
- `tags (include|do not include) <tag>` _또는_
- `tag (includes|does not include) <tag>`
- `tags (regex matches|regex does not match) /<JavaScript-style Regex>/` _또는_
- `tag (regex matches|regex does not match) /<JavaScript-style Regex>/`
  - [[Filters#tags|문서]]
- `sort by tag`
- `sort by tag 2`
  - [[Sorting#tags|문서]]
- `group by tags`
  - [[Grouping#tags|문서]]
- `hide tags`
  - [[Layout|문서]]
- 커스텀 필터 및 그룹에서는 'task.tags'로 접근 가능
  - [[Task Properties#기타 작업 속성 값들에 대한 정보]]