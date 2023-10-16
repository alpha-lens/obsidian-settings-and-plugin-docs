---
publish: true
---

# 백링크 스타일링하는 방법

<span class="related-pages">#css #feature/backlinks </span>

## 동기와 전제 조건

Tasks 결과에서 각 작업은 기본적으로 파일 이름과 이전 헤딩의 이름과 함께 `(ACME > Steps to world domination)`와 같이 표시됩니다. 이를 **[[백링크|Backlink]]**라고 합니다.

백링크의 모습을 변경하고 싶다면, 이 가이드에서는 백링크의 외관을 수정하는 방법을 보여줍니다.

Obsidian에서 [CSS 스니펫 사용하는 방법](https://help.obsidian.md/How+to/Add+custom+styles#Use+Themes+and+or+CSS+snippets)을 알고 있다고 가정합니다.

## 기본 백링크 스타일

다음은 출력의 구성 요소를 숨기지 않는 예제 작업 블록입니다: 때로는 각 작업에 있는 모든 정보를 볼 수 있어야 할 수도 있습니다.

    ```tasks
    not done
    description includes trash
    ```

다음 스크린샷은 샘플 데이터와 함께 기본 백링크 스타일이 어떻게 보일 수 있는지를 보여줍니다:

![기본 백링크 스타일로 표시된 Tasks](../images/backlinks-default-style.png)

백링크(파란색 파일 이름과 헤딩 이름)가 시각적으로 매우 도미넌트하게 나타나는 것에 주목하세요.

## 내장된 옵션 사용하기

`hide backlink`를 사용할 수도 있지만, 그렇게 하면 소스 파일로 이동할 수 있는 기능이 사라집니다.

또한 `short mode`를 사용할 수도 있으며, 이렇게 하면 백링크 텍스트가 아이콘으로 대체되지만 마감 일자나 반복 등과 같은 작업의 다른 속성들도 숨겨집니다.

## CSS를 사용하여 백링크 강조 줄이기

[이 CSS 스니펫](https://github.com/obsidian-tasks-group/obsidian-tasks/blob/gh-pages/resources/sample_vaults/Tasks-Demo/.obsidian/snippets/tasks-plugin-backlinks-small-grey.css)을 사용하여 백링크의 텍스트 크기를 줄여서 회색으로 감소시킬 수 있습니다:

<!-- snippet: resources/sample_vaults/Tasks-Demo/.obsidian/snippets/tasks-plugin-backlinks-small-grey.css -->
```css
/* By David Phillips (autonia) https://github.com/autonia
   From https://github.com/obsidian-tasks-group/obsidian-tasks/discussions/622#discussioncomment-2649299
*/
.tasks-backlink {
    font-size: 0.7em;
    opacity: 0.6;
    filter: grayscale(60%);
}
```
<!-- endSnippet -->

그러면 다음과 같은 결과가 나타납니다:

![작은 회색 백링크가 있는 작업](../images/backlinks-snippet-tasks-plugin-backlinks-small-grey.png)

## CSS를 사용하여 백링크를 아이콘으로 대체하기

또한 [이 CSS 스니펫](https://github.com/obsidian-tasks-group/obsidian-tasks/blob/gh-pages/resources/sample_vaults/Tasks-Demo/.obsidian/snippets/tasks-plugin-backlinks-icon.css)을 사용하여 백링크 텍스트를 아이콘으로 바꿀 수 있습니다:

<!-- snippet: resources/sample_vaults/Tasks-Demo/.obsidian/snippets/tasks-plugin-backlinks-icon.css -->
```css
/* By Anna Kornfeld Simpson (@AnnaKornfeldSimpson) https://github.com/AnnaKornfeldSimpson
   From https://github.com/obsidian-tasks-group/obsidian-tasks/discussions/834#discussioncomment-3028600

   Then converted to embed the icon inside this .css file, to remove the need
   for an internet connection, as follows:
   1. Link icon downloaded from https://twemoji.twitter.com
      https://github.com/twitter/twemoji/blob/master/assets/svg/1f517.svg
      licensed under the CC-BY 4.0
   2. SVG encoded for embedding here with https://yoksel.github.io/url-encoder/

Tasks 3.0.0 compatibility note.

    Prior to Tasks 3.0.0, the first CSS line below was the following, with a '>'
    separator.

li.plugin-tasks-list-item > span.tasks-backlink > a {
*/
li.plugin-tasks-list-item span.tasks-backlink > a {
    content: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36'%3E%3Cpath fill='%238899A6' d='M15 9l6-6s6-6 12 0 0 12 0 12l-8 8s-6 6-12 0c-1.125-1.125-1.822-2.62-1.822-2.62l3.353-3.348S14.396 18.396 16 20c0 0 3 3 6 0l8-8s3-3 0-6-6 0-6 0l-3.729 3.729s-1.854-1.521-5.646-.354L15 9z'/%3E%3Cpath fill='%238899A6' d='M20.845 27l-6 6s-6 6-12 0 0-12 0-12l8-8s6-6 12 0c1.125 1.125 1.822 2.62 1.822 2.62l-3.354 3.349s.135-1.365-1.469-2.969c0 0-3-3-6 0l-8 8s-3 3 0 6 6 0 6 0l3.729-3.729s1.854 1.521 5.646.354l-.374.375z'/%3E%3C/svg%3E");
    height: .9em;
}
```
<!-- endSnippet -->

그러면 다음과 같은 결과가 나타납니다:

![백링크 아이콘이 있는 작업](../images/backlinks-snippet-tasks-plugin-backlinks-icon.png)
