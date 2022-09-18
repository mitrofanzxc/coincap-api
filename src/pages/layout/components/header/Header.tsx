import { FC } from 'react';
import { useGetAssetsQuery } from '../../../../services/coincap';
import './Header.scss';

const Header: FC = () => {
  const { data: assets, isLoading } = useGetAssetsQuery({ limit: 3 });

  return (
    <header>
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
    </header>
  );
};

export { Header };
