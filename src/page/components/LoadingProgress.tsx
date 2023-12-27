import './../../scss/components/loading.scss';

interface ProgressProps {
  progress: number;
}

const LoadingProgress: React.FC<ProgressProps> = (props) => {
  return (
    <div className="progress"
         style={{
           width: `${props.progress}%`,
         }}
    ></div>
  );
}

export default LoadingProgress;