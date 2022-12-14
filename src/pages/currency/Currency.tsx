import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { useGetAssetQuery, useGetAssetHistoryQuery } from '../../services/coincap';
import { open } from '../../features/modalAddToggleSlice';
import {
  addCurrencyId,
  addCurrencyName,
  addCurrencySymbol,
  addCurrencyPriceUsd,
} from '../../features/currencyInfoSlice';
import {
  convertToMillions,
  convertToThousands,
  convertToPercentage,
  convertToDate,
} from '../../utils';
import { Chart, ButtonSecondary, ModalAdd } from '../../components';
import './Currency.scss';

const Currency: FC = () => {
  const dispatch = useAppDispatch();
  const { currencyId } = useParams();
  const { data: asset, isLoading } = useGetAssetQuery({ id: currencyId });
  const { data: assetHistory } = useGetAssetHistoryQuery({ id: currencyId });

  const labelsChart = assetHistory?.data.map(({ time }) => convertToDate(time));
  const dataChart = assetHistory?.data.map(({ priceUsd }) => convertToPercentage(priceUsd));

  const handleCurrency = () => {
    dispatch(addCurrencyId(asset ? asset.data.id! : ''));
    dispatch(addCurrencyName(asset ? asset.data.name : ''));
    dispatch(addCurrencySymbol(asset ? asset.data.symbol : ''));
    dispatch(addCurrencyPriceUsd(asset ? asset.data.priceUsd : ''));
    dispatch(open());
  };

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && asset && (
        <>
          <div className="currency-wrapper">
            <div className="circle">
              <h3>Rank</h3>
              <h3>{asset.data.rank}</h3>
            </div>
            <div className="circle">
              <h3>{`${asset.data.name} (${asset.data.symbol})`}</h3>
              <h3>{convertToThousands(asset.data.priceUsd)}</h3>
              <h3>{`${convertToPercentage(asset.data.changePercent24Hr)}%`}</h3>
            </div>
            <div className="circle">
              <h3>Market Cap</h3>
              <h3>{convertToMillions(asset.data.marketCapUsd)}</h3>
            </div>
            <div className="circle">
              <h3>Supply</h3>
              <h3>{`${convertToMillions(asset.data.supply)} ${asset.data.symbol}`}</h3>
            </div>
            <div className="circle">
              <h3>Volume (24Hr)</h3>
              <h3>{convertToMillions(asset.data.volumeUsd24Hr)}</h3>
            </div>
            <ButtonSecondary description="+" onClick={handleCurrency} />
            <ModalAdd />
          </div>
          <Chart labelsChart={labelsChart} dataChart={dataChart} name={asset.data.name} />
        </>
      )}
    </>
  );
};

export { Currency };
