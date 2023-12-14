import '../../scss/modal/modal.scss';
import {useEffect, useState} from "react";
import mainEvent from '../../images/img_main_event.png'
import Cookies from 'js-cookie';

export default function EventModal() {
  const [modalOpen, setModalOpen] = useState(() => {
    const dontStorage = Cookies.get('modalOpen');
    return dontStorage !== 'false';
  });
  const openModal = () => {
    setModalOpen(false)
  }

  useEffect(() => {
    const dontStorage = Cookies.get('modalOpen');
    if (dontStorage === 'false') {
      setModalOpen(false);
    }
  }, [modalOpen]);

  // 하루동안 보지 않기
  const onedayShow = () => {
    Cookies.set('modalOpen', 'false');
    setModalOpen(false);
    setTimeout(() => {
      Cookies.set('modalOpen', 'true');
      setModalOpen(true);
    }, 24 * 60 * 60 * 1000);
  };

  // 다시는 보지 않기
  const doNotShow = () => {
    Cookies.set('modalOpen', 'false');
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