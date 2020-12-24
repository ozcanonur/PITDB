import IconButton from '@material-ui/core/IconButton';

import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';

import { CustomPaginationActionsProps } from './types';
import { useStyles } from './styles';

const CustomPaginationActions = ({ count, page, rowsPerPage, onChangePage }: CustomPaginationActionsProps) => {
  const classes = useStyles();

  const handleBackButtonClick = (event: any) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event: any) => {
    onChangePage(event, page + 1);
  };

  return (
    <div className={classes.paginationActionsContainer}>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label='previous page'
        className={classes.tablePaginationSelectIcon}
      >
        <ArrowLeftIcon />
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label='next page'
        className={classes.tablePaginationSelectIcon}
      >
        <ArrowRightIcon />
      </IconButton>
    </div>
  );
};

export default CustomPaginationActions;
