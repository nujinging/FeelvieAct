import '../../scss/layout/common.scss';
import '../../scss/layout/reset.scss';
import {Outlet} from "react-router-dom";
import Header from "./Header.tsx";

const PageLayout : React.FC = () => {
  // 현재 경로에 맞는 하위 경로의 컴포넌트 렌더링 - Outlet
  return (
    <>
      <Header/>
      <Outlet/>
    </>
  );
}
export default PageLayout;