import { useLocation, useHistory } from 'react-router-dom';

import ProjectInfo from './ProjectInfo';
import Category1 from 'assets/category1.svg';
import Category2 from 'assets/category2.svg';
import Category3 from 'assets/category3.svg';
import Category4 from 'assets/category4.svg';
import Category5 from 'assets/category5.svg';

import { useStyles } from './styles/sidebar';

const Sidebar = ({ projectId }: { projectId: string }) => {
  const classes = useStyles();

  const routes = [
    {
      name: 'Mutations',
      alt: 'mutations route',
      imgSrc: Category1,
      route: 'mutations',
    },
    {
      name: 'Differential gene expression',
      alt: 'differential gene expression route',
      imgSrc: Category2,
      route: 'differentialGeneExpression',
    },
    { name: 'Mutations', alt: 'browser route', imgSrc: Category3, route: 'browser' },
    {
      name: 'Splicing events',
      alt: 'splicing events route',
      imgSrc: Category4,
      route: 'splicingEvents',
    },
    {
      name: 'Transcript usage',
      alt: 'transcript usage route',
      imgSrc: Category5,
      route: 'transcriptUsage',
    },
  ];

  const currentRoute = useLocation().pathname.split('/')[3];

  const history = useHistory();

  const navToRoute = (route: string) => {
    if (currentRoute !== route) history.push(route);
  };

  return (
    <div className={classes.sidebarContainer}>
      <ProjectInfo projectId={projectId} />
      <div className={classes.routesContainer}>
        {routes.map(({ name, route, alt, imgSrc }) => (
          <div
            className={classes.route}
            style={{ backgroundColor: currentRoute === route ? 'rgba(51, 51, 102, 0.1)' : 'transparent' }}
            onClick={() => navToRoute(route)}
          >
            <img className={classes.routeImg} src={imgSrc} alt={alt} />
            <h4 className={classes.routeText}>{name}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
