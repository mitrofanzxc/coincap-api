import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAssetQuery, useGetAssetHistoryQuery } from '../../services/coincap';
import { Chart } from '../../components';
import './Currency.scss';

const Currency: FC = () => {
  const { currencyId } = useParams();
  const { data: asset, isLoading } = useGetAssetQuery({ id: currencyId });
  const { data: assetHistory } = useGetAssetHistoryQuery({ id: currencyId });

  const labelsChart = assetHistory?.data.map(({ time }) =>
    new Date(time).toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    })
  );

  const dataChart = assetHistory?.data.map(({ priceUsd }) => Number(priceUsd).toFixed(2));

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && asset && (
        <>
          <div className="currency-wrapper">
            <h2>{`${asset.data.rank} Rank`}</h2>
            <h2>{`${asset.data.name} (${asset.data.symbol})`}</h2>
            <h2>{`${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
            }).format(+asset.data.priceUsd)}`}</h2>
            <h2>{`${Number(asset.data.changePercent24Hr).toFixed(2)}%`}</h2>
            <h2>{`Market Cap ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              notation: 'compact',
              compactDisplay: 'short',
              maximumFractionDigits: 2,
            }).format(+asset.data.marketCapUsd)}`}</h2>
            <h2>{`Supply ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              notation: 'compact',
              compactDisplay: 'short',
              maximumFractionDigits: 2,
            }).format(+asset.data.supply)} ${asset.data.symbol}`}</h2>
            <h2>{`Volume (24Hr) ${new Intl.NumberFormat('en-US', {
              style: 'currency',
              currency: 'USD',
              notation: 'compact',
              compactDisplay: 'short',
              maximumFractionDigits: 2,
            }).format(+asset.data.volumeUsd24Hr)}`}</h2>
          </div>
          <Chart labelsChart={labelsChart} dataChart={dataChart} name={asset.data.name} />
        </>
      )}
    </>
  );
};

export { Currency };
