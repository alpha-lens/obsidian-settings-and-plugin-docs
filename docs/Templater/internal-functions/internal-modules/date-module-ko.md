# Date 모듈

{{ tp.date.description }}

<!-- 목차 -->

## 문서

함수 문서는 특정 구문을 사용합니다. 자세한 정보는 [여기](../../syntax-ko.md#function-documentation-syntax)에서 확인하세요.

{%- for key, fn in tp.date.functions %}
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

## Moment.js

Templater는 `moment` 객체에 모든 기능을 사용할 수 있도록 제공합니다.

moment.js에 대한 자세한 정보는 [여기](https://momentjs.com/docs/#/displaying/)를 참조하세요.

## 예시

```javascript
Date now: <% tp.date.now() %>
Date now with format: <% tp.date.now("Do MMMM YYYY") %>

Last week: <% tp.date.now("dddd Do MMMM YYYY", -7) %>
Today: <% tp.date.now("dddd Do MMMM YYYY, ddd") %>
Next week: <% tp.date.now("dddd Do MMMM YYYY", 7) %>

Last month: <% tp.date.now("YYYY-MM-DD", "P-1M") %>
Next year: <% tp.date.now("YYYY-MM-DD", "P1Y") %>

File's title date + 1 day (tomorrow): <% tp.date.now("YYYY-MM-DD", 1, tp.file.title, "YYYY-MM-DD") %>
File's title date - 1 day (yesterday): <% tp.date.now("YYYY-MM-DD", -1, tp.file.title, "YYYY-MM-DD") %>

Date tomorrow with format: <% tp.date.tomorrow("Do MMMM YYYY") %>    

This week's monday: <% tp.date.weekday("YYYY-MM-DD", 0) %>
Next monday: <% tp.date.weekday("YYYY-MM-DD", 7) %>
File's title monday: <% tp.date.weekday("YYYY-MM-DD", 0, tp.file.title, "YYYY-MM-DD") %>
File's title next monday: <% tp.date.weekday("YYYY-MM-DD", 7, tp.file.title, "YYYY-MM-DD") %>

Date yesterday with format: <% tp.date.yesterday("Do MMMM YYYY") %>
```