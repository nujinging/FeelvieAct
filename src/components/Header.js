import './../App.scss';
import {Link} from "react-router-dom";

export default function Header() {

    const logo = "https://www.tving.com/img/tving-new-logo-pc.svg";

    return (
        <header className="wrap_header">
            <div className="header_container">
                <div className="navigation">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                    <ul className="menu">
                        <li>
                            <Link to="/genre/movie">영화</Link>
                        </li>
                        <li>
                            <Link to="/genre/tv">TV프로그램</Link>
                        </li>
                    </ul>
                </div>
                <Link to="/search" className="search"><span className="blind">검색</span></Link>
            </div >
        </header >
    );
}
