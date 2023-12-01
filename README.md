## Front-End *👩 김유진*

영화 ,TV 프로그램을 수집하는 TMDB의 API를 활용한 작품/배우 소개 페이지

'느낌'이라는 뜻의 Feel와 프랑스어로 '삶'을 의미하는 두 단어를 조합한 Feelvie에 React의 Act를 붙여 탄생

자매품 : Feelvie(원조), FeelvieFlight , FeelvieCulture

### URL
https://feelvieact.netlify.app/

### ⚙️ Stack
- React 18.2
- Javascript
- HTML
- SCSS

### Installation
```
npm install --save swiper axios react-router-dom redux redux-thunk lodash
```
### Verson
```
react-dom: 18.2.0
react-redux: 8.1.3
react-router-dom: 6.16.0
react-scripts: 5.0.1
```
----

# 💡 Page
- 전체적인 이미지에 loading lazy 적용

## Main
![main](https://github.com/nujinging/FeelvieAct/assets/78008757/af722543-9160-49b0-9ffa-994ad260e89d)

- 홈배너와 "상영중, 가장 인기, 오늘 인기, 이번주 인기" 총 네항목의 리스트를 보여줌

## Genre
![genre](https://github.com/nujinging/FeelvieAct/assets/78008757/770b6b47-a75c-4814-83ef-7b2ac0656c97)
- MOVIE, TV 리스트 분리
- "인기도 내림차순, 인기도 오름차순, 상영일 내림차순, 상영일 오름차순" 총 네항목의 정렬 기능
- 총 20개의 아이템을 뿌려주고 더보기 버튼을 통해서 추가로 20개를 더 보여주는 형식
- 반응형인 것을 감안, 모든 디바이스, 브라우저에서 무한스크롤을 적용할 시 이슈가 있을 것을 생각하여 버튼형으로 진행)

## Search
![search](https://github.com/nujinging/FeelvieAct/assets/78008757/b99b9c12-60a7-43af-ae3f-ff10d7449367)
- 입력 후 0.7초 뒤 API 호출
- 입력값이 없을 시엔 "안내문구 노출"
- 입력값이 있으나 결과값이 없을 경우 "검색결과없음 노출"
- 입력값, 결과값 모두 있을 경우 "리스트 노출"

## Art Detail
![movieDetail](https://github.com/nujinging/FeelvieAct/assets/78008757/3c189c93-4091-40b9-8aac-f41d09227bce)
![tvDetail](https://github.com/nujinging/FeelvieAct/assets/78008757/8ac544ae-df79-4f72-a3aa-8994c112cab3)
- PC - 작품에 대한 정보를 좌측 최상단으로 두고 우측에 포스터를 둠으로써
  정보를 먼저 얻고 부가적으로 이미지에 시선이 가도록 레이아웃 배치
- Mobile - 텍스트보다 포스터를 먼저 볼 수 있도록 배치하여 작은 정보를 바로 인식할 수 있도록 함
- 작품 Type, 상영/방영일자, 장르, OTT 항목, 줄거리, SNS

## Person Detail
![personDetail](https://github.com/nujinging/FeelvieAct/assets/78008757/afafac0b-d5a8-4c34-b8ff-172cf9faaa13)
- 좌측에 인물 사진을 고정으로 두어 우측 리스트가 스크롤 되더라도 해당 인물에 관한 내용이라는 것을 직관적으로 배치 - Person Detail, Season Detail, Credits Detail 공통
- 이름, 나이, 성별, SNS 기본정보 배치
- 해당 배우의 작품 타입 (Movie, Tv)을 탭으로 두고 해당 타입에 맞는 리스트 배치
- 평균 평점값을 가져와 높은 순으로 배치 후 5개 리스트만 추출
- 전체적인 필모그래피는 리스트로 가져오고 날짜 api에서 연도만 추출 후 제목과 배역을 맡은 이름 나열

## Season Deatil
![seasonDetail](https://github.com/nujinging/FeelvieAct/assets/78008757/29ba0af9-013d-4a26-89b0-ef10b9982554)
- 좌측에 시즌을 대표하는 포스터 사진을 고정으로 두어 우측 리스트가 스크롤 되더라도 해당 시즌에 관한 내용이라는 것을 직관적으로 배치
- 제일 마지막으로 방영했던 시즌부터 보여주고 select 로 사용자가 시즌을 선택해서 볼 수 있도록 함
- 시즌 에피소드 1번부터 나열하고 날짜, 타이틀, 줄거리를 보여줌

## Credits Deatil
![creditsDetail](https://github.com/nujinging/FeelvieAct/assets/78008757/705d1029-147a-4c4d-842a-6db5c0cde61c)
- 좌측에 시즌을 대표하는 포스터 사진을 고정으로 두어 우측 리스트가 스크롤 되더라도 해당 시즌에 관한 내용이라는 것을 직관적으로 배치
- 배역과 제작진 배치
- 모바일에서는 접기/펼치기 기능 추가


---


# ⛏ COMPONENT
## Header, Loading
- 단순 공통 컴포넌트

## List
- 슬라이드 형식의 리스트
- 값에 따라 작품/인물 등 어디서든 사용 가능하고 링크또한 값에 따라 이동되도록 구현
  
## HomeSlide
- Main에만 사용 / 인기 항목 5개만 우선적으로 보여줌
- autoplay 2.5초
  
## LoadingProgress
- 현재는 Genre에만 사용하지만 전체적으로 사용하려고 계획중
  
## MediaDetail
- 작품 디테일 페이지의 세부 컴포넌트
- 동영상,배경,포스터를 탭으로 구현하고 탭에 해당 길이를 작성
- 동영상 : 클릭 시 해당 ID 에 해당하는 값으로 유튜브 연결
- 배경,포스터 : 속도개선을 위하여 낮은 화질의 이미지를 보여주고 클릭 시 새창으로 원본을 볼 수 있게 함

## SeasonList
- 제일 마지막으로 방영했던 시즌의 포스터와 에피소드, 간략한 줄거리 내용을 보여줌
- 전체시즌보기로 페이지로 이동이 가능하여 간략한 내용만 모여줌

## NotFound
- 주소없는 404 페이지

## AxiosError
- Api 404 페이지

## PageLayout
- NotFound에는 Header를 사용하지 않기 때문에 레이아웃 분리하여 진행

