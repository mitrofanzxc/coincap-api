import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ButtonSecondary } from '../../buttons';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { close } from '../../../features/modalPortfolioToggleSlice';
import './ModalPortfolio.scss';

const ModalPortfolio: FC = () => {
  const isModalPortfolioOpen = useAppSelector(
    ({ modalPortfolioToggle }) => modalPortfolioToggle.value
  );
  const modalPortfolioInfo = useAppSelector(({ portfolio }) => portfolio);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(close());
  };

  return (
    <>
      <div className={`modal_add-wrapper ${!isModalPortfolioOpen ? 'display_none' : ''}`}>
        {!modalPortfolioInfo.length && <h2>Your portfolio is empty... Add more currency!</h2>}
        {modalPortfolioInfo &&
          modalPortfolioInfo.map(({ id, name, symbol, priceUsd, amount }) => {
            console.log('id', id);
            console.log('priceUsd', priceUsd);
            return (
              <div key={id} className="flex_space-between">
                <Link to={`/${id}`} className="header-currency__name-wrapper" onClick={closeModal}>
                  <img
                    src={`https://assets.coincap.io/assets/icons/${symbol!.toLowerCase()}@2x.png`}
                    alt={symbol}
                    className="header-currency__icon"
                  />
                  <div className="header-currency__name">
                    <div>{`${name}`}</div>
                    <div>{`${symbol}`}</div>
                  </div>
                </Link>
                <div>{`Amount: ${amount}`}</div>
                <div>{`Price: ${Math.floor(+priceUsd!) * amount!}`}</div>
              </div>
            );
          })}
        <h2>Total: </h2>
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
