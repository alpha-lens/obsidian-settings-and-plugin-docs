---
publish: true
---

# 줄 연속
> [!released]
> Tasks X.Y.Z에서 도입되었습니다.

긴 쿼리는 뒤따르는 백슬래시를 사용하여 여러 줄에 걸쳐 구성할 수 있습니다:

    ```tasks
    (priority is highest) OR \
        (priority is lowest)
    ```

이는 긴 [[Combining Filters|합쳐진 필터]],  [[Custom Filters|사용자 정의 필터]], 그리고 한 줄로 읽기 어려운 다른 쿼리들에게 유용할 수 있습니다.

줄 연속은 공백으로 처리되며, 백슬래시 주변의 추가 들여쓰기나 공백은 하나의 공간으로 압축됩니다.

흔하지 않은 경우지만, 쿼리에 후행 백슬래시가 필요한 경우, 후행 백슬래시는 줄 끝에 공백을 추가하거나, 추가적인 백슬래시와 빈 줄을 추가함으로써 이스케이프될 수 있습니다:

    ```tasks
    # 단일 백슬래시를 검색합니다
    description includes \\
    
    explain
    ```