import { FC } from 'react';
import { useGetAssetsQuery } from '../../../../services/coincap';

const Header: FC = () => {
  const { data: assets, isLoading } = useGetAssetsQuery({ limit: 3 });
  console.log('data', assets ? assets.data : []);
  console.log('timestamp', assets ? assets.timestamp : 0);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading &&
        assets &&
        assets.data.map(({ id, name, symbol, priceUsd }) => {
          return (
            <div key={id}>
              <div>{`Name: ${name}`}</div>
              <div>{`Price: ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
              }).format(+priceUsd)}`}</div>
              <img
                src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
                alt={symbol}
              />
            </div>
          );
        })}
    </>
  );
};

export { Header };
