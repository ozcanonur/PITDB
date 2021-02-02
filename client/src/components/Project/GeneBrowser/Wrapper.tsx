import GeneBrowser from './GeneBrowser/GeneBrowser';

import { useStyles } from './styles';

const GeneBrowserWrapper = () => {
  const classes = useStyles();

  return (
    <main className={classes.geneBrowserContainer}>
      <GeneBrowser />
    </main>
  );
};

export default GeneBrowserWrapper;
