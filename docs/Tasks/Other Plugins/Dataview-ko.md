---
publish: true
---

# Dataview와 Tasks 결합하기

<span class="related-pages">#plugin/dataview #task-format/dataview </span>

## Tasks와 dataview

> [!released]
> dataview 형식의 파싱은 Tasks 3.3.0에서 소개되었습니다.

Tasks는 이제 [[Dataview Format]]에서 데이터를 읽는 부분적인 지원을 제공합니다.

## Tasks와 Dataview의 호환성 향상

[Dataview](https://github.com/blacksmithgu/obsidian-dataview) 플러그인은 Obsidian 보관소에 대한 다양한 데이터 분석 기능을 제공합니다. 이는 작업에 대한 쿼리를 포함합니다.
이 섹션에서는 Dataview와 Tasks 사이의 호환성을 극대화하기 위한 설정만 설명하며, 작업 이모지 필드에 대한 다른 정보 및 설정 등은 [문서](https://blacksmithgu.github.io/obsidian-dataview/data-annotation/#tasks)를 참조하세요.

> Dataview 0.5.43부터, **반복**을 제외한 모든 작업 이모지 필드를 Dataview 또는 dataviewjs를 통해 쿼리할 수 있습니다. 자세한 내용은 Datavie의 [Metadata on Tasks and Lists](https://blacksmithgu.github.io/obsidian-dataview/annotation/metadata-tasks/) 페이지를 참조하세요.

### 자동 작업 완료

> [!released]
> Datview 0.5.42에서 도입되었습니다.

Tasks에서 "모든 완료된 작업에 완료 날짜 설정" 옵션을 사용하는 경우, Datview 쿼리 결과에서 작업 체크박스를 클릭하면 `✅ YYYY-MM-DD` 완료 날짜가 추가되거나 제거되도록 Datview를 구성할 수 있습니다.
이것은 Task 쿼리 결과에서 체크박스를 클릭하거나 `Tasks: Toggle Done` 명령어를 사용하는 것과 동일한 역할을 합니다.

0. "Settings" -> "Community Plugins" -> "Check for Updates"로 가서 최신 버전으로 업데이트되어 있는지 확인하세요.
1. "Settings" -> "Datview"로 가서, 아래로 스크롤하여 "Automatic Task Completion" 설정을 활성화하세요.
2. 바로 아래에 있는 "Use Emoji Shortcut for Completion" 설정도 활성화하세요.
3. Obsidian을 닫았다가 다시 엽니다.

![작업 스타일의 완료 날짜가 활성화된 Datview 설정 페이지](../images/dataview-settings.png)
_참고: 이것은 Tasks 설정 페이지가 아닌 Datview 설정 페이지입니다._

---

> [!warning]
> dativew는 반복 작업(recurring tasks)을 인식하지 못합니다.
Dativew TASK 쿼리 결과에서 반복 작업 체크박스를 선택하면 완료 날짜가 추가되지만, 해당 반복 작업의 새 인스턴스는 생성되지 않습니다.
Dativew TASK 쿼리 결과에서 반복 작업의 올바른 동작 방식을 얻으려면, 해당 태스크가 기록된 파일로 이동하여 태스크 문자열(체크박스가 아닌 텍스트) 를 클릭 한 다음,
여기서 'Tasks: Toggle Done' 명령어나 체크박스를 클릭하세요.

## 관련 페이지

- [[현재 파일의 모든 태스크 가져오기|현재 파일의 모든 태스크 가져오기]] - Dativew 플러그인을 사용하여 Tasks 코드 블록 생성 예제입니다.Tasks 만으로 할 수 없는 일들을 수행할 수 있습니다