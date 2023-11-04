import './../../App.scss';
export default function VideoModal(props) {
    return (
        <div className="video_modal">
            <div className="inner">
                <iframe src={`https://www.youtube.com/embed/${props.item.key}`} allowFullScreen></iframe>
                <button type="button" className="modal_close">
                    <span className="blind">닫기</span>
                </button>
            </div>
        </div>
    );
}
