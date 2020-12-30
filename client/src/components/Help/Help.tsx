import { useEffect } from 'react';
import AOS from 'aos';
import { useHistory } from 'react-router-dom';

import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import TriangleClip from 'assets/double_triangle.svg';

import { useStyles } from './styles';
import { questions } from 'variables/helpQuestionTexts';
import { QuestionCardProps } from './types';

const QuestionCard = ({ questionTitle, questionAnswer, ...props }: QuestionCardProps) => {
  const classes = useStyles();

  return (
    <div className={classes.questionCard} {...props}>
      <div className={classes.questionHeadingContainer}>
        <div className={classes.questionIcon}>
          <p>?</p>
        </div>
        <div className={classes.questionText}>{questionTitle}</div>
      </div>
      <article className={classes.answerText}>{questionAnswer}</article>
    </div>
  );
};

const Help = () => {
  const classes = useStyles();

  const history = useHistory();

  const navToBrowse = () => {
    history.push('/browse');
  };

  useEffect(() => {
    AOS.init({
      duration: 500,
      easing: 'ease-in-out',
      once: true,
    });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.heroBg} />
      <Header />
      <main className={classes.home}>
        <section className={classes.heroContainer} data-aos='fade-right'>
          <h1 className={classes.heading}>What is PITDB ?</h1>
          <p className={classes.secondaryHeading}>
            The PIT approach involves the analysis of a given sample by both RNA-seq and proteomic mass
            spectrometry followed by sequence-level integration of the acquired data to provide an
            unprecedented insight into which genomic elements are being transcribed and translated within a
            given sample.{' '}
          </p>
          <div className={classes.browseButton} onClick={navToBrowse}>
            Browse
          </div>
        </section>
        <section className={classes.helpContentContainer}>
          <img className={classes.topTriangleClip} src={TriangleClip} alt='triangle' data-aos='fade-right' />
          <div className={classes.questionsContainer}>
            {questions.map(({ question, answer }) => (
              <QuestionCard
                key={question}
                questionTitle={question}
                questionAnswer={answer}
                data-aos='fade-up'
              />
            ))}
          </div>
          <img className={classes.bottomTriangleClip} src={TriangleClip} alt='triangle' />
        </section>
        <Footer />
      </main>
    </div>
  );
};

export default Help;
