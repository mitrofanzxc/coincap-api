import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useBodyOverflow } from './hooks/useBodyOverflow';
import { Layout, Main, Currency } from './pages';
import { PATHS } from './shared/paths';

const App: FC = () => {
  const { main, currency, any } = PATHS;

  useBodyOverflow();

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
