import { FC } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { open } from '../../features/modalAddToggleSlice';
import {
  addCurrencyId,
  addCurrencyName,
  addCurrencySymbol,
  addCurrencyPriceUsd,
} from '../../features/currencyInfoSlice';
import { convertToMillions, convertToThousands, convertToPercentage } from '../../utils';
import { ButtonSecondary } from '../buttons';
import { IAssets } from '../../services/coincap.interface';

const TableRow: FC<IAssets> = ({
  id,
  rank,
  name,
  symbol,
  priceUsd,
  marketCapUsd,
  vwap24Hr,
  supply,
  volumeUsd24Hr,
  changePercent24Hr,
}) => {
  const dispatch = useAppDispatch();

  const handleCurrency = () => {
    dispatch(addCurrencyId(id ? id : ''));
    dispatch(addCurrencyName(name));
    dispatch(addCurrencySymbol(symbol));
    dispatch(addCurrencyPriceUsd(priceUsd));
    dispatch(open());
  };

  return (
    <tr>
      <td colSpan={1}>{rank}</td>
      <td colSpan={2} className="header-currency__wrapper">
        <Link to={`/${id}`} className="header-currency__name-wrapper">
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
        <ButtonSecondary description="+" onClick={handleCurrency} />
      </td>
      <td colSpan={1}>{convertToThousands(priceUsd)}</td>
      <td colSpan={1}>{convertToMillions(marketCapUsd)}</td>
      <td colSpan={1}>{convertToThousands(vwap24Hr)}</td>
      <td colSpan={1}>{convertToMillions(supply)}</td>
      <td colSpan={1}>{convertToMillions(volumeUsd24Hr)}</td>
      <td colSpan={1}>{`${convertToPercentage(changePercent24Hr)}%`}</td>
    </tr>
  );
};

export { TableRow };
