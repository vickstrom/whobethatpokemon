import './youtube.css'

export default function YoutubeVideo(props)  {
    return (
        <div className="video">
            <iframe
            width="853"
            height="480"
            src={`https://www.youtube.com/embed/${props.id}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Pokemon video"
            />
        </div>
    )
    } ;
