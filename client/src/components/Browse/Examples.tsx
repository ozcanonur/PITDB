import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { examples } from 'variables/browseExamples';
import { ReactComponent as DnaImg } from 'assets/dna_2.svg';
import UserImg from 'assets/user.svg';
import { useStyles } from './styles/examples';

interface ExampleProps {
  exampleProps: {
    id: string;
    species: string;
    TGEs: string;
    username: string;
    date: string;
    color: string;
  };
}

const ExampleCard = ({ exampleProps, ...props }: ExampleProps) => {
  const classes = useStyles();

  const { id, species, TGEs, username, date, color } = exampleProps;

  return (
    <div {...props}>
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
    AOS.init();
  }, []);

  return (
    <section className={classes.container} {...props}>
      {examples.map((example, index) => (
        <ExampleCard
          key={example.id}
          exampleProps={example}
          data-aos='zoom-in'
          data-aos-delay={String(index * 50)}
          data-aos-duration='300'
          data-aos-easing='ease-in-out'
        />
      ))}
    </section>
  );
};

export default Examples;
