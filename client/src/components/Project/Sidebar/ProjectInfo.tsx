import { ReactComponent as DnaImg } from 'assets/dna_3.svg';
import { useStyles } from './styles/projectInfo';

const ProjectInfo = ({ project }: { project: string }) => {
  const classes = useStyles();

  const infoItems = [
    {
      identifier: 'Experiment:',
      value: project,
    },
    {
      identifier: 'Sample:',
      value: 'SAMP00048',
    },
    {
      identifier: 'Species:',
      value: 'Human',
    },
    {
      identifier: 'TGEs:',
      value: '5,488',
    },
  ];

  return (
    <section className={classes.projectInfoContainer}>
      <DnaImg className={classes.infoImage} />
      <div className={classes.projectInfo}>
        {infoItems.map(({ identifier, value }) => (
          <div key={identifier}>
            <span className={classes.projectInfoTextIdentifier}>{identifier}</span>
            {value}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectInfo;
