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
      { title: 'Staking', path: '/staking', icon: <Iconify icon="ri:safe-2-line"/> },
      { title: 'Transaction', path: '/transaction', icon: <Iconify icon="icon-park-outline:transaction-order"/> },
      { title: 'Withdraw', path: '/withdraw', icon: <Iconify icon="bx:money-withdraw"/> },
      { title: 'Teller', path: '/teller', icon: <Iconify icon="fluent:person-money-24-filled"/> },
      { title: 'Chat', path: '/chat', icon: <Iconify icon="akar-icons:chat-dots"/> },
    ],
  },

  
];

export default sidebarConfig;
