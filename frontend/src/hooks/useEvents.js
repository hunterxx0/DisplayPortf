import { useCallback, useEffect, useState } from 'react';

export function useEvents() {
  const [openMenu, setOpenMenu] = useState(null);

  const handleClickEvt = useCallback((e) => {
    if (!e.target.closest('.btn__menu')) setOpenMenu(null);
  }, []);

  const handleKeyDownEvt = useCallback(
    (e) => {
      if (e.key === 'Escape' && openMenu !== null) setOpenMenu(null);
    },
    [openMenu]
  );

  useEffect(() => {
    document.addEventListener('click', handleClickEvt);
    document.addEventListener('keydown', handleKeyDownEvt);

    return () => {
      document.removeEventListener('click', handleClickEvt);
      document.removeEventListener('keydown', handleKeyDownEvt);
    };
  }, [handleClickEvt, handleKeyDownEvt]);

  return { setOpenMenu, openMenu };
}
