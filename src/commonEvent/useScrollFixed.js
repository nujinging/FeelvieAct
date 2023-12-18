import {useEffect, useState} from 'react';

const useScrollFixed = () => {
  const [scrollFixed, setScrollFixed] = useState(false);

  // 스크롤 감지
  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (scrollY > 100) {
      setScrollFixed(true);
    } else {
      setScrollFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return scrollFixed;
};

export default useScrollFixed;
