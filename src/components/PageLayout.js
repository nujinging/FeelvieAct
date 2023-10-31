import './../App.scss';
import Header from "./Header";
import {Outlet} from "react-router-dom";


export default function PageLayout() {
    // 현재 경로에 맞는 하위 경로의 컴포넌트 렌더링 - Outlet
    return (
        <div>
            <Header />
            <Outlet  />
        </div>
    );
}