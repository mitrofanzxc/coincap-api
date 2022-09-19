import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { useGetAssetQuery, useGetAssetHistoryQuery } from '../../services/coincap';
import { Chart } from '../../components';

const Currency: FC = () => {
  const { currencyId } = useParams();
  console.log('currencyId', currencyId);

  const { data: asset, isLoading } = useGetAssetQuery({ id: currencyId });
  console.log('asset', asset);

  const { data: assetHistory } = useGetAssetHistoryQuery({ id: currencyId });
  console.log('assetHistory', assetHistory);

  return (
    <>
      {isLoading && <div>Loading...</div>}
      {!isLoading && (
        <div>
          <div>Currency</div>
          <div>
            <Chart />
          </div>
        </div>
      )}
    </>
  );
};

export { Currency };
