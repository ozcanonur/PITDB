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
    // color: theme.palette.primary.main,
    cursor: 'pointer',
    paddingRight: '0.5rem !important',
    '&, &$tableCell': {
      fontSize: '1.4rem',
      fontWeight: 600,
      color: theme.palette.primary.main,
    },
  },
  tableCell: {
    fontWeight: 400,
    padding: '0 !important',
    verticalAlign: 'middle',
    fontSize: '1.4rem !important',
    paddingRight: '0.5rem !important',
    color: theme.palette.primary.main,
    fontFamily: 'Poppins, sans-serif !important',
    borderColor: 'rgba(94, 112, 157, 0.25)',
    maxWidth: '10rem',
    position: 'relative',
  },
  tableResponsive: {
    width: '100%',
    marginTop: '2px',
    overflowX: 'visible',
  },
  tableHeadRow: {
    height: '4rem',
    color: 'inherit',
    display: 'table-row',
    outline: 'none',
    verticalAlign: 'middle',

    '& > th:last-child': {
      width: '2rem',
    },
  },
  tableBodyRow: {
    height: '4rem',
    color: 'inherit',
    display: 'table-row',
    outline: 'none',
    verticalAlign: 'middle',
  },
  tableCellClickableContent: {
    cursor: 'pointer',
    color: '#337AB7',
    display: 'inline',
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
}));
