import { ReactComponent as LogoImg } from 'assets/dna_small.svg';
import { useHistory } from 'react-router-dom';

import { useStyles } from './styles/header';

const Header = () => {
  const classes = useStyles();

  const history = useHistory();

  const checkIfCurrentRoute = (route: string) => !!(history.location.pathname === route);

  const navigate = (route: string) => {
    if (history.location.pathname !== route) history.push(route);
  };

  const navItems = [
    {
      name: 'Browse',
      navTo: '/browse',
    },
    {
      name: 'Search',
      navTo: '/search',
    },
    {
      name: 'API',
      navTo: '/api',
    },
    {
      name: 'About',
      navTo: '/about',
    },
    {
      name: 'Help',
      navTo: '/help',
    },
  ];

  return (
    <header className={classes.headerContainer}>
      <div className={classes.logoContainer} onClick={() => navigate('/')}>
        <LogoImg className={classes.logoImg} />
        <div className={classes.logoText}>PITDB</div>
      </div>
      <nav className={classes.navContainer}>
        <ul className={classes.nav}>
          {navItems.map(({ name, navTo }) => (
            <li
              key={name}
              className={classes.navItem}
              onClick={() => navigate(navTo)}
              style={{ borderBottom: checkIfCurrentRoute(navTo) ? '1px solid white' : '1px solid transparent' }}
            >
              {name}
            </li>
          ))}
          <li>
            <div className={classes.getPitButton}>Get PITGUI</div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
