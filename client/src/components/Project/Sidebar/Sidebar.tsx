import { useLocation, useHistory, useParams } from 'react-router-dom';

import ProjectInfo from './ProjectInfo/ProjectInfo';
import Category1 from 'assets/category1.svg';
import Category2 from 'assets/category2.svg';
import Category3 from 'assets/category3.svg';
import Category4 from 'assets/category4.svg';
import Category5 from 'assets/category5.svg';

import { useStyles } from './styles';

const Sidebar = () => {
  const classes = useStyles();

  const routes = [
    {
      name: 'Mutations',
      alt: 'mutations route',
      imgSrc: Category1,
      route: 'mutations',
    },
    {
      name: 'Diff. gene expression',
      alt: 'differential gene expression route',
      imgSrc: Category2,
      route: 'differential-gene-expression',
    },
    {
      name: 'Splicing events',
      alt: 'splicing events route',
      imgSrc: Category4,
      route: 'splicing-events',
    },
    {
      name: 'Transcript usage',
      alt: 'transcript usage route',
      imgSrc: Category5,
      route: 'transcript-usage',
    },
    {
      name: 'Gene browser',
      alt: 'gene browser route',
      imgSrc: Category3,
      route: 'gene-browser',
    },

    {
      name: 'Peptide maps',
      alt: 'peptide maps route',
      imgSrc: Category1,
      route: 'peptide-maps',
    },
  ];

  const { project } = useParams<{ project: string }>();

  const { pathname } = useLocation();
  const currentRoute = pathname.split('/')[pathname.split('/').length - 1];

  const history = useHistory();

  const navToRoute = (route: string) => {
    if (currentRoute !== route) history.push(route);
  };

  return (
    <nav className={classes.sidebarContainer}>
      <ProjectInfo project={project} />
      <div className={classes.routesContainer}>
        {routes.map(({ name, route, alt, imgSrc }) => (
          <div
            key={name}
            className={classes.route}
            style={{ backgroundColor: currentRoute === route ? 'rgba(51, 51, 102, 0.1)' : 'transparent' }}
            onClick={() => navToRoute(route)}
          >
            <img className={classes.routeImg} src={imgSrc} alt={alt} />
            <h4 className={classes.routeText}>{name}</h4>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;
