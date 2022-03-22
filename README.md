## Notes

This example shows how to integrate the TypeScript type system into Next.js. Since TypeScript is supported out of the box with Next.js, all we have to do is to install TypeScript.

```
npm install --save-dev typescript
```

To enable TypeScript's features, we install the type declarations for React and Node.

```
npm install --save-dev @types/react @types/react-dom @types/node
```

When we run `next dev` the next time, Next.js will start looking for any `.ts` or `.tsx` files in our project and builds it. It even automatically creates a `tsconfig.json` file for our project with the recommended settings.

Next.js has built-in TypeScript declarations, so we'll get autocompletion for Next.js' modules straight away.

A `type-check` script is also added to `package.json`, which runs TypeScript's `tsc` CLI in `noEmit` mode to run type-checking separately. You can then include this, for example, in your `test` scripts.

## 기본 정보

### 환경 변수

```bash
EMAIL : '더캠프이메일'
PASSWORD : '더캠프 비밀번호'

SOLDIER_NAME : '이름'
SOLDIER_BIRTHDAY : '생일' // ex 19980728
SOLDIER_ENTER_DATE : '입소일'// ex 20201008
SOLDIER_CLASS_NAME : '성분' // ex 예비군인/훈련병
SOLDIER_GROUP_NAME : '군종' // ex 육군
SOLDIER_UNIT_NAME : '연대' // ex 육군훈련소(25연대)

// 직접 위문편지 쓰기 메뉴, 카페 목록 메뉴의 console에서 따오기
TRAIN_UNIT_TYPE_CD = '부대타입'
TRAIN_UNIT_CD= '입영부대 코드(교육부대 코드)'
TRAIN_UNIT_EDU_SEQ='교육대 코드'
TRAINEE_MGR_SEQ = '훈련병 식별 코드'

NEXT_PUBLIC_NAME : '페이지에 표시될 이름' // 윤태원
NEXT_PUBLIC_BIRTHDAY : '페이지에 표시될 출생 날짜' // 07/28/1998 출생
NEXT_PUBLIC_ENTERDAY : '페이지에 표시될 입소 날짜' // 10/08/2020 입소
```
