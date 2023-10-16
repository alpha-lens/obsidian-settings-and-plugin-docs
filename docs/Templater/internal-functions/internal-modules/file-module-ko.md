# File 모듈

{{ tp.file.description }}

<!-- 목차 -->

## 문서

함수 문서는 특정 구문을 사용합니다. 자세한 정보는 [여기](../../syntax-ko.md#function-documentation-syntax)에서 확인하세요.

{%- for key, fn in tp.file.functions %}
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
File content: <% tp.file.content %>

File creation date: <% tp.file.creation_date() %>
File creation date with format: <% tp.file.creation_date("dddd Do MMMM YYYY HH:mm") %>

File creation: [[<% (await tp.file.create_new("MyFileContent", "MyFilename")).basename %>]]

File cursor: <% tp.file.cursor(1) %>

File cursor append: <% tp.file.cursor_append("Some text") %>
    
File existence: <% await tp.file.exists("MyFolder/MyFile.md") %>
File existence of current file: <% await tp.file.exists(tp.file.folder(true)+"/"+tp.file.title+".md") %>

File find TFile: <% tp.file.find_tfile("MyFile").basename %>
    
File Folder: <% tp.file.folder() %>
File Folder with relative path: <% tp.file.folder(true) %>

File Include: <% tp.file.include("[[Template1]]") %>

File Last Modif Date: <% tp.file.last_modified_date() %>
File Last Modif Date with format: <% tp.file.last_modified_date("dddd Do MMMM YYYY HH:mm") %>

File Move: <% await tp.file.move("/A/B/" + tp.file.title) %>
File Move + Rename: <% await tp.file.move("/A/B/NewTitle") %>

File Path: <% tp.file.path() %>
File Path with relative path: <% tp.file.path(true) %>

File Rename: <% await tp.file.rename("MyNewName") %>
Append a "2": <% await tp.file.rename(tp.file.title + "2") %>

File Selection: <% tp.file.selection() %>

File tags: <% tp.file.tags %>

File title: <% tp.file.title %>
Strip the Zettelkasten ID of title (if space separated): <% tp.file.title.split(" ")[1] %>
```
