---
created: 2023-10-14 T18:02
updated: 2023-10-14 T19:04
---
# Web Module

{{ tp.web.description }}

<!-- toc -->

## 문서

함수 문서는 특정 구문을 사용합니다. 자세한 정보는 [여기](../../syntax-ko.md#function-documentation-syntax)에서 확인하세요.

{%- for key, fn in tp.web.functions %}
### `{{ fn.definition }}` 

{{ fn.description }}

{% if fn.args %}
##### 인수

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

## Examples

```javascript
Web Daily quote:  
> How many cares one loses when one decides not to be something but to be someone.
> — <cite>Coco Chanel</cite>

Web Random picture: 
![photo by Mohammadreza Charkhgard on Unsplash](https://images.unsplash.com/photo-1695161880050-324c5a86c0fe?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzNjM5Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTcyNzcxNzR8&ixlib=rb-4.0.3&q=85)

Web Random picture with size: 
![photo by Sabesh Photography on Unsplash](https://images.unsplash.com/photo-1696233473130-cf169462a52d?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzNjM5Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTcyNzcxNzR8&ixlib=rb-4.0.3&q=85&w=200&h=200)

Web random picture with size + query: 
![photo by Nathan Anderson on Unsplash](https://images.unsplash.com/photo-1500531279542-fc8490c8ea4d?crop=entropy&cs=srgb&fm=jpg&ixid=M3wzNjM5Nzd8MHwxfHJhbmRvbXx8fHx8fHx8fDE2OTcyNzcxNzR8&ixlib=rb-4.0.3&q=85&w=200&h=200)
```
