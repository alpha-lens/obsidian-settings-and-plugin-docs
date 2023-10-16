---
publish: true
---

# 알림

<span class="related-pages">#plugin/reminder</span>

Tasks 내에서 [obsidian-reminder](https://github.com/uphy/obsidian-reminder)를 활용하여 알림을 설정할 수 있습니다. 이는 표준 Tasks 날짜(마감일)를 사용하고, 추가적인 알림 날짜를 `⏰ YYYY-MM-DD HH:MM` 형식으로 포함시켜 구현할 수 있습니다. 또한, Tasks의 'Due Date'를 기반으로 기본 알림을 활성화할 수도 있습니다.

이를 위해 obsidian-reminder가 아래와 같이 tasks 플러그인 형식을 활성화했는지 확인하세요:

![obsidian-reminder 설정](../images/reminder.png)
_이는 reminder 플러그인의 설정 스크린샷이며 Tasks가 아닙니다._

## 알림 날짜 추가 위치

작업을 작성할 때 순서가 중요합니다. Reminders에서는 작업 설명 뒤에 그리고 다른 Tasks 필드 이전에 알림 날짜가 위치해야 합니다. 또한, 알림과 마감일 사이에 콘텐츠를 넣지 않아야 합니다([due date와 reminder date 구분하기](https://uphy.github.io/obsidian-reminder/guide/interop-tasks.html#distinguish-due-date-and-reminder-date)).

```markdown
- [ ] #task task name ⏰ YYYY-MM-DD HH:mm 📅 YYYY-MM-DD ⏫ 🔁 every week 🛫 YYYY-MM-DD ⏳ YYYY-MM-DD
```

---

> [!warning]
> "Create or Edit Tasks" 명령의 결과로 생성된 작업은 Reminders에서 원하는 위치에 바로 마감일을 배치하지 않습니다. Reminders의 "defer" 명령을 사용하려면 수동으로 수정해야 합니다. 그렇지 않으면(2022년 8월 기준), Reminders의 "defer" 명령은 ⏰와 📅 이모지 사이의 모든 정보를 덮어씁니다! 현재 상태를 확인하려면 [Reminders의 이 문제](https://github.com/uphy/obsidian-reminder/issues/100)를 참조하세요.

## 알림 완료 방법

작업을 완료할 때 알림 날짜는 변경되지 않으며, 알림 팝업이나 알림에서 작업을 완료할 때만 날짜가 변경됩니다.

![이미지](https://user-images.githubusercontent.com/38974541/143463881-e4af4b91-426f-48e8-938e-4a1053b06677.png)
![이미지](https://user-images.githubusercontent.com/38974541/143464983-542675ae-a467-41c0-aaca-1075c42f8328.png)

---

> [!warning]
> 반복 작업을 완료하는 것은 2022년 8월 기준으로 Reminders에서 제대로 작동하지 않습니다. 현재 상태를 확인하려면 [Reminders의 이 문제](https://github.com/uphy/obsidian-reminder/issues/93)를 참조하세요.