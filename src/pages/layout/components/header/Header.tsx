import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../../../app/hooks';
import { open } from '../../../../features/modalPortfolioToggleSlice';
import { useGetAssetsQuery } from '../../../../services/coincap';
import { PATHS } from '../../../../shared/paths';
import { ModalPortfolio } from '../../../../components';
import logo from '../../../../assets/images/logo.svg';
import portfolio from '../../../../assets/images/portfolio.svg';
import './Header.scss';

const Header: FC = () => {
  const { main } = PATHS;
  const dispatch = useAppDispatch();
  const { data: assets, isLoading } = useGetAssetsQuery({ limit: 3 });

  const openModal = () => {
    dispatch(open());
  };

  return (
    <>
      <header className="header wrapper">
        <div className="header-currencies">
          {isLoading && <div>Loading...</div>}
          {!isLoading &&
            assets &&
            assets.data.map(({ id, name, symbol, priceUsd }) => {
              return (
                <div key={id} className="header-currency__wrapper">
                  <img
                    src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
                    alt={symbol}
                    className="header-currency__icon"
                  />
                  <Link to={`/${id}`} className="header-currency__name">
                    <div>{`${name}`}</div>
                    <div>{`${symbol}`}</div>
                  </Link>
                  <div>{`${new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(+priceUsd)}`}</div>
                </div>
              );
            })}
        </div>
        <Link to={main} className="logo-wrapper">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <div className="portfolio-wrapper" onClick={openModal}>
          <img src={portfolio} alt="portfolio" className="logo" />
        </div>
      </header>
      <ModalPortfolio />
    </>
  );
};

export { Header };
