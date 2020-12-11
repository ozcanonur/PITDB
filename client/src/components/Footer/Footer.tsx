import BessantLab from 'assets/bessant_lab.svg';
import { useStyles } from './styles/footer';

const Footer = () => {
  const classes = useStyles();

  return (
    <footer className={classes.container}>
      <div className={classes.copyrightPrivacyContainer}>
        <div className={classes.copyrightText}>&copy; 2020, PITDB</div>
        <div className={classes.privacyButton}>Privacy</div>
      </div>
      <img src={BessantLab} className={classes.bessantLab} alt='bessant lab' />
    </footer>
  );
};

export default Footer;
