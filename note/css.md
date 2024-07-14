## Header에서 사용한 css - 마우스 hover시에 밑줄

- width 속성을 사용하지 않고 transform 속성으로 조작하고자 했음.
  - 이유 : 웹최적화를 위해서.
    gpu가 관여할 수 있는 속성을 사용하여 css layer, paint 과정을 생략하기 위함

### 적용 방법

```
// ...

.some_className::before{
  // ... 기타 속성
  width : 100%; // 가상 요소의 너비를 부모와 동일하게 설정
  transform : scaleX(0); // 초기 상태에서 가상 요소 너비를 0으로 설정
  transform-origin : left; // transform 이벤트가 왼쪽에서 부터 시작하도록 설정
  transition : transform .3s ease; // 애니메이션 작용이 될 때, 적용될 속성 및 시간, 속도를 지정
}

.some_className:hover::before (or ::after) {
  transform : scaleX(1); // 1 === 100%, 0.5 === 50% ...
}
```
