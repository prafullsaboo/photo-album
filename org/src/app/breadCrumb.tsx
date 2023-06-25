import { Link } from 'react-router-dom';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import styles from './app.module.scss';

function Breadcrumbs() {
  return (
    <nav className={styles.breadCrumpContainer}>
      <Link to="/">User</Link>

      <ArrowForwardIosIcon className={styles.breadCrumpArrowIcon} />
      <Link to="/albumlist">Albums</Link>

      <ArrowForwardIosIcon className={styles.breadCrumpArrowIcon} />
      <Link to="/photolist">Photos</Link>
    </nav>
  );
}

export default Breadcrumbs;
