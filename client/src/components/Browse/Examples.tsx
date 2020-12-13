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

const ExampleCard = ({ exampleProps }: ExampleProps) => {
  const classes = useStyles();

  const { id, species, TGEs, username, date, color } = exampleProps;

  return (
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
  );
};

const Examples = () => {
  const classes = useStyles();

  return (
    <section className={classes.container}>
      {examples.map((example) => (
        <ExampleCard key={example.id} exampleProps={example} />
      ))}
    </section>
  );
};

export default Examples;
