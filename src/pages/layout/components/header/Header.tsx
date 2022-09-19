import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useGetAssetsQuery } from '../../../../services/coincap';
import { PATHS } from '../../../../shared/paths';
import logo from '../../../../assets/images/logo.svg';
import './Header.scss';

const Header: FC = () => {
  const { main } = PATHS;
  const { data: assets, isLoading } = useGetAssetsQuery({ limit: 3 });

  return (
    <header className="header">
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
                <div className="header-currency__name">
                  <div>{`${name}`}</div>
                  <div>{`${symbol}`}</div>
                </div>
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
    </header>
  );
};

export { Header };
