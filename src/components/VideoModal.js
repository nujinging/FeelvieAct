import './../App.scss';

export default function VideoModal(props) {
    console.log(props.url)
    return (
        <div className="video_modal">
            <iframe
                src={`https://www.themoviedb.org/video/play?key=${props.url}`}
                frameBorder="0"
                allowFullScreen
                title="Video Player"
            ></iframe>
        </div>
    );
}
