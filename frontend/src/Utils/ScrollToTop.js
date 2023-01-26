import { faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScrollButton = () => {
    setIsVisible(
      (prev) =>
        document.body.scrollTop > 50 || document.documentElement.scrollTop > 50
    );
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setIsVisible((prev) => false);
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScrollButton);

    return () => {
      document.removeEventListener('scroll', handleScrollButton);
    };
  }, []);

  return (
    <FontAwesomeIcon
      icon={faArrowAltCircleUp}
      className={`fixed bottom-8  right-8 z-10 h-10 w-10 cursor-pointer text-white hover:opacity-80 md:text-orange-200 ${
        isVisible ? 'block' : 'hidden'
      }`}
      onClick={scrollToTop}
    />
  );
};

export default ScrollToTop;
