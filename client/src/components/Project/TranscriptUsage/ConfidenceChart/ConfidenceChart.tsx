import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ResponsiveBar } from '@nivo/bar';

import Loading from 'components/UI/Loading/Loading';
import { fetchFromApi } from 'utils';

import makeStyles from '@material-ui/core/styles/makeStyles';

import TranscriptConfidenceChart from 'components/UI/Svg/TranscriptConfidenceChart/TranscriptConfidenceChart';

export const useStyles = makeStyles((theme) => ({
  container: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    height: '100%',
    transform: 'translateX(-12rem)',
  },
  loading: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    transition: 'all .3s ease-in-out',
  },
}));

const ConfidenceChart = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  return (
    <div className={classes.container}>
      <Loading className={classes.loading} style={{ opacity: loading ? 1 : 0 }} />
      <TranscriptConfidenceChart />
    </div>
  );
};

export default ConfidenceChart;
