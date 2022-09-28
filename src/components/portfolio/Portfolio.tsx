import { FC, useEffect, useState } from 'react';
import { useGetAssetsQuery } from '../../services/coincap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { open } from '../../features/modalPortfolioToggleSlice';
import { handleTotalPortfolio, updatePortfolio } from '../../features/portfolioSlice';
import { convertToThousands, getLocalStorage } from '../../utils';
import portfolio from '../../assets/images/portfolio.svg';
import comparisonLogo from '../../assets/images/comparison.svg';
import percentageLogo from '../../assets/images/percentage.svg';
import totalLogo from '../../assets/images/total.svg';
import './Portfolio.scss';

const Portfolio: FC = () => {
  const dispatch = useAppDispatch();

  const openModal = () => {
    dispatch(open());
  };

  const currentPortfolioList = useAppSelector(({ portfolio }) => portfolio.portfolioList);
  const currentPortfolioTotal = useAppSelector(({ portfolio }) => portfolio.total);

  const [previousTotal, setPreviousTotal] = useState<number>(
    getLocalStorage('currentPortfolioTotal')
  );
  const [difference, setDifference] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);

  const ids = currentPortfolioList.map(({ id }) => id).join(',');
  const { data: assets } = useGetAssetsQuery({ ids });

  const calculatePercentage = (prev: number, next: number) => {
    if (!prev && !next) {
      setPercentage(0);
    } else if (prev && !next) {
      setPercentage(100);
    } else if (!next) {
      setPercentage(0);
    } else {
      setPercentage((prev / next - 1) * 100);
    }
  };

  useEffect(() => {
    if (assets?.data) {
      dispatch(updatePortfolio(assets?.data));
    }
  }, [assets?.data]);

  useEffect(() => {
    localStorage.setItem('currentPortfolioList', JSON.stringify(currentPortfolioList));

    const totalSum =
      currentPortfolioList.reduce((prev, next) => prev + +next.priceUsd * next.amount, 0) || 0;

    setDifference(totalSum - previousTotal);
    calculatePercentage(totalSum, previousTotal);

    dispatch(handleTotalPortfolio(totalSum));
  }, [currentPortfolioList]);

  useEffect(() => {
    localStorage.setItem('currentPortfolioTotal', JSON.stringify(currentPortfolioTotal));
  }, [currentPortfolioTotal]);

  return (
    <div className="portfolio-wrapper" onClick={openModal}>
      <div className="portfolio-wrapper__info">
        <div className="portfolio-wrapper__logo">
          <img src={totalLogo} alt="total-logo" />
          <span>{convertToThousands(currentPortfolioTotal.toString())}</span>
        </div>
        <div className="portfolio-wrapper__logo">
          <img src={comparisonLogo} alt="comparison-logo" />
          <span>{convertToThousands(difference.toString())}</span>
        </div>
        <div className="portfolio-wrapper__logo">
          <img src={percentageLogo} alt="percentage-logo" />
          <span>{`${percentage.toFixed(2)}%`}</span>
        </div>
      </div>
      <img src={portfolio} alt="portfolio" className="logo" />
    </div>
  );
};

export { Portfolio };
