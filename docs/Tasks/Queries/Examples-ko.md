---
publish: true
---

# 예제

오늘 마감되어야 하는 모든 열린 작업:

    ```tasks
    not done
    due today
    ```

---

다음 두 주 이내에 마감되어야 하지만 기한이 지나지 않은(오늘 이후) 모든 열린 작업:

    ```tasks
    not done
    due after yesterday
    due before in two weeks
    ```

---

다음 두 주 이내에 마감되어야 하고 `#inbox` 태그를 가진 작업이거나 Inbox 노트에 있는 작업:

    ```tasks
    not done
   (due after yesterday) AND (due before in two weeks)
   (tags include #inbox) OR (path includes Inbox)
   ```

---

다음 달 동안 마감되어야 하지만 일정이 없는(예정된 날짜가 없는) 모든 열린 작업:

```tasks 
not done 
due next month 
no scheduled date 
```

---

Vault의 `tasks` 제목 아래에 있는 모든 완료된 작업:

```tasks 
done 
heading includes tasks 
```

---

이번 달에 완료된 모든 작업 중 전월에 마감 또는 예정된 작업:

```tasks  
(due last month) OR (scheduled last month)  
done this month  
```
 

4월 9일 2021년까지 완료되지 않은, 경로가 `GitHub`를 포함하는 모든 할 일 표시:
    
```text    
not done  
due on 2021-04-09  
path includes GitHub  
```
   
두 주 범위 내에서 마감일을 포함하여 표시하지만, 마감일과 편집 버튼을 숨깁니다:
    
```text    
not done  
due 2021-05-01 2021-05-14  
hide due date  
hide edit button  
```
   
2020년 12월 1일 이전에 완료된 모든 할 일 표시:
    
```text   
done before 2020-12-01   
```
   
이 분기에 예약된 태그가 있는 모든 할 일 표시:
     
```text     
scheduled this quarter      
has tags      
```
       
5월 5일까지 완료해야하며 설명에서 `#prio1`을 포함하는 한 개의 할 일 표시:
     
```text      
not done        
due on 2021-05-05       
description includes #prio1         
limit to 1 tasks       
 ```
        
오늘이거나 그 이전으로 마감되어야 하며, 마감 날짜별로 정렬하고 해당 폴더를 기준으로 그룹화한 열린 작업들: 
        
 ```text        
not done         
due before tomorrow         
sort by due         
group by folder        
 ```
           
시작 시간이 `HH:mm` 형식으로 되어 있고 그 다음 공백 문자로 시작하는 모든 열린 작업들: 
        
```text          
    not done          
    description regex matches /^[012][0-9]:[0-5][0-9]\s/           
```