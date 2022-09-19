import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';


// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
  
    { path: '/', element: <Home /> },

    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'transaction', element: <Transaction /> },
        { path: 'withdraw', element: <Withdraw/>},
        { path: 'teller', element: <Teller/>},
      ],
    },
    
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'connect', element: <Connect/> }, 
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}


// Dashboard
const Dashboard = Loadable(lazy(() => import('../pages/Dashboard')));
const Home = Loadable(lazy(() => import('../pages/Home')));
const Transaction = Loadable(lazy(() => import('../pages/Transaction')));
const Withdraw = Loadable(lazy(() => import('../pages/Withdraw')));
const Teller = Loadable(lazy(() => import('../pages/Teller')));
const Connect = Loadable(lazy(() => import('../pages/Connect')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
