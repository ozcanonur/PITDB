import { ReactComponent as LoadingSVG } from 'assets/loading.svg';
import { LoadingProps } from './types';

const Loading = ({ className, svgProps, ...props }: LoadingProps) => {
  return (
    <div className={className} {...props}>
      <LoadingSVG {...svgProps} />
    </div>
  );
};

export default Loading;
