import { ReactComponent as LoadingSVG } from 'assets/loading.svg';

const Loading = ({ className, svgProps, ...props }: any) => {
  return (
    <div {...props} className={className}>
      <LoadingSVG {...svgProps} />
    </div>
  );
};

export default Loading;
