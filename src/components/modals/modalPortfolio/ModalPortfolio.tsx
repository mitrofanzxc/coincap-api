import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ButtonSecondary } from '../../buttons';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { close } from '../../../features/modalPortfolioToggleSlice';
import { removeCurrencyInfoFromPortfolio } from '../../../features/portfolioSlice';
import { convertToThousands } from '../../../utils';
import './ModalPortfolio.scss';

const ModalPortfolio: FC = () => {
  const isModalPortfolioOpen = useAppSelector(
    ({ modalPortfolioToggle }) => modalPortfolioToggle.value
  );
  const currentPortfolioList = useAppSelector(({ portfolio }) => portfolio.portfolioList);
  const currentPortfolioTotal = useAppSelector(({ portfolio }) => portfolio.total);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(close());
  };

  const deleteCurrency = (value: string) => {
    dispatch(removeCurrencyInfoFromPortfolio(value));
  };

  return (
    <>
      <div className={`modal_add-wrapper ${!isModalPortfolioOpen ? 'display_none' : ''}`}>
        {!currentPortfolioList.length && <h2>Your portfolio is empty... Add more currency!</h2>}
        {currentPortfolioList &&
          currentPortfolioList.map(({ id, name, symbol, priceUsd, amount }) => {
            return (
              <div key={id} className="flex_space-between">
                <Link to={`/${id}`} className="header-currency__name-wrapper" onClick={closeModal}>
                  <img
                    src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
                    alt={symbol}
                    className="header-currency__icon"
                  />
                  <div className="header-currency__name">
                    <div>{`${name}`}</div>
                    <div>{`${symbol}`}</div>
                  </div>
                </Link>
                <div>{`Amount: ${amount}`}</div>
                <div>{`Price: ${convertToThousands((+priceUsd * amount).toString())}`}</div>
                <button className="button-delete" onClick={() => deleteCurrency(id)}>
                  Delete
                </button>
              </div>
            );
          })}
        <h2>{`Total: ${convertToThousands(currentPortfolioTotal.toString())}`}</h2>
        <ButtonSecondary description="x" onClick={closeModal} />
      </div>
      <div
        className={`shadow ${!isModalPortfolioOpen ? 'display_none' : ''}`}
        onClick={closeModal}
      />
    </>
  );
};

export { ModalPortfolio };
