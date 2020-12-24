import { StatisticProps } from '../types';
import CardClip from 'assets/card_clip.svg';
import { statisticTexts, placeholderDescription } from 'variables/homeDatabaseStatistics';
import { useStyles } from './styles';

const Statistic = ({ title, description }: StatisticProps) => {
  const classes = useStyles();

  return (
    <div className={classes.statistic}>
      <div className={classes.square} />
      <div className={classes.statisticTextContainer}>
        <div className={classes.statisticTitle}>{title}</div>
        <article className={classes.statisticDescription}>{description}</article>
      </div>
    </div>
  );
};

const DatabaseStatistics = ({ ...props }) => {
  const classes = useStyles();

  return (
    <section className={classes.container} {...props}>
      <img className={classes.cardClip} src={CardClip} alt='dna' />
      <div className={classes.headingContainer}>
        <h2 className={classes.heading}>Database Statistics</h2>
        <p className={classes.subHeading}>As of December 2020, the PITDB data consists of</p>
      </div>
      <div className={classes.statisticsContainer}>
        {statisticTexts.map((statisticText) => (
          <Statistic key={statisticText} title={statisticText} description={placeholderDescription} />
        ))}
      </div>
    </section>
  );
};

export default DatabaseStatistics;
