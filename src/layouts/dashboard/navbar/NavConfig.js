// components
import SvgIconStyle from '../../../components/SvgIconStyle';
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  dashboard: getIcon('ic_dashboard'),
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      { title: 'Dashboard', path: '/dashboard', icon: ICONS.dashboard },
      { title: 'Wallet', path: '/wallet', icon: ICONS.dashboard },
      { title: 'Transaction', path: '/transaction', icon: <Iconify icon="icon-park-outline:transaction-order"/> },
      { title: 'Withdraw', path: '/withdraw', icon: <Iconify icon="bx:money-withdraw"/> },
      { title: 'Teller', path: '/teller', icon: <Iconify icon="fluent:person-money-24-filled"/> },
    ],
  },

  
];

export default sidebarConfig;
