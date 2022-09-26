import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useGetAssetsQuery } from '../../../../services/coincap';
import { convertToThousands } from '../../../../utils';
import { PATHS } from '../../../../shared/paths';
import { ModalPortfolio, Portfolio } from '../../../../components';
import logo from '../../../../assets/images/logo.svg';
import './Header.scss';

const Header: FC = () => {
  const { main } = PATHS;
  const { data: assets, isLoading } = useGetAssetsQuery({ limit: 3 });

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
                  <div>{convertToThousands(priceUsd)}</div>
                </div>
              );
            })}
        </div>
        <Link to={main} className="logo-wrapper">
          <img src={logo} alt="logo" className="logo" />
        </Link>
        <Portfolio />
      </header>
      <ModalPortfolio />
    </>
  );
};

export { Header };
