---
publish: true
---

# 제한하기

## 전체 작업 수 제한하기

쿼리 결과로 표시할 전체 작업 수를 제한할 수 있습니다.

쿼리 문자열 `limit to <number> tasks`를 사용하세요.
이는 쿼리의 결과 중 처음 `<number>`개만을 나열합니다(정렬 후).

단축형은 `limit <number>`입니다.

## 각 그룹 내의 작업 수 제한하기

[[Grouping|그룹화]]가 사용되는 경우, 각 그룹에서 허용된 작업 수도 제한할 수 있습니다. 그렇지 않으면 이 제한은 무시됩니다.

쿼리 문자열 `limit groups to <number> tasks`를 사용하세요.
이는 쿼리 결과에서 각 그룹의 첫 번째 `<number>`작업만 나열합니다.

단축형은 `limit groups <number>`입니다.

> [!NOTE]
> 'group by' 지시문이 Tasks 쿼리에 없는 경우 'limit groups' 지시문은 무시됩니다.

> [!released]
> `limit groups to <number> tasks`는 Tasks 3.8.0에서 도입되었습니다.

## 찾아진 전체 작업 수 보기

'limit' 옵션 중 하나가 결과에 표시되는 작업을 방해하는 경우, 총 개수가 표시됩니다. 예를 들면:

```text
50 of 686 tasks
```

> [!released]
> 전체 작업 수의 표시 기능은 Tasks 4.8.0에서 추가되었습니다.
