import { useHistory } from 'react-router-dom';

import { ReactComponent as DnaImg } from 'assets/dna_2.svg';
import UserImg from 'assets/user.svg';
import { ExampleProps } from './types';

import { useStyles } from './styles';

const ExampleCard = ({ exampleProps, ...props }: ExampleProps) => {
  const classes = useStyles();

  const { id, species, TGEs, username, date, color } = exampleProps;

  const history = useHistory();
  const navToProject = () => {
    history.push(`/browse/project/${id}/mutations`);
  };

  return (
    <div {...props} onClick={navToProject}>
      <div className={classes.cardContainer}>
        <div className={classes.cardTop} style={{ backgroundColor: color }}>
          <DnaImg className={classes.cardImg} />
          <div className={classes.cardTopText}>{id}</div>
        </div>
        <div className={classes.cardBottom}>
          <div className={classes.cardBottomTextsContainer}>
            <div>
              <span className={classes.cardBottomTextIdentifier}>Species: </span>
              {species}
            </div>
            <div>
              <span className={classes.cardBottomTextIdentifier}>TGEs: </span>
              {TGEs}
            </div>
          </div>
          <div className={classes.cardBottomFooter}>
            <img src={UserImg} className={classes.cardBottomFooterImg} alt='user' />
            <div className={classes.cardBottomFooterTextsContainer}>
              <div className={classes.cardBottomTextsUsername}>{username}</div>
              <div className={classes.cardBottomTextsDate}>{date}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExampleCard;
