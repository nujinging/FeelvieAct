import './../../scss/components/loading.scss';

interface LoadingProps {}

const Loading: React.FC<LoadingProps> = () => {
  return (
    <div className="loading">
      <span className="loader"></span>
    </div>
  );
}

export default Loading;