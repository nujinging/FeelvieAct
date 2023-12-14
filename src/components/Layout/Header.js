import '../../scss/header.scss';
import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import logoImage from '../../images/logo.png'
import useScrollFixed from "../../hooks/useScrollFixed";

export default function Header() {
  const location = useLocation();
  const number = 'All';

  // 공통 스크롤 감지
  const scrollFixed = useScrollFixed();
  const pageRefresh = (path) => {
    if (location.pathname !== path) {
      window.location.href = path;
    }
  };
  const GenreRefresh = (path) => {
    if (location.pathname.includes(path)) {
      window.location.href = `${path}/All`;
    }
  };

  return (
    <header className={`wrap_header ${scrollFixed ? "fixed" : ""}`}>
      <div className="header_container">
        <div className="navigation">
          <Link to="/" onClick={() => pageRefresh('/')}>
            <img src={logoImage} alt="logo"/>
          </Link>
          <ul className="menu">
            <li>
              <Link to={`/genre/movie/${number}`}
                    className={location.pathname.includes('/genre/movie/') ? 'active' : ''}
                    onClick={() => GenreRefresh('/genre/movie')}>영화</Link>
            </li>
            <li>
              <Link to={`/genre/tv/${number}`} className={location.pathname.includes('/genre/tv/') ? 'active' : ''}
                    onClick={() => GenreRefresh('/genre/tv')}>TV프로그램</Link>
            </li>
          </ul>
        </div>
        <Link to="/search" className={`search ${location.pathname === '/search' ? 'active' : ''}`}
              onClick={() => pageRefresh('/search')}><span className="blind">검색</span></Link>

      </div>
    </header>
  );
}
