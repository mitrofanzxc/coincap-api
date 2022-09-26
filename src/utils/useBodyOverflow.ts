import { useEffect } from 'react';
import { useAppSelector } from '../app/hooks';

const useBodyOverflow = () => {
  const isModalAddOpen = useAppSelector(({ modalAddToggle }) => modalAddToggle.value);
  const isModalPortfolioOpen = useAppSelector(
    ({ modalPortfolioToggle }) => modalPortfolioToggle.value
  );

  useEffect(() => {
    const BODY = document.querySelector('body') as HTMLBodyElement;

    if (isModalAddOpen || isModalPortfolioOpen) {
      BODY.classList.add('body_overflow');
    } else {
      BODY.classList.remove('body_overflow');
    }
  }, [isModalAddOpen, isModalPortfolioOpen]);
};

export { useBodyOverflow };
