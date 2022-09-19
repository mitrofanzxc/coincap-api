import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ButtonSecondary } from '../buttons';
import { useAppDispatch } from '../../app/hooks';
import { open } from '../../features/modalAddToggleSlice';
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

  const openModal = () => {
    dispatch(open());
  };

  return (
    <tr>
      <td colSpan={1}>{rank}</td>
      <td colSpan={2} className="header-currency__wrapper">
        <div className="header-currency__name-wrapper">
          <img
            src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
            alt={symbol}
            className="header-currency__icon"
          />
          <Link to={`/${id}`} className="header-currency__name">
            <div>{`${name}`}</div>
            <div>{`${symbol}`}</div>
          </Link>
        </div>
        <ButtonSecondary description="+" onClick={openModal} />
      </td>
      <td colSpan={1}>{`${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(+priceUsd)}`}</td>
      <td colSpan={1}>{`${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 2,
      }).format(+marketCapUsd)}`}</td>
      <td colSpan={1}>{`${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(+vwap24Hr)}`}</td>
      <td colSpan={1}>{`${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 2,
      }).format(+supply)}`}</td>
      <td colSpan={1}>{`${new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 2,
      }).format(+volumeUsd24Hr)}`}</td>
      <td colSpan={1}>{`${Number(changePercent24Hr).toFixed(2)}%`}</td>
    </tr>
  );
};

export { TableRow };
