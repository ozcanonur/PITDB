import makeStyles from '@material-ui/core/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  table: {
    marginBottom: '0',
    width: '100%',
    maxWidth: '100%',
    backgroundColor: 'transparent',
    borderSpacing: '0',
    borderCollapse: 'collapse',
  },
  tableHeadCell: {
    lineHeight: 1.5,
    overflow: 'visible !important',

    '&, &$tableCell': {
      fontSize: '1.4rem',
      fontWeight: 600,
      color: theme.palette.primary.main,
      maxWidth: '9rem',
      whiteSpace: 'break-spaces',
    },
  },
  tableCell: {
    fontWeight: 400,
    padding: '0 !important',
    verticalAlign: 'middle',
    fontSize: '1.4rem !important',
    color: theme.palette.primary.main,
    fontFamily: 'Poppins, sans-serif !important',
    borderColor: 'rgba(94, 112, 157, 0.25)',
    maxWidth: '14ch',
    whiteSpace: 'nowrap',
    // maxWidth: '10ch',
    // minWidth: '10ch',
    position: 'relative',
    transform: 'translateZ(0)',
    overflow: 'auto',
    paddingRight: '0.5rem !important',
  },
  tableResponsive: {
    width: '100%',
    marginTop: '2px',
    overflowX: 'visible',
    position: 'relative',
  },
  tableHeadRow: {
    height: '4rem',
    color: 'inherit',
    display: 'table-row',
    outline: 'none',
    verticalAlign: 'middle',
  },
  tableBodyRow: {
    height: '4rem',
    color: 'inherit',
    display: 'table-row',
    outline: 'none',
    verticalAlign: 'middle',
  },
  tablePagination: {
    fontSize: '1.4rem',
    fontFamily: 'Poppins, sans-serif !important',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },
  sortDropdown: {
    position: 'absolute',
    fontSize: '2rem',
    top: '50%',
    transform: 'translateY(-50%)',
  },
  paginationActionsContainer: {
    flexShrink: 0,
    marginLeft: '2rem',
  },
  tablePaginationSelectIcon: {
    fontSize: '2rem',
    color: theme.palette.primary.main,
    top: 'calc(50% - 1rem)',

    '& svg': {
      fontSize: '2rem',
    },
  },
  loadingContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  noResultsContainer: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
  },
  tableHeadCellRowContentRight: {
    // minWidth: '5ch',
    // maxWidth: '5ch',
  },
  tableCellRowContentRight: {
    // minWidth: '5ch',
    // maxWidth: '5ch',
    textAlign: 'center',

    '&:hover': {
      backgroundColor: 'rgba(51, 51, 102, 0.2)',

      '& > img': {
        transform: 'scale(1.2)',
      },
    },
  },
}));
