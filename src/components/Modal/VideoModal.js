import './../../App.scss';
export default function VideoModal({item, onClose}) {
    return (
        <div className="video_modal">
            <div className="inner">
                <iframe src={`https://www.youtube.com/embed/${item.key}`} allowFullScreen></iframe>
                <button type="button" className="modal_close" onClick={() => onClose()}>
                    <span className="blind">닫기</span>
                </button>
            </div>
        </div>
    );
}
