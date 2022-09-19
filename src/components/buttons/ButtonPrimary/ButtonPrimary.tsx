import { FC } from 'react';
import { IButtonPrimary } from './ButtonPrimary.interface';
import './ButtonPrimary.scss';

const ButtonPrimary: FC<IButtonPrimary> = ({ description, onClick }) => {
  return (
    <button className="button-primary" onClick={onClick}>
      {description}
    </button>
  );
};

export { ButtonPrimary };
