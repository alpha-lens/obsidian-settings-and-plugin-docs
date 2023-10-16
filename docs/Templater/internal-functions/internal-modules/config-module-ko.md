---
created: 2023-10-14 T18:02
updated: 2023-10-14 T19:04
---
# Config 모듈

{{ tp.config.description }}

<!-- 목차 -->

## 문서

{%- for key, fn in tp.config.functions %}
### `{{ fn.definition }}` 

{{ fn.description }}

{% if fn.args %}
##### 인자

{% for arg in fn.args %}
- `{{ arg.name }}`: {{ arg.description }}
{% endfor %}
{% endif %}

{% if fn.example %}
##### 예제

```
{{ fn.example }}
```
{% endif %}
{%- endfor %}