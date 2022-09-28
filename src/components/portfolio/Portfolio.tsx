import { FC, useEffect, useState } from 'react';
import { useGetAssetsQuery } from '../../services/coincap';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { open } from '../../features/modalPortfolioToggleSlice';
import { handleTotalPortfolio, updatePortfolio } from '../../features/portfolioSlice';
import { convertToThousands, convertToPercentage, getLocalStorage } from '../../utils';
import portfolio from '../../assets/images/portfolio.svg';

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
    console.log('prev', prev);
    console.log('next', next);

    if (!prev && !next) {
      setPercentage(0);
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
      {/* <div>{`Total: ${convertToThousands(
        currentPortfolioTotal.toString()
      )} ${previousTotal} (${persentage} %)`}</div> */}
      <div>{`Total: ${convertToThousands(currentPortfolioTotal.toString())}`}</div>
      <div>{`Difference: ${convertToThousands(difference.toString())}`}</div>
      <div>{`Percentage: ${percentage.toFixed(2)}%`}</div>
      <img src={portfolio} alt="portfolio" className="logo" />
    </div>
  );
};

export { Portfolio };
