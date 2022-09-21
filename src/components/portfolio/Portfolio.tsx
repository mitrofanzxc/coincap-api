import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { open } from '../../features/modalPortfolioToggleSlice';
import portfolio from '../../assets/images/portfolio.svg';

const Portfolio: FC = () => {
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(open());
  };

  const modalPortfolioInfo = useAppSelector(({ portfolio }) => portfolio);

  useEffect(() => {
    localStorage.setItem('modalPortfolioInfo', JSON.stringify(modalPortfolioInfo));
  }, [modalPortfolioInfo]);

  return (
    <div className="portfolio-wrapper" onClick={openModal}>
      <img src={portfolio} alt="portfolio" className="logo" />
    </div>
  );
};

export { Portfolio };
