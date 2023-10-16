---
created: 2023-10-14 T17:40
updated: 2023-10-14 T19:04
---
# 자주 묻는 질문

## 유니코드 문자 (이모지 등)가 Windows에서 작동하지 않는 이유는?

Windows의 `cmd.exe`와 `powershell`은 유니코드 문자에 대해 문제가 발생하는 것으로 알려져 있습니다.

해결 방법은 [여기](https://github.com/SilentVoid13/Templater/issues/15#issuecomment-824067020)에서 확인하실 수 있습니다.

또 다른 좋은 해결 방법(아마도 가장 좋은 방법)은 [Windows 터미널](https://www.microsoft.com/en-us/p/windows-terminal/9n0dx20hk701)을 사용하고 Templater의 설정에서 기본 쉘로 설정하는 것입니다.

다른 가능한 해결 방법을 담고 있는 추가 자료: [https://stackoverflow.com/questions/49476326/displaying-unicode-in-powershell](https://stackoverflow.com/questions/49476326/displaying-unicode-in-powershell)