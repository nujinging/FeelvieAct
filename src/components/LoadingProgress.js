import './../App.scss';
export default function LoadingProgress(props) {
    return (
        <div
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: `${props.progress}%`,
                height: '4px',
                backgroundColor: '#007bff',
                transition: 'width 0.2s',
                zIndex:9999,
            }}
        ></div>
    );
}
