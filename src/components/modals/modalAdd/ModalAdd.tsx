import { FC } from 'react';
import { ButtonSecondary, ButtonPrimary } from '../../buttons';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { close } from '../../../features/modalAddToggleSlice';
import './ModalAdd.scss';

const ModalAdd: FC = () => {
  const isModalAddOpen = useAppSelector(({ modalAddToggle }) => modalAddToggle.value);
  const dispatch = useAppDispatch();

  const closeModal = () => {
    dispatch(close());
  };

  return (
    <>
      <div className={`modal_add-wrapper ${!isModalAddOpen ? 'display_none' : ''}`}>
        <input
          type="number"
          name=""
          id=""
          placeholder="add amount of currency..."
          className="input-number"
        />
        <ButtonPrimary description="Submit" />
        <ButtonSecondary description="x" onClick={closeModal} />
      </div>
      <div className={`shadow ${!isModalAddOpen ? 'display_none' : ''}`} onClick={closeModal} />
    </>
  );
};

export { ModalAdd };
