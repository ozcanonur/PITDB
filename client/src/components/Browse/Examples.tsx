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
            <strong>Species: </strong>
            {species}
          </div>
          <div>
            <strong>TGEs: </strong>
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

  const examples = [
    {
      id: 'EXP00008',
      species: 'Human',
      TGEs: '5,488',
      username: 'Esteban Gea',
      date: 'December 2, 2020',
      color: '#9999FF',
    },
    {
      id: 'EXP00013',
      species: 'Mouse',
      TGEs: '3,121',
      username: 'Conrad Bessant',
      date: 'January 5, 2021',
      color: '#6B6BB3',
    },
    {
      id: 'EXP01952',
      species: 'Rat',
      TGEs: '12,862',
      username: 'Onur Ozcan',
      date: 'February 22, 2021',
      color: '#333366',
    },
  ];

  return (
    <section className={classes.container}>
      {examples.map((example) => (
        <ExampleCard key={example.id} exampleProps={example} />
      ))}
    </section>
  );
};

export default Examples;
