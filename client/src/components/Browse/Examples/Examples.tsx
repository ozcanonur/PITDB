import { useEffect } from 'react';
import AOS from 'aos';

import ExampleCard from './ExampleCard';

import { examples } from 'variables/browseExamples';
import { useStyles } from './styles';

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
          data-aos-delay={String(200 + index * 150)}
        />
      ))}
    </section>
  );
};

export default Examples;
