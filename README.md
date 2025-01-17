![header](https://capsule-render.vercel.app/api?type=waving&color=auto&height=300&section=header&text=ByeongjunKim&fontSize=90)
<h3 align="center"> 👋 Hi! nice to see you! </h3>
<p align="center">
I'm a Frontend Web Developer. 
  <br>🌱
  이번에 과제로 grid ui를 구현해보았습니다.
  아래는 과제에 사용한 스킬들과 툴입니다.
</p>

### 💪 사용 스킬들
<div style= "display: flex">
  <img src ="https://img.shields.io/badge/-HTML5-orange?&style=for-the-badge&logo=HTML5&logoColor=white" style= "height: auto; margin-left: 10px; margin-right :    10px"/>
<img src ="https://img.shields.io/badge/-CSS3-9cf?&style=for-the-badge&logo=CSS3&logoColor=white" style= "height: auto; margin-left: 10px; margin-right : 10px"/>
<img src ="https://img.shields.io/badge/-JavaScript-F7DF1E?&style=for-the-badge&logo=JavaScript&logoColor=white" style= "height: auto; margin-left: 10px; margin-right : 10px"/>
<img src ="https://img.shields.io/badge/-React-61DAFB?&style=for-the-badge&logo=React&logoColor=white" style= "height: auto; margin-left: 10px; margin-right : 10px"/>
  <img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white">
  <img src="https://img.shields.io/badge/express-000000?style=for-the-badge&logo=express&logoColor=white">
 <img src ="https://img.shields.io/badge/-styled--components-ff96b4?&style=for-the-badge&logo=styled-components&logoColor=white" style= "height: auto; margin-left: 10px; margin-right : 10px"/> 
</div>

### ⚙️ TOOLS
<div style= "display: flex">
  <img src ="https://img.shields.io/badge/-Git-F05032?&style=for-the-badge&logo=Git&logoColor=white" style= "height: auto; margin-left: 10px; margin-right : 10px"/>
    <img src ="https://img.shields.io/badge/-Visual Studio Code-007ACC?&style=for-the-badge&logo=Visual Studio Code&logoColor=white" style= "height: auto; margin-left: 10px; margin-right : 10px"/>
</div>

### 과제 설명
프론트엔드로는 React.js를 사용하였고, 백엔드에는 Node.js를 사용했습니다.<br>
 
### 개발을 하면서 문제 해결 과정 간략 설명
과제를 하던 중 가장 막혔던 부분이 무한 스크롤 기능이었습니다. 데이터 ID 값이 데이터 갯수에 따라 순차적으로 쌓이지 않고, 중복되는 경우가 많았고, 
데이터가 스크롤을 동작하지 않아도 자동으로 추가되는 문제가 있었습니다.
또 데이터가 추가가 되면 검색 기능, 정렬 기능 등 대부분의 기능이 동작하지 않았습니다.
데이터가 초기화 되거나 추가될 시 map 함수를 이용해 고유한 ID를 추가하는 방식으로 해봤는데 계속해서 중복 ID 값이 적용되었습니다.
계속 헤매다가 처음부터 전역 변수를 추가하였고, 초기 ID 데이터는 항상 1부터 순차적을 부여하게끔 수정하였습니다. 그리고 currentId는 초기 데이터의 마지막 id 값을 유지하게끔하고고
추가 데이터는 currentId + 1부터 시작하여 고유 id가 부여되게끔 구현했더니 해결되었습니다.
또 스크롤 동작 없이 자동으로 데이터가 추가되는 문제는 스크롤 이벤트 조건이 명확하지 않는 문제였습니다.
이 부분은 threshold 값을 조정해 스크롤이 끝에 거의 도달했을 때 추가 데이터를 로드하도록 수정하였고, 이벤트 호출이 너무 자주 발생하지 않도록 디바운싱을 적용했습니다.
또 중복 호출을 방지하기 위해 isLoading 적용하여 방지하였습니다.


### 실행 방법
github에 각 폴더에서 클론 코드를 다운 받습니다. 그리고 각각 npm install 명령어로 해당 코드들의 모듈이 설치될수 있도록 합니다. <br>
백엔드는 node index.js 로 서버가 동작합니다. 프론트엔드는 터미널에 npm start를 입력하면 됩니다.<br>

