import { ReactComponent as LogoImg } from 'assets/dna_small.svg';

import { useStyles } from './styles/header';

const Header = () => {
  const classes = useStyles();

  const navItems = ['Browse', 'Search', 'API', 'About', 'Help'];

  return (
    <header className={classes.headerContainer}>
      <div className={classes.logoContainer}>
        <LogoImg className={classes.logoImg} />
        <div className={classes.logoText}>PITDB</div>
      </div>
      <nav className={classes.navContainer}>
        <ul className={classes.nav}>
          {navItems.map((item) => (
            <li className={classes.navItem}>{item}</li>
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
