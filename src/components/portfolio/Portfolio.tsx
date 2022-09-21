import { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { parseCurrencyInfoToPortfolio } from '../../features/portfolioSlice';
import { open } from '../../features/modalPortfolioToggleSlice';
import portfolio from '../../assets/images/portfolio.svg';

const Portfolio: FC = () => {
  const dispatch = useAppDispatch();
  const modalPortfolioInfo = useAppSelector(({ portfolio }) => portfolio);

  const openModal = () => {
    dispatch(open());
  };

  useEffect(() => {
    const localStorageInfo = localStorage.getItem('modalPortfolioInfo') || null;

    if (localStorageInfo) {
      dispatch(parseCurrencyInfoToPortfolio(JSON.parse(localStorageInfo)));
    }
  }, []);

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
