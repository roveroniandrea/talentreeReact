export default function MentorBox(props: { mentor: { name: string, description: string, image: string; }; }) {
    return (
        <div className="card">
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            <img src={ `${process.env.PUBLIC_URL}/assets/${props.mentor.image}` } alt={ props.mentor.name } />
                        </figure>
                    </div>
                    <div className="media-content">
                        <p className="title is-4">{ props.mentor.name }</p>
                    </div>
                </div>

                <div className="content">
                    { props.mentor.description }
                </div>
            </div>
        </div>
    );
}