import './../App.scss';
import { useParams } from "react-router-dom";
import {movieApi} from "../util/movieApi";
import {useEffect, useState} from "react";



export default function ItemDetail(props) {
    const params = useParams();
    const [dataUrl, setDataUrl] = useState();

    console.log(props)

    useEffect(() => {
        async function Api() {
            const detail = await movieApi.detail('tv', 456);
            setDataUrl(detail.data);
        }
        Api();
    }, []);

    return (
        <div className="container">
            <section className="person_detail">
                <picture>
                </picture>
                <div className="profile_info">
                    <div className="profile_name">
                        <h1></h1>
                        <ul className="social_links">
                            <li>
                                <a className="facebook" target="_blank">
                                    <span className="blind">페이스북</span>
                                </a>
                            </li>
                            <li>
                                <a className="tritter" target="_blank">
                                    <span className="blind">트위터</span>
                                </a>
                            </li>
                            <li>
                                <a className="instargram" target="_blank">
                                    <span className="blind">인스타그램</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div className="profile_desc">
                        <dl>
                            <dt>생년월일</dt>
                            <dd></dd>
                        </dl>
                        <dl>
                            <dt>성별</dt>
                            <dd></dd>
                        </dl>
                    </div>

                    <div className="title">
                        <h2>유명 작품</h2>
                    </div>

                    <div className="work">
                        <div className="work_top">
                            <h3>필모그래피</h3>
                            <ul className="type_list">
                                <li>
                                    <button type="button"
                                            className="">영화
                                    </button>
                                </li>
                                <li>
                                    <button type="button"
                                            className="">TV
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <ul className="work_list">
                            <li>
                                <span className="date"></span>
                                <p className="tit">

                                </p>
                                <span className="char">

                                </span>
                            </li>

                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
