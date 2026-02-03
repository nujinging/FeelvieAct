import '../../scss/modal/modal.scss';
import { useState } from 'react';
import mainEvent from '../../images/img_main_event.png';
import Cookies from 'js-cookie';

const EventModal: React.FC = () => {
    const [modalOpen, setModalOpen] = useState<boolean>(() => {
        const v = Cookies.get('modalOpen');
        return v !== 'false';
    });

    const openModal = (): void => {
        setModalOpen(false);
    };

    const onedayShow = (): void => {
        Cookies.set('modalOpen', 'false', { expires: 1 });
        setModalOpen(false);
    };

    const doNotShow = (): void => {
        Cookies.set('modalOpen', 'false', { expires: 3650 });
        setModalOpen(false);
    };

    return (
        modalOpen && (
            <div className="modalBox">
                <div className="inner">
                    <div className="con">
                        <img src={mainEvent} alt="mainImage" loading="lazy" />
                        <button type="button" className="btn_close" onClick={openModal}>
                            <span className="blind">닫기</span>
                        </button>
                    </div>

                    <div className="btn_box">
                        <button type="button" onClick={onedayShow}>
                            하루동안 보지 않기
                        </button>
                        <button type="button" onClick={doNotShow}>
                            다시는 보지 않기
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default EventModal;
