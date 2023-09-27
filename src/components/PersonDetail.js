import './../App.scss';
import {movieApi} from "../util/movieApi";
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import List from "./List";


export default function PersonDetail(props) {
    const params = useParams();

    const [typeTabs, setTypeTabs] = useState('movie');
    const [dataUrl, setDataUrl] = useState();
    const [artUrl, setArtUrl] = useState([]);

    const [artPopular, setArtPopular] =useState([]);

    const typeChange = (type) => {
        setTypeTabs(type)
    };


    useEffect(() => {
        async function Api() {
            const detail = await movieApi.person(params.id);
            setDataUrl(detail.data);

            const art = await movieApi.personArt(params.id, typeTabs);

            const art_list = art.data.cast.sort((a, b) => {
                const dateA = a.release_date || a.first_air_date;
                const dateB = b.release_date || b.first_air_date;

                if (dateA && dateB) {
                    return new Date(dateB) - new Date(dateA);
                }

                return 0;
            });
            setArtUrl(art_list);


            const popular = [...artUrl].sort((a, b) => b.vote_average - a.vote_average).slice(0, 5);
            setArtPopular(popular)
        }
        Api();
    }, [artUrl, typeTabs, params.id]);

    console.log(artPopular)


    return (
        <div className="container">
            {dataUrl ? (
                <section className="person_detail">
                    <picture>
                        <img src={`https://image.tmdb.org/t/p/w300/${dataUrl.profile_path}`} alt="이미지"/>
                    </picture>
                    <div className="profile_info">
                        <div className="profile_name">
                            <h1>{dataUrl.name}</h1>
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
                                <dd>{dataUrl.birthday}</dd>
                            </dl>
                            <dl>
                                <dt>성별</dt>
                                <dd>
                                    {dataUrl.gender === '1' ? '여자' : '남자'}
                                </dd>
                            </dl>
                        </div>

                        <div className="title">
                            <h2>유명 작품</h2>
                        </div>
                        <List list={artPopular} />

                        <div className="work">
                            <div className="work_top">
                                <h3>필모그래피</h3>
                                <ul className="type_list">
                                    <li>
                                        <button type="button" className={typeTabs === 'movie' ? 'active' : ''} onClick={() => typeChange('movie')}>영화</button>
                                    </li>
                                    <li>
                                        <button type="button" className={typeTabs === 'tv' ? 'active' : ''} onClick={() => typeChange( 'tv')}>TV</button>
                                    </li>
                                </ul>
                            </div>

                            <ul className="work_list">
                                {
                                    artUrl.map(item => {
                                        return (
                                            <li>
                                                <span className="date">
                                                    {item.release_date ? item.release_date.substring(0, 4) : item.first_air_date ? item.first_air_date.substring(0, 4) : null}
                                                </span>
                                                <p className="tit">
                                                    {item.title || item.original_name}
                                                </p>
                                                <span className="char">
                                                    {item.character} 역
                                                </span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                </section>
            ) : (
                <p>오류</p>
            )}
        </div>
    );
}
