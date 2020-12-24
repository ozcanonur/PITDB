import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AOS from 'aos';

import { ExampleProps } from '../types';
import { examples } from 'variables/browseExamples';
import { ReactComponent as DnaImg } from 'assets/dna_2.svg';
import UserImg from 'assets/user.svg';
import { useStyles } from './styles';

const ExampleCard = ({ exampleProps, ...props }: ExampleProps) => {
  const classes = useStyles();

  const { id, species, TGEs, username, date, color } = exampleProps;

  const history = useHistory();
  const navToProject = () => {
    history.push(`/browse/${id}/mutations`);
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

const Examples = ({ ...props }) => {
  const classes = useStyles();

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <section className={classes.container} {...props}>
      {examples.map((example, index) => (
        <ExampleCard
          key={example.id}
          exampleProps={example}
          data-aos='zoom-in'
          data-aos-delay={String(250 + index * 200)}
        />
      ))}
    </section>
  );
};

export default Examples;
