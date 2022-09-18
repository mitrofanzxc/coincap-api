import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout, Main } from './pages';
import { PATHS } from './shared/paths';

const App: FC = () => {
  const { main, any } = PATHS;
  return (
    <Routes>
      <Route path={main} element={<Layout />}>
        <Route index element={<Main />} />
        <Route path={any} element={<Main />} />
      </Route>
    </Routes>
  );
};

export { App };
