---
created: 2023-10-14 T19:05
updated: 2023-10-14 T21:49
---
# Data Arrays

Dataview에서 결과 목록의 일반적인 표현은 `DataArray`입니다. 이는 JavaScript 배열의 [프록시](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 버전으로, 확장된 기능을 제공합니다. DataArray는 색인 및 반복 (for 및 for ... of 루프를 통한)을 지원하며 정렬, 그룹화, 중복 제거, 필터링 등과 같은 데이터 조작 연산자를 포함하여 탭ular 데이터를 쉽게 조작할 수 있도록 합니다.

## 생성

DataArray는 대부분의 Dataview API에서 여러 결과를 반환하는 경우에 반환됩니다. 또한 일반적인 JavaScript 배열을 Dataview 배열로 명시적으로 변환할 수도 있습니다 (`dv.array(<array>)`). Data Array를 다시 일반 배열로 변환하려면 `DataArray#array()`를 사용하세요.

## 인덱싱과 스위즐링

DataArray는 `array[0]`와 같이 일반 배열처럼 인덱싱을 지원하지만 중요한 것은 쿼리 언어 스타일의 "스위즐링"도 지원한다는 점입니다. 즉, 데이터 배열에 필드 이름으로 인덱싱하는 경우 (`array.field`와 같이), 배열의 모든 요소가 자동으로 `field`로 매핑되며, `field` 자체가 배열인 경우에도 펼쳐집니다.

예를 들어, `dv.pages().file.name`은 볼트 내 모든 파일 이름의 데이터 배열을 반환합니다. `dv.pages("#books").genres`는 책에서 모든 장르의 평면화된 목록을 반환합니다.

## Raw 인터페이스

데이터 배열 구현에 대한 전체 인터페이스는 아래에 제공됩니다.

```ts
/** 배열 요소를 일부 값으로 매핑하는 함수 */
export type ArrayFunc<T, O> = (elem: T, index: number, arr: T[]) => O;

/** 두 개의 값 타입을 비교하는 함수 */
export type ArrayComparator<T> = (a: T, b: T) => number;

/**
 * 데이터 조작을 위해 배열 기반 데이터를 조작할 수 있는 프록시 인터페이스입니다.
 * 데이터 배열에서 모든 함수는 새로운 배열을 생성합니다 (즉, 배열은 불변성이 유지됩니다).
 */
export interface DataArray<T> {
    /** 데이터 배열의 총 요소 수 */
    length: number;

    /** 주어진 조건과 일치하는 요소로 데이터 배열 필터링하기 */
    where(predicate: ArrayFunc<T, boolean>): DataArray<T>;
    /** 필요한 경우 'where' 대신 사용되는 'filter' 별칭입니다. */
    filter(predicate: ArrayFunc<T, boolean>): DataArray<T>;

    /** 각 요소에 함수를 적용하여 데이터 배열 매핑하기 */
    map<U>(f: ArrayFunc<T, U>): DataArray<U>;
    /** 각 요소에 함수를 적용하여 데이터 배열 매핑한 다음 결과를 펼쳐서 새로운 배열 생성하기 */
    flatMap<U>(f: ArrayFunc<T, U[]>): DataArray<U>;
    /** 데이터 배열의 모든 값 변경하기 */
    mutate(f: ArrayFunc<T, any>): DataArray<any>;

    /** 데이터 배열의 총 개수 제한하기 */
    limit(count: number): DataArray<T>;
    /**
     * 슬라이스 가져오기. 'start'가 정의되지 않은 경우 0으로 가정하고 'end'가 정의되지 않은 경우 배열 끝으로 가정합니다.
     */
    slice(start?: number, end?: number): DataArray<T>;
    /** 현재 데이터 배열과 다른 iterable / data array / array의 값을 연결하기 */
    concat(other: Iterable<T>): DataArray<T>;

    /** 주어진 값이 처음으로 나타나는 인덱스 반환하기 (선택적으로 검색 시작) */
    indexOf(element: T, fromIndex?: number): number;
    /** 주어진 조건을 만족하는 첫 번째 요소 반환하기 */
    find(pred: ArrayFunc<T, boolean>): T | undefined;
    /** 주어진 조건을 만족하는 첫 번째 요소의 인덱스 찾기. 찾지 못한 경우 -1 반환함. */
   findIndex(pred: ArrayFunc<T, boolean>, fromIndex?: number): number;
   /** 배열에 지정된 요소가 포함되어 있는지 여부 확인하여 true 또는 false 반환함. */
   includes(element: T): boolean;

   /**
    * 각 요소를 문자열로 변환하여 주어진 구분자 (기본값은 ', ')로 연결한 문자열 반환하기.
    */
   join(sep?: string): string;

   /**
    * 주어진 키를 기준으로 정렬된 배열 반환하기. 선택적으로 비교자를 제공하면 기본 dataview 비교자 대신 키를 비교하는 데 사용됩니다.
    */
   sort<U>(key: ArrayFunc<T, U>, direction?: "asc" | "desc", comparator?: ArrayComparator<U>): DataArray<T>;

   /**
    * 주어진 키로 요소를 그룹화하여 배열을 반환합니다. 결과 배열은 { key: <키 값>, rows: DataArray } 형식의 객체입니다.
    */
   groupBy<U>(key: ArrayFunc<T, U>, comparator?: ArrayComparator<U>): DataArray<{ key: U; rows: DataArray<T> }>;

   /**
     * 중복되지 않는 항목을 반환합니다. 만약 키가 제공된다면, 고유한 키를 가진 행들이 반환됩니다.
     */
    distinct<U>(key?: ArrayFunc<T, U>, comparator?: ArrayComparator<U>): DataArray<T>;

    /** 모든 값에 대해 조건이 참인 경우 true를 반환합니다. */
    every(f: ArrayFunc<T, boolean>): boolean;
    /** 적어도 하나의 값에 대해 조건이 참인 경우 true를 반환합니다. */
    some(f: ArrayFunc<T, boolean>): boolean;
    /** 모든 값에 대해 조건이 거짓인 경우 true를 반환합니다. */
    none(f: ArrayFunc<T, boolean>): boolean;

    /** 데이터 배열에서 첫 번째 요소를 반환합니다. 배열이 비어있는 경우 undefined가 반환됩니다. */
    first(): T;
    /** 데이터 배열에서 마지막 요소를 반환합니다. 배열이 비어있는 경우 undefined가 반환됩니다. */
    last(): T;

   /** 이 데이터 배열의 각 요소를 주어진 키로 매핑한 다음 평탄화합니다.*/
   to(key: string): DataArray<any>;
   /**
     * 주어진 키를 재귀적으로 확장하여 계층 구조 데이터(예: '하위 작업'을 가진 작업)를 평탄한 배열로 변환합니다.
     * 처리하기 어려운 계층 구조 데이터에 유용합니다.
     */
   expand(key: string): DataArray<any>;

   /** 각 요소에 대해 람다 함수를 실행합니다. */
   forEach(f: ArrayFunc<T, void>): void;

   /** 이를 일반 JavaScript 배열로 변환합니다. */
   array(): T[];

   /** 배열을 직접 반복할 수 있도록 허용합니다. */
   [Symbol.iterator](): Iterator<T>;

   /** 인덱스를 값에 매핑합니다. */
   [index: number]: any;
   /** 필드의 자동 평탄화입니다. `array.to("field")`를 암시적으로 호출하는 것과 동일합니다. */
   [field: string]: any;
}
```