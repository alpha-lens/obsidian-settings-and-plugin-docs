---
publish: true
---

# 현재 파일의 모든 작업 가져오는 방법

<span class="related-pages">#feature/scripting #plugin/dataview</span>

## 동기와 가정

작업이 많은 노트에서 모든 남은 작업의 목록을 보는 것은 유용할 수 있습니다. 예를 들어, 실수로 작업을 놓치지 않도록 확인하기 위해 사용할 수 있습니다.

이 페이지에서는 이를 설정하는 방법에 대해 설명합니다.

## 순수한 Tasks 블록 사용 - 플레이스홀더와 함께

> [!released]
> 플레이스홀더는 Tasks 4.7.0에서 소개되었습니다.

현재 쿼리가 있는 파일과 동일한 `path`를 가진 파일에서 작업을 검색하고자 합니다.

Tasks는 쿼리가 포함된 파일의 경로를 자동으로 쿼리에 포함시키는 방법을 제공합니다.

다음과 같이 `path` 지시문과 플레이스홀더 텍스트 `{{query.file.path}}`를 사용할 수 있습니다. 이는 현재 쿼리가 있는 파일의 경로로 대체됩니다:

    ## 이 노트 내 작업 요약

    ```tasks
    not done
    path includes {{query.file.path}}
    ```

다음 플레이스홀더들을 사용할 수 있습니다:

```text
{{query.file.path}}
{{query.file.root}}
{{query.file.folder}}
{{query.file.filename}}
```

위 텍스트 필터뿐만 아니라 다른 모든 텍스트 필터와 함께 사용할 수 있습니다. 예를 들어, `description` 및 `heading` 필터와 함께 유용할 수 있습니다.

자세한 정보는 다음 문서들을 참조하세요:

- [[Placeholders-ko]]
- [[Query Properties-ko]]

## Dataview를 사용하여 Tasks 블록 생성 - 구식 방법

<label class="ob-comment" title="" style=""> 가정 <input type="checkbox"> <span style=""> 별도의 노트로 이동<br> - 원래 제목 유지<br> - 여기서 링크 </span></label>:
 
- [Dataview](https://github.com/blacksmithgu/obsidian-dataview) 플러그인 설치 및 활성화하는 방법을 안다고 가정합니다.
 
[Dataview](https://github.com/blacksmithgu/obsidian-dataview) 플러그인은 다른 플러그인에서 처리되는 코드 블록을 작성할 수 있는 기능입니다.
 
따라서 Dataview를 사용하여 일반적인 Tasks 코드 블록을 생성하고 반복 등과 같은 기능도 정상적으로 작동하며,
Dataview가 자동으로 파일 이름을 자동으로 채워주게 할 수 있습니다.
 
### 예제 코드 및 사용 방법
 
1. Obsidian 보관소에 Dataview가 설치되어있고 활성화되어있는지 확인하세요.
2. 클립보드에 전체 예제 코드 블록을 복사하세요.
3. 완료되지 않은 일부 작업이 있는 Obsidian 노트 열기
4. 옵션 없이 (plain text) Obsidian에 붙여넣으세요 (`Shift+Ctrl+V` or `Shift+Command+V`)
5. 나머지 작업 목록 확인하기 위해 Live Preview나 Reading mode로 전환하세요.


예제 코드블럭:

    ## 이 노트 내 작업 요약

    ```dataviewjs
    const query = `
    not done
    path includes ${dv.current().file.path}
    # you can add any number of extra Tasks instructions, for example:
    group by heading
    `;

    dv.paragraph('```tasks\n' + query + '\n```');
    ```

### 예제 사용하기

- 코드에는 많은 구두점과 특수 문자가 있으며, 코드를 다시 입력하는 경우 잘못 입력하기 쉽습니다.
- 따라서, 코드 샘플을 노트에 복사하여 붙여넣고, 그 후에 쿼리 지침을 필요에 맞게 수정하는 것을 강력히 권장합니다.

### 코드 작동 방식

- 위의 예제 코드 블록은 Tasks 코드 블록을 생성하는 `dataviewjs` 코드 블록입니다!
- `query` 값 양쪽에 백틱 문자 (``` ` ```)를 넣음으로써 여러 줄의 문자열을 생성하고, `${...}`를 사용하여 해당 문자열 내부에 값을 포함할 수 있습니다.
  - 이 JavaScript 기법에 대해 자세히 알아보려면 [Template literals (Template strings)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)를 참조하세요.
- Dataview 마법 부분은 `dv.current().file.path`의 사용으로 인해 현재 code block이 포함된 파일의 경로가 반환됩니다.
- `dv.paragraph('```tasks\n' + query + '\n```');`라인:
  - 첫 번째와 마지막 줄(각각 3개의 백틱)을 추가하여 쿼리를 tasks block으로 변환합니다.
  - 그런 다음 전체 tasks block을 단락으로 작성합니다.
- Live Preview나 Reading mode에서 보면 Tasks가 정상적으로 작동합니다!

### 생성된 tasks 명령어 보기

마지막 줄을 `tasks` 대신 `text` 블록으로 변경하면 Dataview가 생성한 원시 tasks 명령어를 볼 수 있으므로 유용할 수 있습니다:

    dv.paragraph('```text\n' + query + '\n```');

### 출력 결과 예쁘게 표시하기 위해 callout 사용하기

Tasks 결과를 보다 멋진 모양으로 표시하고 싶다면 [callout](https://help.obsidian.md/How+to/Use+callouts) 안에 넣으면 됩니다. 아래 예제에서는 결과가 "todo" 타입의 callout 안에서 표시됩니다:

    ## 이 노트 내 작업 요약

    ```dataviewjs
    function callout(text, type) {
        const allText = `> [!${type}]\n` + text;
        const lines = allText.split('\n');
        return lines.join('\n> ') + '\n'
    }

    const query = `
    not done
    path includes ${dv.current().file.path}
    # you can add any number of extra Tasks instructions, for example:
    group by heading
    `;

    dv.paragraph(callout('```tasks\n' + query + '\n```', 'todo'));
    ```

## Related pages

- [[Dataview-ko]]
