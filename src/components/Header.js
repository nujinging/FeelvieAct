import './../App.scss';
import { Link } from 'react-router-dom';

function Header() {

    const logo = "https://www.tving.com/img/tving-new-logo-pc.svg";

    return (
        <header className="wrap_header">
            <div className="header_container">
                <div className="navigation">
                    <a>
                        <img src={logo} alt="logo" />
                    </a>
                    <ul className="menu">
                        <li>
                            <a to="/genre">영화</a>
                        </li>
                        <li>
                            <a to="/movie">TV프로그램</a>
                        </li>
                    </ul>
                </div>
            </div >
        </header >
    );
}

export default Header;
