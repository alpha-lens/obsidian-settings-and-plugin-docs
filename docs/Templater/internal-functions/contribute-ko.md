---
created: 2023-10-14 T18:02
updated: 2023-10-14 T19:04
---
# 기여하기

[Templater](https://github.com/SilentVoid13/Templater)에 새로운 내부 함수/변수를 개발하여 기여할 수 있습니다.

새로운 함수/변수를 개발하는 과정은 매우 간단합니다.

유의해야 할 점은 관련성이 있는 제출만 허용되며, 특정한 내부 변수/함수는 본인만 사용하는 경우 제출하지 마십시오.

## 레이아웃

내부 변수/함수는 모듈별로 정렬됩니다. 각 모듈은 [src/InternalTemplates](https://github.com/SilentVoid13/Templater/tree/master/src/InternalTemplates) 폴더 아래에 전용 폴더가 있습니다.

[date 모듈](https://github.com/SilentVoid13/Templater/tree/master/src/InternalTemplates/date)을 예로 들어보겠습니다.

[date 폴더](https://github.com/SilentVoid13/Templater/tree/master/src/InternalTemplates/date)에는 내부 날짜 관련 변수와 함수가 정의되고 등록된 [InternalModuleDate](https://github.com/SilentVoid13/Templater/blob/master/src/InternalTemplates/date/InternalModuleDate.ts) 파일이 포함되어 있습니다.

```typescript
export class InternalModuleDate extends InternalModule {
    name = "date";

    async createStaticTemplates() {
        this.static_templates.set("now", this.generate_now());
        this.static_templates.set("tomorrow", this.generate_tomorrow());
        this.static_templates.set("yesterday", this.generate_yesterday());
    }

    async updateTemplates() {}

    generate_now() {
        return (format: string = "YYYY-MM-DD", offset?: number, reference?: string, reference_format?: string) => {
            if (reference && !window.moment(reference, reference_format).isValid()) {
                throw new Error("Invalid title date format, try specifying one with the argument 'reference'");
            }
            return get_date_string(format, offset, reference, reference_format);
        }
    }

    generate_tomorrow() {
        return (format: string = "YYYY-MM-DD") => {
            return get_date_string(format, 1);
        }
    }

    generate_yesterday() {
        return (format: string = "YYYY-MM-DD") => {
            return get_date_string(format, -1);
        }
    }
}
```

각 모듈은 [InternalModule](https://github.com/SilentVoid13/Templater/blob/master/src/InternalTemplates/InternalModule.ts) 추상 클래스를 확장하므로 다음과 같은 속성과 메서드를 포함합니다:

- `this.app` 속성: Obsidian API의 `App` 객체입니다.
- `this.file` 속성: 템플릿이 삽입될 대상 파일입니다.
- `this.plugin` 속성: Templater 플러그인 객체입니다.
- `this.static_templates` 속성: 정적인 (이름; 변수/함수)을 포함하는 맵입니다. 정적 변수/함수는 실행 시 파일에 의존하지 않는다는 것을 의미합니다. 이러한 유형의 변수/함수는 새로운 템플릿을 삽입할 때마다 업데이트되지 않으므로 오버헤드를 절약할 수 있습니다.
- `this.dynamic_templates` 속성: `static_templates`와 동일하지만 실행 시 파일에 의존하는 변수/함수를 포함합니다.
- `this.createStaticTemplates()` 메서드: 해당 모듈에 대한 모든 정적 내부 변수/함수를 등록합니다.
- `this.updateTemplates()` 메서드: 해당 모듈에 대한 모든 동적 내부 변수/함수를 등록합니다.

이러한 속성을 필요로 하는 경우 새로운 내부 변수/함수에서 이들을 사용할 수 있습니다.

## 새로운 내부 변수/함수 등록하기

모듈에서 새로운 내부 변수/함수를 등록하기 위해 따라야 할 단계는 다음과 같습니다.

**1단계:** 모듈 내에 `generate_<내부_변수_또는_함수_이름>()`이라는 메서드를 생성합니다. 이 메서드는 내부 변수/함수를 생성하며, 즉, 노출할 내부 함수를 나타내는 람다 함수 또는 직접 노출하려는 내부 변수를 반환합니다.

모든 생성 메서드는 내부 변수/함수 이름을 기준으로 알파벳 순서로 정렬됩니다.

변수/함수에 명확하고 자명한 이름을 지정하는 것이 좋습니다.

**2단계:** `static_templates` 또는 `dynamic_templates` 맵에 등록합니다. 파일 실행 시 파일에 의존하는지 여부에 따라 등록 위치가 달라집니다. 등록은 `createStaticTemplates` 또는 `updateTemplates`에서 수행됩니다.

변수/함수를 등록하기 위해 이전에 정의한 `this.generate_<내부_변수_또는_함수_이름>()` 메서드를 사용하세요:

```typescript
this.static_templates.set(<내부_변수_또는_함수_이름>, this.generate_<내부_변수_또는_함수_이름>());
OR
this.dynamic_templates.set(<내부_변수_또는_함수_이름>, this.generate_<내부_변수_또는_함수_이름>());
```

내부 변수/함수 등록은 변수/함수 이름을 기준으로 알파벳 순서로 정렬됩니다.

**3단계:** Templater의 [문서](https://github.com/SilentVoid13/Templater/tree/master/docs/docs/internal-variables-functions/internal-modules)에 내부 변수/함수 문서를 추가합니다.

그리고 여기까지입니다! [Templater](https://github.com/SilentVoid13/Templater)에 기여해 주셔서 감사합니다!

이제 Github에서 [pull requests](https://github.com/SilentVoid13/Templater/pulls)를 제출하시면 됩니다. 가능한 한 신속하게 처리해 드리겠습니다.