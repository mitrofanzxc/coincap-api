import { FC, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppSelector } from './app/hooks';
import { Layout, Main, Currency } from './pages';
import { PATHS } from './shared/paths';

const App: FC = () => {
  const { main, currency, any } = PATHS;
  const isModalAddOpen = useAppSelector(({ modalAddToggle }) => modalAddToggle.value);
  const isModalPortfolioOpen = useAppSelector(
    ({ modalPortfolioToggle }) => modalPortfolioToggle.value
  );

  useEffect(() => {
    const BODY = document.querySelector('body') as HTMLBodyElement;

    if (isModalAddOpen || isModalPortfolioOpen) {
      BODY.classList.add('body_overflow');
    } else {
      BODY.classList.remove('body_overflow');
    }
  }, [isModalAddOpen, isModalPortfolioOpen]);

  return (
    <Routes>
      <Route path={main} element={<Layout />}>
        <Route index element={<Main />} />
        <Route path={currency} element={<Currency />} />
        <Route path={any} element={<Main />} />
      </Route>
    </Routes>
  );
};

export { App };
