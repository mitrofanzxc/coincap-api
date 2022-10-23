import { FC } from 'react';
import { IButtonSecondary } from './ButtonSecondary.interface';
import './ButtonSecondary.scss';

const ButtonSecondary: FC<IButtonSecondary> = ({ description, onClick }) => {
  return (
    <button className="button-secondary" onClick={onClick}>
      {description}
    </button>
  );
};

export { ButtonSecondary };
