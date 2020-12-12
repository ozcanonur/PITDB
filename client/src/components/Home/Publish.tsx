import { useHistory } from 'react-router-dom';

import CardClip from 'assets/card_clip_2.svg';
import BulletPoints from 'assets/publish_steps.svg';

import { useStyles } from './styles/publish';

const Publish = () => {
  const classes = useStyles();

  const history = useHistory();

  const navToBrowse = () => {
    history.push('/browse');
  };

  const bulletPoints = [
    {
      title: 'Download PITGUI',
      text: 'PITGUI is a desktop application which you can download here.',
    },
    {
      title: 'Upload your dataset',
      text: 'You should have both RNA-seq and LC-MS/MS data.',
    },
    {
      title: 'Run the analysis',
      text: 'This might take a while...Meanwhile, you can browse previous experiments.',
    },
    {
      title: 'Publish',
    },
  ];

  return (
    <section className={classes.container}>
      <img className={classes.cardClip} src={CardClip} alt='dna' />
      <div className={classes.headingContainer}>
        <h2 className={classes.heading}>How to run and publish your results</h2>
        <p className={classes.subHeading}>Published results will be shown here as public</p>
      </div>
      <div className={classes.bulletPointsContainer}>
        <img src={BulletPoints} alt='publish steps' />
      </div>
      <div className={classes.bulletPointsTextContainer}>
        {bulletPoints.map(({ title, text }) => (
          <div key={title} className={classes.bulletPoint}>
            <div className={classes.bulletPointTitle}>{title}</div>
            <div className={classes.bulletPointText}>{text}</div>
          </div>
        ))}
      </div>
      <div className={classes.buttons}>
        <div className={classes.downloadButton}>Download PITGUI</div>
        <div className={classes.browseButton} onClick={navToBrowse}>
          Browse
        </div>
      </div>
    </section>
  );
};

export default Publish;
