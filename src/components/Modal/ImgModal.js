import './../../App.scss';
export default function ImgModal({item, onClose}) {

    return (
        <div className="img_modal">
            <div className="inner">
                <a href={`https://www.themoviedb.org/t/p/original${item.file_path}`}
                   className={`img_link ${item.width > item.height ? 'img_width' : 'img_height'}`}
                   target="_blank">
                    <img src={`https://image.tmdb.org/t/p/w500${item.file_path}`} alt="Movie Poster"
                         loading="lazy"/>
                </a>
                <p className="img_txt">이미지를 클릭하여 원본 ({item.width}X{item.height})을 확인 해보세요!</p>
                <button type="button" className="modal_close" onClick={() => onClose()}>
                    <span className="blind">닫기</span>
                </button>
            </div>
        </div>
    );
}
