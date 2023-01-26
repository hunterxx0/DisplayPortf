import React, { useCallback, useEffect, useRef } from 'react';

const ModalOverlay = ({ children, IsOpen = true, setIsOpen = () => {} }) => {
  const elContainer = useRef();
  const closeModal = (e) => {
    if (e.target === elContainer.current) setIsOpen(false);
  };

  const pressEscape = useCallback(
    (e) => {
      if (e.key === 'Escape' && IsOpen) {
        setIsOpen(false);
      }
    },
    [setIsOpen, IsOpen]
  );

  useEffect(() => {
    // probably not the best way to do this
    window.document.documentElement.style.overflowY = 'hidden';

    document.addEventListener('keydown', pressEscape);
    return () => {
      document.removeEventListener('keydown', pressEscape);
      window.document.documentElement.style.overflowY = 'visible';
    };
  }, [pressEscape]);

  return (
    <div
      className={`fixed top-1/2 left-1/2 z-20 flex h-full max-h-screen min-h-screen w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden bg-transparent backdrop-blur-lg`}
      ref={elContainer}
      onClick={closeModal}
    >
      {children}
    </div>
  );
};

export default ModalOverlay;
