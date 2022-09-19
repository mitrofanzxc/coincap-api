import { FC } from 'react';
import { IButtonSecondary } from './ButtonSecondary.interface';
import './ButtonSecondary.scss';

const ButtonSecondary: FC<IButtonSecondary> = ({ description }) => {
  return <button className="button-secondary">{description}</button>;
};

export { ButtonSecondary };
