import { useHistory } from 'react-router-dom';

import { navItems } from 'variables/headerNavItems';
import { ReactComponent as LogoImg } from 'assets/dna_small.svg';
import { useStyles } from './styles/header';

const Header = ({ ...props }) => {
  const classes = useStyles();

  const history = useHistory();

  const checkIfCurrentRoute = (route: string) => !!(history.location.pathname === route);

  const navigate = (route: string) => {
    if (history.location.pathname !== route) history.push(route);
  };

  return (
    <header className={classes.headerContainer} {...props}>
      <div className={classes.logoContainer} onClick={() => navigate('/')}>
        <LogoImg className={classes.logoImg} />
        <div className={classes.logoText}>PITDB</div>
      </div>
      <nav className={classes.navContainer}>
        <ul className={classes.nav}>
          {navItems.map(({ name, navTo }) => {
            const isCurrentRoute = checkIfCurrentRoute(navTo);
            return (
              <li
                key={name}
                className={classes.navItem}
                onClick={() => navigate(navTo)}
                style={{
                  borderBottom: isCurrentRoute ? '1px solid white' : '1px solid transparent',
                }}
              >
                {name}
              </li>
            );
          })}
        </ul>
        <div className={classes.getPitButton}>Get PITGUI</div>
      </nav>
    </header>
  );
};

export default Header;
