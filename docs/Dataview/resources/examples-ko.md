---
created: 2023-10-14 T19:06
updated: 2023-10-14 T22:42
---
# 예시

Dataview 쿼리 언어의 간단한 사용 예시들입니다.

---

게임 폴더에 있는 모든 게임을 평점순으로 정렬하여 일부 메타데이터와 함께 표시합니다:

=== "쿼리"
```sql
TABLE
	time-played AS "플레이 시간",
	length AS "길이",
	rating AS "평점"
FROM "games"
SORT rating DESC
```

=== "결과"

|파일|플레이 시간|길이|평점|
|-|-|-|-|
|[Outer Wilds](#)|2020년 11월 19일 - 21일|15시간|9.5|
|[Minecraft](#)|항상 가능|2000시간|9.5|
|[Pillars of Eternity 2](#)|2019년 8월 - 10월|100시간|9|

---

MOBA 게임 또는 CRPG 게임인 게임 목록을 표시합니다.

=== "쿼리"
``` sql
LIST FROM #games/mobas OR #games/crpg
```
=== "결과"
    - [League of Legends](#)
    - [Pillars of Eternity 2](#)

---

미완료된 프로젝트에 있는 모든 작업을 나열합니다:

=== "쿼리"
``` sql
TASK FROM "dataview"
```

=== "결과"
[dataview/Project A](#)

- [ ] 나는 작업입니다.
- [ ] 나는 또 다른 작업입니다.

[dataview/Project A](#)

- [ ] 나는 작업일 수도 있지만, 누가 알까요.
		- [X] 이것이 작업인지 확인합니다.
- [X] 완료된 작업입니다.

---

`books` 폴더에 있는 모든 파일을 수정한 날짜순으로 나열합니다:

=== "쿼리"
```sql
TABLE file.mtime AS "마지막 수정 시간"
FROM "books"
SORT file.mtime DESC
```

=== "결과"

|파일|마지막 수정 시간|
|-|-|
|[Atomic Habits](#)|오후 11:06 - 2021년 8월 7일|
|[Can't Hurt Me](#)|오후 10:58 - 2021년 8월 7일|
|[Deep Work](#)|오후 10:52 - 2021년 8월 7일|

---

제목에 날짜가 포함된 모든 파일을 날짜 순서대로 나열합니다 (`yyyy-mm-dd` 형식):

=== "쿼리"
```sql
LIST file.day WHERE file.day
SORT file.day DESC
```

=== "결과"
   - [2021-08-07](#): August 07, 2021
   - [2020-08-10](#): August 10, 2020