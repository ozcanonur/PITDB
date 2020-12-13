import { ReactComponent as LogoImg } from 'assets/dna_small.svg';
import { ReactComponent as LCMS } from 'assets/lcms_icon.svg';
import { ReactComponent as UniProt } from 'assets/uniprot_icon.svg';
import { ReactComponent as PITDBCylinder } from 'assets/cylinder.svg';
import { useStyles } from './styles/flow';

const FlowShape = ({ children }: { children?: JSX.Element | string }) => {
  const classes = useStyles();

  return (
    <div className={classes.flowShapeContainer}>
      <div className={classes.flowSquare}>{children}</div>
      <div className={classes.flowTriangle} />
    </div>
  );
};

const FlowShapeVertical = ({ children }: { children?: JSX.Element | string }) => {
  const classes = useStyles();

  return (
    <div className={classes.flowShapeContainerVertical}>
      <div className={classes.flowSquareVertical}>{children}</div>
      <div className={classes.flowTriangleVertical} />
    </div>
  );
};

const Flow = ({ ...props }: any) => {
  const classes = useStyles();

  const flowItems = [
    {
      title: 'RNA-Seq',
      FlowImg: <LogoImg className={classes.flowContentImg} />,
      texts: ['Transcript assembly', 'Genome mapping', 'ORF finding'],
    },
    {
      title: 'LC-MS / MS',
      FlowImg: <LCMS className={classes.flowContentImg} />,
      texts: ['Peptide spectrum matching'],
    },
    {
      title: 'UniProt',
      FlowImg: <UniProt className={classes.flowContentImg} />,
      texts: ['Homology Search', 'TGE classification'],
    },
  ];

  const verticalFlowItem = {
    title: 'PITDB',
    FlowImg: <PITDBCylinder className={classes.flowContentImg} />,
    texts: ['Transcripts', 'Genome annotation', 'ORF sequences', 'Peptide evidence', 'Annotated TGEs'],
  };

  return (
    <section className={classes.container} {...props}>
      {flowItems.map(({ title, FlowImg, texts }) => (
        <FlowShape key={title}>
          <>
            <div className={classes.flowContentHeading}>
              {FlowImg}
              {title}
            </div>
            <ul className={classes.flowContentList}>
              {texts.map((text) => (
                <li key={text} className={classes.flowText}>
                  {text}
                </li>
              ))}
            </ul>
          </>
        </FlowShape>
      ))}
      <FlowShapeVertical>
        <>
          <div className={classes.flowContentHeading}>
            {verticalFlowItem.FlowImg} {verticalFlowItem.title}
          </div>
          <ul className={classes.flowContentList}>
            {verticalFlowItem.texts.map((text) => (
              <li key={text} className={classes.flowText}>
                {text}
              </li>
            ))}
          </ul>
        </>
      </FlowShapeVertical>
    </section>
  );
};

export default Flow;
