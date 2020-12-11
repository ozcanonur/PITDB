import CardClip from 'assets/card_clip.svg';

import { useStyles } from './styles/databaseStatistics';

const DatabaseStatistics = () => {
  const classes = useStyles();

  const statisticTexts = ['74,253 TGEs', '118,649 Transcripts', '117,578 Peptides', '642,096 PSMs', '90,319 Polymorphisms', '4 Species'];
  const placeholderDescription = `I'm a baby meggings shaman church-key cold-pressed butcher cardigan man braid hexagon typewriter.`;

  return (
    <section className={classes.container}>
      <img className={classes.cardClip} src={CardClip} alt='dna' />
      <div className={classes.headingContainer}>
        <h2 className={classes.heading}>Database Statistics</h2>
        <p className={classes.subHeading}>As of December 2020, the PITDB data consists of</p>
      </div>
      <div className={classes.statisticsContainer}>
        {statisticTexts.map((statistic) => (
          <div key={statistic} className={classes.statistic}>
            <div className={classes.square} />
            <div className={classes.statisticTextContainer}>
              <div className={classes.statisticTitle}>{statistic}</div>
              <div className={classes.statisticDescription}>{placeholderDescription}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DatabaseStatistics;
