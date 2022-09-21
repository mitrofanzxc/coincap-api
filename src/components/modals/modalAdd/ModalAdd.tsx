import { ChangeEvent, FC, useState } from 'react';
import { ButtonSecondary, ButtonPrimary } from '../../buttons';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { close } from '../../../features/modalAddToggleSlice';
import { addCurrencyAmount } from '../../../features/currencyInfoSlice';
import { addCurrencyInfoToPortfolio } from '../../../features/portfolioSlice';
import './ModalAdd.scss';

const ModalAdd: FC = () => {
  const isModalAddOpen = useAppSelector(({ modalAddToggle }) => modalAddToggle.value);
  const { id, name, symbol, priceUsd } = useAppSelector(({ currencyInfo }) => currencyInfo);
  const dispatch = useAppDispatch();

  const [amount, setAmount] = useState<number>(100);

  const closeModal = () => {
    dispatch(close());
  };

  const handleInputNumber = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    const value = +target.value as number;
    setAmount(value);
    dispatch(addCurrencyAmount(amount));
  };

  const handleSubmit = () => {
    dispatch(addCurrencyInfoToPortfolio({ id, name, symbol, priceUsd, amount }));
    closeModal();
  };

  return (
    <>
      <div className={`modal_add-wrapper ${!isModalAddOpen ? 'display_none' : ''}`}>
        <h2>{`${name} (${symbol})`}</h2>
        <input
          type="number"
          name=""
          id=""
          placeholder="add amount of currency..."
          className="input-number"
          value={amount}
          onChange={handleInputNumber}
        />
        <ButtonPrimary description="Submit" onClick={handleSubmit} />
        <ButtonSecondary description="x" onClick={closeModal} />
      </div>
      <div className={`shadow ${!isModalAddOpen ? 'display_none' : ''}`} onClick={closeModal} />
    </>
  );
};

export { ModalAdd };
