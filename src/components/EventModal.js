import './../App.scss';
import mainEvent from './../images/img_main_event.png'
import {useEffect, useState} from "react";


export default function EventModal() {
    const [modalOpen, setModalOpen] = useState(true);
    const openModal = () => {
        setModalOpen(false)
    }
    useEffect(() => {
        const dontStorage = localStorage.getItem('modalOpen');
        if (dontStorage === 'false') {
            setModalOpen(false);
        }
    }, []);

    // 하루동안 보지 않기
    const onedayShow = () => {
        localStorage.setItem('modalOpen', 'false');
        setModalOpen(false);
        setTimeout(() => {
            localStorage.setItem('modalOpen', 'true');
            setModalOpen(true);
        }, 24 * 60 * 60 * 1000);
    };

    // 다시는 보지 않기
    const doNotShow = () => {
        localStorage.setItem('modalOpen', 'false');
        setModalOpen(false);
    }

    return (
        modalOpen && (
            <div className="modalBox">
                <div className="inner">
                    <div className="con">
                        <img src={mainEvent} alt="mainImage" loading="lazy"/>
                        <button type="button" className="btn_close" onClick={openModal}>
                            <span className="blind">닫기</span>
                        </button>
                    </div>

                    <div className="btn_box">
                        <button type="button" onClick={onedayShow}>하루동안 보지 않기</button>
                        <button type="button" onClick={doNotShow}>다시는 보지 않기</button>
                    </div>
                </div>

            </div>
        )
    )
}