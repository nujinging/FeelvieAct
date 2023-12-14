export default function LoadingProgress(props) {
  return (
    <div className="progress"
         style={{
           width: `${props.progress}%`,
         }}
    ></div>
  );
}
