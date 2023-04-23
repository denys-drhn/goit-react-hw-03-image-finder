import { InfinitySpin } from 'react-loader-spinner';
import css from './Loader.module.css';

const Spinner = () => (
  <div className={css.Spinner}>
    <InfinitySpin width="200" color="#4fa94d" />
  </div>
);

export default Spinner;
