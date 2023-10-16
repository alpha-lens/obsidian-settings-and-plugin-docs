# 내부 함수

[Templater](https://github.com/SilentVoid13/Templater)에서 제공하는 다양한 내부 변수와 함수는 정렬을 위해 서로 다른 **모듈**에 있습니다. 현재 존재하는 **내부 모듈**은 다음과 같습니다:

- [Config 모듈](./internal-modules/config-module-ko.md): `tp.config`
- [Date 모듈](./internal-modules/date-module-ko.md): `tp.date`
- [File 모듈](./internal-modules/file-module-ko.md): `tp.file`
- [Frontmatter 모듈](./internal-modules/frontmatter-module-ko.md): `tp.frontmatter`
- [Obsidian 모듈](./internal-modules/obsidian-module-ko.md): `tp.obsidian`
- [System 모듈](./internal-modules/system-module-ko.md): `tp.system`
- [Web 모듈](./internal-modules/web-module-ko.md): `tp.web`

[객체 계층 구조](../syntax-ko.md#objects-hierarchy)를 올바르게 이해했다면 일반적인 내부 함수 호출은 다음과 같이 보입니다: `<% tp.<module_name>.<내부_함수_이름> %>`

## 기여

새로운 내부 함수를 추가하여 이 플러그인 개발에 기여하도록 여러분을 초대합니다. 자세한 정보는 [여기](./contribute-ko.md)에서 확인하세요.