import { FC } from 'react';

const TableHead: FC = () => {
  return (
    <thead>
      <tr>
        <th colSpan={1}>Rank</th>
        <th colSpan={1}>Name</th>
        <th colSpan={1}>Price</th>
        <th colSpan={1}>Market Cap</th>
        <th colSpan={1}>VWAP (24Hr)</th>
        <th colSpan={1}>Supply</th>
        <th colSpan={1}>Volume (24Hr)</th>
        <th colSpan={1}>Change (24Hr)</th>
      </tr>
    </thead>
  );
};

export { TableHead };
