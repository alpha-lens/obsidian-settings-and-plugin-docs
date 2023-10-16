---
publish: false
alias: Migration to Publish
---

# Migration to Publish

할 일과 할 일 알림을 위한 마이그레이션 사항

## 새로운 사이트의 테스터를 위한 노트

### 목표

> [!success] 마이그레이션의 목표
> 이 마이그레이션의 목표:
>
> - 기존 할 일 사용자 설명서의 **직접 번역**:
>   - from: Jekyll
>   - to: Obsidian Publish
> - 모든 정보와 의미 유지
> - Python 스크립트를 사용하여 마이그레이션 가능하게 함
>   - 최종 변환 준비가 되면 마이그레이션을 반복할 수 있게 함
> - 관용적인 Obsidian 마크다운 작성
>   - **향후 문서 내용 편집 용이성을 위해**
> - 가능한 한 구조가 있는 사이트 페이지를 새로운 페이지로 리디렉션하게 함.

> [!failure] 마이그레이션의 비목표
>
> - 현재 단계에서 사이트 구조를 개선하지 않음

### 현재 상태 및 알려진 문제점

> [!todo] 아직 해야 할 일 및 알려진 문제
> 알려진 문제점 및 해결해야 할 일:
>
> - [ ] **각 폴더에서 시작 페이지를 더 명확하게 만들 필요가 있음**
>   - Python 변환 코드의 URL을 새 위치로 업데이트해야 함
> - [[Daily Agenda]] 및 [[Quick Reference]]에서 테이블이 iPhone의 Safari 및 Chrome에서 오른쪽으로 스크롤되지 않음
>   - 유용한 링크:
>     - <https://forum.obsidian.md/t/css-horizontal-scrolling-tables/26581>
>     - <https://stackoverflow.com/questions/41539803/html-table-wont-scroll-horizontal>
> - [[Styling#Complete Example]] 및 기타 섹션에서 Safari on iPhone, iOS 15.6.1에서 코멘트가 표시되지 않음
>   - Chrome on iPhone에서는 표시됨
>   - Safari에서 "콘텐츠 차단기 없이 다시로드"하면 코멘트가 표시됨
> - [[Set up custom statuses#Adding more statuses]]에서 [[Status Settings#Bulk-adding Statuses|일괄 추가 스테이터스]] 링크가 올바른 헤딩으로 이동하지 않아야 함.
>   - 일괄 추가 링크 *여기*에서는 작동합니다.
>   - 그러나 "더 많은 스테이터스 추가" 링크는 여기에서는 작동하지 않습니다 :-(
>   - 나중에: 지금은 어디서나 작동합니다.
>
> 다른 문제를 발견하면 [#1706](https://github.com/obsidian-tasks-group/obsidian-tasks/issues/1706#issuecomment-1454284835)에 **URL**과 **스크린샷**을 제공해 주십시오. 감사합니다.

> [!bug] 수정되지 않을 버그와 성가신 문제
>
> - 어떤 창 크기에서 일부 이미지가 약간 흐린 경우가 있지만 Obsidian 사용자 설명서에도 동일한 적용되므로 아무것도 할 수 없을 수 있음
> - 페이지 로드 시 페이지가 표시되기 전에 짧은 깜박임이 있습니다.
>   - Obsidian 도움말 사이트에서도 발생하므로 제어 범위를 벗어납니다.

### 검토에 도움이 될 팁

> [!tip] 팁 - 나중에 '문서 사용 방법' 페이지에 넣을 것으로 예상되는 내용
>
> - **검색**은 모든 내용을 검색하지 않음
>   - 파일 이름 (확실히) 및 헤딩 (확실히)만 검색
> - **관련 콘텐츠 찾기**
>   - 페이지 하단으로 스크롤하여 현재 페이지에 연결된 페이지를 볼 수 있음
>   - 관련 콘텐츠를 보려면 태그를 클릭
> - 섹션에 대한 **URL을 가져오는 방법**
>   - 노트 콘텐츠에서 헤더 위로 마우스를 올리면 표시되는 **아이콘**을 클릭하여 클립보드로 복사
>     - 따라서 클립보드에 값이 있는 경우 클립보드 히스토리를 사용하지 않아야 함

| 항목                                               | 소스 위치                                                                                                                 |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| [이전 문서](https://obsidian-tasks-group.github.io/obsidian-tasks/) | 주 브랜치의 [docs](https://github.com/obsidian-tasks-group/obsidian-tasks/tree/main/docs) 폴더                                                                                         |
| [새로운 문서](https://publish.obsidian.md/tasks/index) 라이브 | [port-user-guide-to-obs-publish-v3 브랜치](https://github.com/obsidian-tasks-group/obsidian-tasks/compare/main...port-user-guide-to-obs-publish-v3)의 [docs/](https://github.com/obsidian-tasks-group/obsidian-tasks/tree/port-user-guide-to-obs-publish-v3/docs) 폴더 |
| 변환 스크립트 및 테스트                                | [github.com/claremacrae/jekyll_to_obsidian_publish](https://github.com/claremacrae/jekyll_to_obsidian_publish)             |
| 작업 추적을 위한 이슈                                  | [#1706: # Migrate User Docs to Obsidian Publish, with current folder structure](https://github.com/obsidian-tasks-group/obsidian-tasks/issues/1706)          |

- [Obsidian Publish 문서](https://help.obsidian.md/Obsidian+Publish/Introduction+to+Obsidian+Publish)
- [Callouts 문서](https://help.obsidian.md/Editing+and+formatting/Callouts#Supported+types)
- [Obsidian 스타일 가이드](https://help.obsidian.md/Contributing+to+Obsidian/Style+guide)

---

나머지는 변환에 대한 상세한 노트입니다.

## 작동 원리

- [x] 다음을 수행하는 Python 스크립트 작성
  - [github.com/claremacrae/jekyll_to_obsidian_publish](https://github.com/claremacrae/jekyll_to_obsidian_publish)

## 기본 사항

### 목차

- [x] 이전 목차 블록 제거
- [x] `{: .no_toc }` 제거

### 파일 이름과 폴더

- [x] 파일의 Front Matter 내 `title`을 사용하여 파일 이름 변경
  - 모든 `index.md` 파일이 고유한 이름을 가지도록 처리
  - 이렇게 시도하면 새로운 이름이 훌륭합니다.
  - 그러나 일부는 대문자 변환으로 인해 변경되었습니다 - [[grouping]] -> [[Grouping]], 예를 들어.
  - 그런 다음 Mac의 git은 이러한 파일을 변경되지 않은 것으로 보고합니다.
  - 이 문제를 해결하기 위한 방법이 있지만 [Case-sensitive git in Mac OS X like a Pro](https://coderwall.com/p/mgi8ja/case-sensitive-git-in-mac-os-x-like-a-pro) 를 사용해야 합니다.
  - 그러나 Mac과 Windows에서 이전에 리포지토리를 클론한 사용자에게는 여전히 문제가 될 수 있습니다.
  - 다른 해결책은 문서를 새 폴더로 이동하는 것이지만, 그러면 원래의 히스토리가 손실됩니다.
- [x] 폴더 이름 변경 방법 파악 필요 - 아마도 문자열 조작을 통해
  - `getting-started`이
  - `Getting Started`로 변경
  - 'git mv' 명령어를 작성하고 각각의 상태를 확인하기 위해 수동으로 실행하는 스크립트를 작성하게 되었습니다.
- [x] Mac의 git이 파일 및 폴더 이름 변경을 인식할 수 있도록 하는 방법 파악 필요
- [x] 프로그래밍적으로 모든 파일 이름이 고유한지 확인

### 링크

- [x] 모든 내부 링크를 `[[ ]]` 형식을 사용하여 업데이트 - 파일 이름만 사용
- [x] 모든 섹션 헤딩에 대한 링크 업데이트
  - 혹시라도 #.... (헤딩 이름)에 있는 하이픈을 스페이스로 변환
  - 아마도 파일을 파싱하고 해당 헤딩을 찾아야 할 것
  - 수동으로 완료
- [x] 파일 이름과 원래 제목이 동일한 경우 `|alias`에 넣지 않음
- [x] 링크에서 파일 경로를 필요로 하지 않도록 업데이트
  - 모든 파일 이름을 고유하게 만들어서

### Frontmatter - 기타

- [x] 모든 `title:` YAML을 `alias:`로 변환 가능
  - 파일 이름을 고치지 않았음
- [x] Obsidian에서 관련이 없는 역사적인 Frontmatter 제거
  - [x] nav_order
  - [x] layout
  - [x] parent
  - [x] grand_parent
  - [x] has_toc
  - [x] has_children
  - [x] title

### Callouts

- [x] Callouts를 Obsidian 스타일로 변환
- [x] Released와 같은 사용자 정의 Callouts에 대한 CSS 추가
- [x] 읽을 때 덜 거슬리도록 Released를 Green 대신 Grey로 사용
- [x] 이러한 스타일의 "callout" 수정:

```text
<div class="code-example" markdown="1">
Warning
{: .label .label-yellow }
Folders with a comma (`,`) in their name are not supported.
</div>
```

### 서식 오류

- [x] [[Urgency]] 문서의 값 테이블 서식 - [이 댓글](https://github.com/obsidian-tasks-group/obsidian-tasks/issues/1706#issuecomment-1454284835) 참조

### 스타일링

- [x] 이전 사이트에서 새로운 사이트로 CSS 변환 (예: 모든 테이블 셀 상단 정렬)
  - Obsidian 스니펫과 publish.css 모두에서 완료
- [x] "백틱 내 텍스트"가 이전 사이트에 비해 새로운 사이트에서 충분히 두드러지지 않는 것 같습니다.
- [x] 이미지 주위에 경계선/테두리가 정말 필요합니다.
  - Obsidian 스니펫과 publish.css 모두에서 완료

### 이미지

- [-] 일부 이미지의 품질, 예를 들어 [Create or Edit dialog](https://publish.obsidian.md/tasks/getting-started/create-or-edit-task)이 매우 나쁩니다.
  - 창 크기에 따라 다를 수 있습니다.
- [ ] 이미지를 단순한 임베드로 변경, `![[]]`

### 코드 블록

- [ ] 들여쓴 코드 블록을 펜스 코드 블록으로 변환하고 언어 추가

## 이전 GitHub Pages 사이트

- [ ] 매핑/리디렉트 파일 작성:
  - `Old URL` -> `New URL`
- [ ] 파일 이름 변경 및 폴더에서 새 위치를 가리키는 별칭 사용을 테스트합니다. [Discord](https://discord.com/channels/686053708261228577/1078726185590194196/1081998454739439707) 참조.
- [ ] 이전 사이트에서 새 위치를 가리키도록 리디렉트 설정
- [x] `release.sh`를 사용하여 `gh-pages` 브랜치에 병합 중지.

## 마지막으로

마지막 변환 전 스크립트의 변경 사항:

- [x] 첫 번째 페이지 상단의 '이 사이트에 대한 정보' 배너 제거
- [x] 스크립트에서 '이전 문서 사이트에서 이 페이지 보기' 섹션 및 callouts 제거
- [x] 스크립트를 다시 작성하여 원래 내용을 'docs/'에 이름을 바꾸고 덮어쓰도록 변경 (새로운 'docs/'에 저장하는 대신).

실제 변환 수행

- [x] 마지막 변환을 위한 새 브랜치 생성
- [x] 변환 스크립트 실행
- [x] `docs-snippets/snippet-statuses-overview.md`에서 링크 업데이트
  - 아마도 변환 스크립트를 사용하여 수행합니다.
- [x] 변경 내용 커밋, 순수 '파일 이름 대/소문자 변경'이 보존되도록 '강제' 커밋을 수행합니다.
- [x] 변경 내용 푸시
- [x] 배포!!!

## 다음 단계

- [x] 이 `migration.md` 파일을 `port-user-guide-to-obs-publish-v3` 브랜치에 어딘가에 저장 - 아마 PR에 첨부될 것입니다 - 실제로 지금은 일단 `port-user-guide-to-obs-publish-v3` 브랜치에 커밋했습니다.
- [-] 파일 및 폴더 이름을 변경할 때 사용할 스크립트 작성
  - 리디렉트를 가능하게 하기 위해 원래 경로를 별칭으로 추가
  - 이것은 너무 지저분한 것으로 판단하게 되었습니다

## 기여 가이드 추가 사항

- [ ] 기여 가이드의 [Documentation section](https://publish.obsidian.md/tasks-contributing/Documentation/Omitting+a+heading+from+the+page's+Table+of+Contents) 업데이트하여 오래된 내용을 제거하고 Obsidian Publish를 위한 지침으로 나머지 내용 업데이트
  - 언급해야 할 사항
  - 파일 및 폴더 이름을 변경할 때 리디렉트를 가능하게 하는 방법(스크립트 및 별칭)
  - 스타일링을 개선하기 위한 CSS 편집 시 Obsidian과 게시된 사이트에서 일관된 모습을 위해 두 곳에 추가
  - `docs/.obsidian/snippets/`에 스니펫 추가 및 활성화
  - `docs/publish.css`에 추가

## 남은 단계

```tasks
not done

group by heading
```
