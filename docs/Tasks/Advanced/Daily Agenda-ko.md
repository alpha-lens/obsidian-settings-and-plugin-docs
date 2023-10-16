---
publish: true
---

# 일일 일정

<span class="related-pages">#plugin/calendar #plugin/periodic-notes</span>

기본 `Daily-notes` 플러그인을 사용할 때, `{{date+14d:YYYY-MM-DD}}`와 같은 구문을 가진 **템플릿**은 날짜를 제대로 로드하지 못합니다. 그러나 [Calendar Plugin](https://github.com/liamcain/obsidian-calendar-plugin)과 [Periodic Notes Plugin](https://github.com/liamcain/obsidian-periodic-notes)의 저자인 **Liam Cain**은 `date+Xd` 형식을 사용하여 새로운 일일 노트(두 플러그인 모두 사용)를 생성하기 위한 코드를 작성했습니다. 따라서 기존의 표준적인 `Daily-notes` 구문 대신에 이 형식을 사용하려면, 새로운 노트가 이 두 플러그인 중 하나를 통해 생성되도록 해야 합니다.

- **Calendar Plugin**: 달력 UI에서 해당 날짜를 탭하면 새로운 일일 노트가 생성됩니다.
- **Periodic Notes Plugin**: 설치하고 필요한 경우에는 `Daily-notes`에서 마이그레이션한 후, 왼쪽 도크에 있는 새로운 "Open Today" 리본을 탭합니다. 아래는 오늘이 2021년 8월 14일인 경우의 예시입니다.

|                 | Daily Notes                      | Calendar                         | Periodic Notes                   |
| --------------- | -------------------------------- | -------------------------------- | -------------------------------- |
| 템플릿 구문     | `{{date+14d:YYYY-MM-DD}}`로 만료됨   | `{{date+14d:YYYY-MM-DD}}`로 만료됨   | `{{date+14d:YYYY-MM-DD}}`로 만료됨   |
| 결과            | `{{date+14d:YYYY-MM-DD}}`로 만료됨   | 2021-08-28로 만료됨              | 2021-08-28로 만료됨              |

## 일일 일정 예시 **템플릿**

    ## 작업
    ### 마감 기한이 지난 작업들
    ```tasks
    완료되지 않음
    {{date:YYYY-MM-DD}} 이전에 마감
    ```

    ### 오늘 마감 작업들
    ```tasks
    완료되지 않음
    {{date:YYYY-MM-DD}}에 마감 예정
    ```

    ### 다음 두 주 내에 마감되는 작업들
    ```tasks
    완료되지 않음
     {{date:YYYY-MM-DD}} 이후에 마감 예정 
     {{date+14d:YYYY-MM-DD}} 이전에 마감 
     ```

     ### 기한 없는 작업들 
      ```tasks  
      완료되지 않음  
      기한 없음  
      ```

       ### 오늘 완료된 작업들 
        ```tasks  
        {{date:YYYY-MM-DD}}에 완료됨  
        ```

## 일일 일정 쿼리 문제 해결

### 지시사항에 펼쳐지지 않은 템플릿 텍스트가 포함되어 있습니다.

<!-- 위의 제목이 변경된 경우, 아래 소스 코드를 업데이트하여 새 URL이 오류 메시지에 표시되도록 합니다. -->

내장된 작업 검색에서 템플릿 파일에서의 잘못된 작업 실행을 방지하기 위해, 모든 내장된 작업 날짜 검색은 템플릿 규칙처럼 보이는 텍스트를 확인합니다.

만약 발견되면, 사용자의 의도와 맞지 않는 결과가 나오는 경우가 많기 때문에 해당 검색을 실행하지 않습니다.

그러한 경우, 오류 메시지에 다음과 같은 텍스트가 포함됩니다:

<!-- snippet: TemplatingPluginTools.test.TemplatingPluginTools_date_templating_error_sample_for_docs.approved.text -->
```text
명령에 확장되지 않은 템플릿 텍스트 "<%" - 해석할 수 없습니다.

가능한 원인:
- 쿼리는 템플릿 파일이며 검색할 목적이 아닙니다.
- "활성 파일에서 템플릿 바꾸기"와 같은 명령을 실행해야 합니다.
- 핵심 "일별 노트" 플러그인이 사용 중이며 템플릿에는 지원되지 않는 날짜 계산이 포함되어 있습니다.
- 일부 샘플 템플릿 텍스트를 템플릿 파일이 아닌 작업 쿼리에 실수로 붙여 넣었습니다.

See: https://publish.obsidian.md/tasks/Advanced/Instruction+contains+unexpanded+template+text
```
<!-- endSnippet -->