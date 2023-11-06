import './../App.scss';
import {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {movieActions} from "../util/movieActions";
import {seasonActions} from "../util/seasonActions";
import List from "./List";
export default function SeasonList() {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [itemId, setItemId] = useState(null);
    const seasonData = useSelector(state => state.movies.seasonData);

    /* 시즌 에피소드 5개 보여주기 */
    const seasonList = seasonData?.episodes.slice(0, 5);

    useEffect(() => {
        async function Api() {
            try {
                await dispatch(movieActions(params.type, params.id));
                await dispatch(seasonActions(params.type, params.id));

                window.scrollTo(0, 0);
            } catch (error) {

            }
        }

        Api();
        movieActions();
        seasonActions();
    }, [params.type, params.id, itemId]);

    return (
        <div className="last_season">
            <div className="title">
                <h2>현재 시즌</h2>
                <Link to={`/${params.type}/series/${params.id}/episode`} className="season_link">
                    전체 시즌 보기
                </Link>
            </div>


            <div className="season_box">
                <Link to={`/${params.type}/series/${params.id}/episode`} className="season_main">
                    <img src={seasonData?.poster_path ? `https://image.tmdb.org/t/p/w342${seasonData?.poster_path}` : ``} alt=""
                         loading="lazy"/>
                </Link>
                <List type={params.type} list={seasonList} class={"season_list"}></List>
            </div>
        </div>
    );
}
