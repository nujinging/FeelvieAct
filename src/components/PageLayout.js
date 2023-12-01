import './../scss/common.scss';
import './../scss/reset.scss';
import {Outlet} from "react-router-dom";
import Header from "./Header";

export default function PageLayout() {
  // 현재 경로에 맞는 하위 경로의 컴포넌트 렌더링 - Outlet
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
}