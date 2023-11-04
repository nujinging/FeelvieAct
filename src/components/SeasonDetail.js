import './../App.scss';
import {Link, useParams} from "react-router-dom";
import List from "./List";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {movieActions} from "../util/movieActions";
import {seasonActions} from "../util/seasonActions";
export default function SeasonDetail() {
    const params = useParams();
    const dispatch = useDispatch();
    const seriesData = useSelector(state => state.movies.seriesData);

    /* 시즌 에피소드 5개 보여주기 */
    const seasonList = seriesData?.episodes.slice(0, 5);

    useEffect(() => {
        async function Api() {
            try {
                await dispatch(movieActions(params.type, params.id));
                await dispatch(seasonActions(params.id, params.id));

                window.scrollTo(0, 0);
            } catch (error) {

            }
        }

        Api();
        movieActions();
        seasonActions();
    }, [params.type, params.id]);

    return (
        <div className="last_season">
            <div className="title">
                <h2>현재 시즌</h2>
                <Link to={`/series/${params.id}/episode`} className="season_link">
                    전체 시즌 보기
                </Link>
            </div>


            <div className="season_box">
                <Link to={`/series/${params.id}/episode`} className="season_main">
                    <img src={seriesData?.poster_path ? `https://image.tmdb.org/t/p/w342${seriesData?.poster_path}` : ``} alt=""
                         loading="lazy"/>
                </Link>
                <List type={params.type} list={seasonList} class={"season_list"}></List>
            </div>
        </div>
    );
}
