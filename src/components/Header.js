import './../App.scss';
import { Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

export default function Header() {
    const location = useLocation();
    const logo = "https://www.tving.com/img/tving-new-logo-pc.svg";
    const [headerFixed, setHeaderFixed] = useState(false);
    const number = 'All';

    const pageRefresh = (path) => {
        if (location.pathname === path) {
            window.location.reload();
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {
        const scrollY = window.scrollY;
        if (scrollY > 100) {
            setHeaderFixed(true);
        } else {
            setHeaderFixed(false);
        }
    };
    return (
        <header className={`wrap_header ${headerFixed ? "fixed" : ""}`}>
            <div className="header_container">
                <div className="navigation">
                    <Link to="/" onClick={() => pageRefresh('/')}>
                        <img src={logo} alt="logo" />
                    </Link>
                    <ul className="menu">
                        <li>
                            <Link to={`/genre/movie/${number}`} className={location.pathname.includes('/genre/movie/') ? 'active': ''} onClick={() => pageRefresh('/genre/movie')}>영화</Link>
                        </li>
                        <li>
                            <Link to={`/genre/tv/${number}`} className={location.pathname.includes('/genre/tv/') ? 'active': ''} onClick={() => pageRefresh('/genre/tv')}>TV프로그램</Link>
                        </li>
                    </ul>
                </div>
                <Link to="/search" className={`search ${location.pathname === '/search' ? 'active' : ''}`} onClick={() => pageRefresh('/search')}><span className="blind">검색</span></Link>

            </div>
        </header>
    );
}
