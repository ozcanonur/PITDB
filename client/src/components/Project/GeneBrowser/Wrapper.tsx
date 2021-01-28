import GeneBrowser from './GeneBrowser/GeneBrowser';

import { useStyles } from './styles';

const GeneBrowserWrapper = () => {
  const classes = useStyles();

  return (
    <div className={classes.geneBrowserContainer}>
      <GeneBrowser />
    </div>
  );
};

export default GeneBrowserWrapper;
