---
publish: true
---

## 파일 이름을 기본 날짜로 사용하기

> [!released]
Tasks 1.18.0에서 도입되었습니다.

파일 이름을 기반으로 작업에 자동으로 예정된 날짜를 설정할 수 있습니다. 이 기능은 설정에서 `Use filename as Scheduled date for undated tasks` 옵션을 통해 활성화할 수 있습니다. 이 옵션을 변경하려면 Obsidian을 재시작해야 합니다.

이를 통해 일일 노트의 모든 작업을 예정된 것으로 간주할 수 있습니다. 그런 다음 `scheduled` 및 `happens` [[Filters|필터]]를 사용하여 해당 작업들을 검색할 수 있습니다.

예시 쿼리:

````text
```tasks
scheduled before today
group by scheduled
not done
```
````

> [!info]
> 작업은 Obsidian의 어떤 뷰에서도 시각적으로 수정되지 않습니다. 예정된 날짜는 암시적인 상태이며 표시되지 않습니다.

하지만 [[Create or edit Task|편집 대화 상자]]에서 확인할 수 있습니다.
또한 tasks 블록에서 `group by scheduled` 명령어를 사용하여 확인할 수도 있습니다.

## 규칙

파일 이름에서 자동으로 예정된 날짜를 설정하려면 다음 규칙이 적용됩니다:

- 'Use filename as Scheduled date for undated tasks' 설정이 활성화되어 있고, Obsidian이 재시작되어야 합니다.
- 작업에 기존의 예정된 날짜, 마감일 또는 시작일이 없어야 합니다.
- 파일 이름은 `YYYY-MM-DD` 또는 `YYYYMMDD` 형식의 날짜를 포함해야 합니다.
- 파일은 구성된 폴더 중 하나에 있거나 해당 설정이 활성화된 경우 하위 폴더에 있어야 합니다.

파일 이름의 예시:

```text
daily/2022-10-12 Wednesday.md
meetings/rd. 2022-09-07.md
20220612 - random thoughts.md
```

## 설정

다음 이미지는 이 기능과 관련된 두 가지 설정을 보여줍니다:

![Use filename as Scheduled date for undated tasks settings](../images/settings-use-filename-for-date.png)

### 폴더 설정

설정 대화 상자에서 `Folders with default Scheduled dates` 필드를 비워두면, 기본 날짜가 지정되지 않은 작업에 모든 파일에 적용됩니다.

쉼표로 구분된 폴더 목록을 입력하여 범위를 제한할 수도 있습니다. 그러면 지정된 폴더와 그 하위 폴더의 모든 파일에서 날짜가 지정되지 않은 작업에만 기본 날짜가 적용됩니다.

예시:

| Folders setting   | Matching files                                                                          | Not matching                               |
| ----------------- | --------------------------------------------------------------------------------------- | ------------------------------------------ |
| (비어 있음)       | `20221022.md`<br/>`daily/20221012.md`                                                   |                                            |
| `daily`           | `daily/2022-10-12.md`<br/>`daily/notes/2022-10-12.md`                                   | `20221022.md`<br/>`meetings/2022-10-12.md` |
| `daily,prj/daily` | `daily/2022-10-12.md`<br/>`prj/daily/2022-10-12.md`<br/>`prj/daily/notes/2022-06-12.md` | `20221022.md`<br/>``meetings/rd. 2022_09_07`.md |

> [!warning]
> 쉼표(`,`)가 포함된 폴더는 지원되지 않습니다.

## 제한 사항

### 인식되는 날짜 형식

[[Use Filename as Default Date]]에서 인식하는 날짜 형식을 변경할 수 없습니다. 인식되는 형식은 오직 `YYYY-MM-DD`(년도, 월, 일 순) 또는 `YYYYMMDD`(연속된 숫자로 이루어진 8자리)입니다.

이에 대해서는 [issue #1369](https://github.com/jaygkay/Tasks-for-Obsidian/issues/1369)에서 추적하고 있습니다.

### 설정을 선택한 폴더에 적용하기

쉼표(`,`)가 포함된 폴더는 지원되지 않습니다.