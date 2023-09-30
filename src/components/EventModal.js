import './../App.scss';
import mainEvent from './../images/img_main_event.png'


export default function EventModal() {
    return (
        <div className="modalBox">
            <div className="inner">
                <div className="con">
                    <img src={mainEvent} alt="mainImage"/>
                    <button type="button" className="btn_close">
                        <span className="blind">닫기</span>
                    </button>
                </div>

                <div className="btn_box">
                    <button type="button" className="">다시는 보지 않기</button>
                    <button type="button">하루동안 보지 않기</button>
                </div>
            </div>

        </div>
    )
}