import '../../scss/layout/header.scss';
import { Link, useLocation } from 'react-router-dom';
import logoImage from '../../images/logo.png';
import useScrollFixed from '../../commonEvent/useScrollFixed';

const Header: React.FC = () => {
    const location = useLocation();
    const number: string = 'All';

    const scrollFixed = useScrollFixed();

    const pageRefresh = (path: string) => {
        if (location.pathname !== path) {
            window.location.href = path;
        }
    };

    const GenreRefresh = (path: string) => {
        if (location.pathname.includes(path)) {
            window.location.href = `${path}/All`;
        }
    };

    const isMovieActive = location.pathname.includes('/movie');
    const isTvActive = location.pathname.includes('/tv');

    return (
        <header className={`wrap_header ${scrollFixed ? 'fixed' : ''}`}>
            <div className="header_container">
                <div className="navigation">
                    <Link to="/" onClick={() => pageRefresh('/')}>
                        <img src={logoImage} alt="logo" />
                    </Link>

                    <ul className="menu">
                        <li>
                            <Link
                                to={`/genre/movie/${number}`}
                                className={isMovieActive ? 'active' : ''}
                                onClick={() => GenreRefresh('/genre/movie')}
                            >
                                영화
                            </Link>
                        </li>
                        <li>
                            <Link
                                to={`/genre/tv/${number}`}
                                className={isTvActive ? 'active' : ''}
                                onClick={() => GenreRefresh('/genre/tv')}
                            >
                                TV프로그램
                            </Link>
                        </li>
                    </ul>
                </div>

                <Link
                    to="/search"
                    className={`search ${location.pathname.includes('/search') ? 'active' : ''}`}
                    onClick={() => pageRefresh('/search')}
                >
                    <span className="blind">검색</span>
                </Link>
            </div>
        </header>
    );
};

export default Header;
