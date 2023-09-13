import './../App.scss';
import {Link} from "react-router-dom";

export default function ItemDetail() {
    return (
        <section className="detail_container">
            <div className="detail_info">
                <h1>제목</h1>
                <div className="meta">
                    <span className="txt">액션</span>
                </div>
                <div className="comment">
                    <p className="quites">코멘트</p>
                    <p className="intro">문구</p>
                </div>
            </div>
            <div className="detail_poster">
                <ul className="social_links">
                    <li>
                        <Link href="">페이스북</Link>
                    </li>
                </ul>
                <picture>
                    <img src="" alt=""/>
                </picture>
            </div>
        </section>
    );
}
