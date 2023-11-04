import './../../App.scss';
export default function ImgModal(props) {
    const { item } = props.item;

    return (
        <div className="img_modal">
            <div className="inner">


                <a href={`https://www.themoviedb.org/t/p/original${props.item.file_path}`}
                   className={`img_link ${props.item.width > props.item.height ? 'img_width' : 'img_height'}`}
                   target="_blank">
                    <img src={`https://image.tmdb.org/t/p/w500${props.item.file_path}`} alt="Movie Poster"
                         loading="lazy"/>
                </a>
                <p className="img_txt">이미지를 클릭하여 원본 ({props.item.width}X{props.item.height})을 확인 해보세요!</p>
                <button type="button" className="modal_close" >
                    <span className="blind">닫기</span>
                </button>



                {/*<a href={`https://www.themoviedb.org/t/p/original${props.itemData.file_path}`}*/}
                {/*   className={`img_link ${videoSize.width > videoSize.height ? 'img_width' : 'img_height'}`}*/}
                {/*   target="_blank">*/}
                {/*    <img src={videoLink ? `https://image.tmdb.org/t/p/w500${videoLink}` : ``} alt="Movie Poster"*/}
                {/*         loading="lazy"/>*/}
                {/*</a>*/}
                {/*<p className="img_txt">이미지를 클릭하여 원본 ({videoSize.width}X{videoSize.height})을 확인 해보세요!</p>*/}
                {/*<button type="button" className="modal_close" onClick={imgModalClose}>*/}
                {/*    <span className="blind">닫기</span>*/}
                {/*</button>*/}
            </div>
        </div>
    );
}
