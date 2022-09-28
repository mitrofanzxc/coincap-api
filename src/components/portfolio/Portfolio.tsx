import { FC, useEffect } from 'react';
import { useGetAssetsQuery } from '../../services/coincap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { open } from '../../features/modalPortfolioToggleSlice';
import { handleTotalPortfolio, updatePortfolio } from '../../features/portfolioSlice';
import { convertToThousands } from '../../utils';
import portfolio from '../../assets/images/portfolio.svg';

const Portfolio: FC = () => {
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(open());
  };

  const currentPortfolioList = useAppSelector(({ portfolio }) => portfolio.portfolioList);
  const currentPortfolioTotal = useAppSelector(({ portfolio }) => portfolio.total);

  const ids = currentPortfolioList.map(({ id }) => id).join(',');
  const { data: assets } = useGetAssetsQuery({ ids });

  useEffect(() => {
    if (assets?.data) {
      dispatch(updatePortfolio(assets?.data));
    }
  }, [assets?.data]);

  useEffect(() => {
    localStorage.setItem('currentPortfolioList', JSON.stringify(currentPortfolioList));

    const totalSum =
      currentPortfolioList.reduce((prev, next) => prev + +next.priceUsd * next.amount, 0) || 0;
    dispatch(handleTotalPortfolio(totalSum));
  }, [currentPortfolioList]);

  useEffect(() => {
    localStorage.setItem('currentPortfolioTotal', JSON.stringify(currentPortfolioTotal));
  }, [currentPortfolioTotal]);

  return (
    <div className="portfolio-wrapper" onClick={openModal}>
      <div>{`Total: ${convertToThousands(currentPortfolioTotal.toString())}`}</div>
      <img src={portfolio} alt="portfolio" className="logo" />
    </div>
  );
};

export { Portfolio };
