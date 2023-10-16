---
created: 2023-10-14 T19:06
updated: 2023-10-14 T22:44
---
# 자주 묻는 질문

Dataview 쿼리와 표현 언어에 대한 자주 묻는 질문들의 모음입니다.

### 키워드(예: "from", "where")와 동일한 이름을 가진 필드를 어떻게 사용하나요?

Dataview는 `row`라는 특수한 "가짜" 필드를 제공합니다. 이를 사용하여 Dataview 키워드와 충돌하는 필드에 접근할 수 있습니다:

```javascript
row.from /* "from"과 동일 */
row.where /* "where"와 동일 */
```

### 이름에 공백이 포함된 필드에 어떻게 접근하나요?

두 가지 방법이 있습니다:

1. 해당 필드의 정규화된 Dataview 이름을 사용합니다. 이름을 소문자로 변환하고 공백을 대시("-")로 바꾸면 됩니다. 예를 들어 `Field With Space In It`은 `field-with-space-in-it`가 됩니다.
2. 암시적인 `row` 필드를 사용합니다:
```javascript
row["Field With Space In It"]
```

### 학습 자료 목록이 있나요?

네! [리소스](../resources/resources-and-support-ko.md) 페이지를 참조해주세요.

### 쿼리 결과를 재사용하기 위해 저장할 수 있나요?

JavaScript 쿼리에서 [dv.view](../api/code-reference-ko.md#dvviewpath-input) 함수를 사용하여 재사용 가능한 쿼리를 작성할 수 있습니다. DQL에서는 템플릿 내에 쿼리를 작성하고 [코어 플러그인 템플릿](https://help.obsidian.md/Plugins/Templates) 또는 인기있는 커뮤니티 플러그인 [Templater](https://obsidian.md/plugins?id=templater-obsidian)를 사용하여 이 템플릿을 사용할 수 있습니다. 또한, **[인라인 DQL](../queries/dql-js-inline-ko.md#inline-dql)**을 사용하여 메타데이터 필드에 계산 결과를 저장할 수도 있습니다. 예를 들면 다음과 같습니다:

```markdown
start:: 07h00m
end:: 18h00m
pause:: 01h30m
duration:: `= this.end - this.start - this.pause`
```

이렇게 하면 계산된 값 (예: 9시간 30분)을 나열하고, 이 값을 반복해서 계산할 필요 없이 TABLE 등에서 사용할 수 있습니다:

~~~markdown
```dataview
TABLE start, end, duration
WHERE duration
```
~~~

결과로 다음과 같은 결과가 나옵니다:

| 파일(1) | 시작 | 종료 | 기간 |
| ---- | ----- | ------ | ----- |
| Example | 7시간 | 18시간 | 9시간 30분 |

**하지만 인라인 DQL을 필드에 저장하는 것에는 제한이 있습니다**: 결과로 표시되는 값은 계산된 값이지만, **메타데이터 필드에 저장된 값은 여전히 인라인 DQL 계산식**입니다. 저장된 값은 문자 그대로 `= this.end - this.start - this.pause`입니다. 이는 다음과 같이 인라인 결과와 비교할 수 없다는 것을 의미합니다:

~~~markdown
```dataview
TABLE start, end, duration
WHERE duration > dur("10h")
```
~~~

위 예제 페이지를 반환하지만, 결과가 `WHERE` 절을 충족하지 않기 때문에 필터링되지 않습니다. 비교 대상으로 사용하는 값은 `= this.end - this.start - this.pause`이며, 기간(duration)이 아닙니다.

### TABLE 쿼리에서 결과 개수를 숨길 수 있나요?

Dataview 0.5.52부터 TABLE 및 TASK 쿼리에서 결과 개수를 설정으로 숨길 수 있습니다. Dataview의 설정으로 이동하여 "Display result count"를 확인하세요.