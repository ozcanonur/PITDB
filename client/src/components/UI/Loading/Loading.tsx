import { ReactComponent as LoadingSVG } from 'assets/loading.svg';

const Loading = ({ containerProps, svgProps }: any) => {
  return (
    <div {...containerProps}>
      <LoadingSVG {...svgProps} />
    </div>
  );
};

export default Loading;
