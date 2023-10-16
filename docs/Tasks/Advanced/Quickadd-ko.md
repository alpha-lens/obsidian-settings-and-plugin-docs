---
publish: true
---

# Quickadd

<span class="related-pages">#plugin/quickadd</span>

[quickadd](https://github.com/chhoumann/quickadd) 플러그인은 작업을 생성할 때 도움이 될 수 있습니다. 공식적인 작업 생성 명령어 외에도, 사용자 정의 캡처 형식과 함께 quickadd 명령어를 사용할 수 있습니다.

예를 들면 다음과 같습니다:

```markdown
#task {{VALUE:작업 이름}} ⏰ {{VDATE:알림 날짜와 시간,YYYY-MM-DD HH:mm}} {{VALUE:⏫,🔼,🔽, }} 🔁 {{VALUE:반복 주기}} 🛫 {{VDATE:시작 날짜,YYYY-MM-DD}} ⏳ {{VDATE:예정 날짜,YYYY-MM-DD}} 📅 {{VDATE:마감 날짜,YYYY-MM-DD}}
```

다양한 유형의 작업을 만들기 위해 필드를 제거하거나 그대로 둘 수 있으며 각각에 대해 자체 명령어를 사용할 수 있습니다.

## 일부 예시

마감일만 있는 작업:

`#task {{VALUE:작업 이름}} 📅 {{VDATE:마감일자,YYYY-MM-DD}}`

<video controls width="100%">
    <source src="https://user-images.githubusercontent.com/38974541/143467768-cf183171-296c-4229-81ca-a8f820b7a66e.mov" />
</video>

---

우선순위, 알림 날짜, 마감일이 있는 작업:

`#task {{VALUE:작업 이름}} ⏰ {{VDATE:알림 날짜와 시간,YYYY-MM-DD HH:mm}} {{VALUE:🔺,⏫,🔼,🔽,⏬️, }} 📅 {{VDATE:마감일자,YYYY-MM-DD}}`

<video controls width="100%">
    <source src="https://user-images.githubusercontent.com/38974541/143468599-ae598f7d-cc84-4fc9-8293-eae72cf81f8a.mov" />
</video>

---

반복 주기와 예정 날짜 및 시작 날짜가 있는 작업:

`#task {{VALUE:작업 이름}} 🔁 {{VALUE:반복 주기}} 🛫 {{VDATE:시작 날짜,YYYY-MM-DD}} ⏳ {{VDATE:예정 날짜,YYYY-MM-DD}}`

<video controls width="100%">
    <source src="https://user-images.githubusercontent.com/38974541/143468440-c83b5f91-c923-4f30-9c52-7c69e64978c9.mov" />
</video>

## quickadd 명령어 추가 방법

1. [nldates](https://github.com/argenos/nldates-obsidian)와 [quickadd](https://github.com/chhoumann/quickadd)를 설치합니다.
2. `capture` 옵션을 선택하고, flash 이모지를 클릭하여 명령 팔레트에서 보이도록 설정합니다.
3. `save as task` 옵션을 활성화한 다음, `capture format` 옵션을 활성화하고 사용자 정의 형식을 붙여넣습니다.

## 반복 날짜에 대한 팁 (마찰 감소를 위해)

마감일과 알림 날짜가 동일한 경우와 같이 동일한 날짜를 여러 곳에 추가하는 것을 발견한다면, 이들에게 동일한 이름을 부여할 수 있습니다. 이렇게 하면 날짜를 한 번만 작성하면 Quickadd가 여러 위치에 삽입합니다.

다음은 현재 예시의 형식입니다:

```markdown
#task {{VALUE:작업 이름}} ⏰ {{VDATE:동일한 날짜,YYYY-MM-DD}} {{VDATE:시간,HH:mm}} 📅 {{VDATE:동일한 날짜,YYYY-MM-DD}}
```