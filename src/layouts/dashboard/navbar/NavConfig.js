// components
import Iconify from '../../../components/Iconify';

// ----------------------------------------------------------------------

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: '',
    items: [
      { title: 'Dashboard', path: '/dashboard', icon: <Iconify icon="ic:outline-dashboard"/> },
      { title: 'Staking', path: '/staking', icon: <Iconify icon="ri:safe-2-line"/> },
      { title: 'Transaction', path: '/transaction', icon: <Iconify icon="icon-park-outline:transaction-order"/> },
      { title: 'Withdraw', path: '/withdraw', icon: <Iconify icon="bx:money-withdraw"/> },
      { title: 'Teller', path: '/teller', icon: <Iconify icon="fluent:person-money-24-filled"/> },
      { title: 'Chat', path: '/chat', icon: <Iconify icon="akar-icons:chat-dots"/> },
    ],
  },

  
];

export default sidebarConfig;
