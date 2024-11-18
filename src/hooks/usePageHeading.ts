import { useLocation } from 'react-router-dom';
import pageMetadata from '../pageMeta/pageMeta';

interface PageMetadata {
  [key: string]: string;
}

const usePageHeading = () => {
  const location = useLocation();
  const heading = (pageMetadata as PageMetadata)[location.pathname] || 'Page heading not set';
  return heading;
};

export default usePageHeading;