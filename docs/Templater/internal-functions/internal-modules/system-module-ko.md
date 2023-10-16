# System 모듈

{{ tp.system.description }}

<!-- 목차 -->

## 문서

함수 문서는 특정 구문을 사용합니다. 자세한 정보는 [여기](../../syntax-ko.md#function-documentation-syntax)에서 확인하세요.

{%- for key, fn in tp.system.functions %}
### `{{ fn.definition }}` 

{{ fn.description }}

{% if fn.args %}
##### 인수

{% for arg in fn.args %}
- `{{ arg.name }}`: {{ arg.description }}
{% endfor %}
{% endif %}

{% if fn.example %}
##### 예시

```
{{ fn.example }}
```
{% endif %}
{%- endfor %}

## 예시

```javascript
Clipboard content: <% tp.system.clipboard() %>

Entered value: <% tp.system.prompt("Please enter a value") %>
Mood today: <% tp.system.prompt("What is your mood today ?", "happy") %>

Mood today: <% tp.system.suggester(["Happy", "Sad", "Confused"], ["Happy", "Sad", "Confused"]) %>
Picked file: [[<% (await tp.system.suggester((item) => item.basename, app.vault.getMarkdownFiles())).basename %>]]


<%*
const execution_value = await tp.system.suggester(["Yes", "No"], ["true", "false"])
%>
Are you using Execution Commands: <%*  tR += execution_value %>

```
