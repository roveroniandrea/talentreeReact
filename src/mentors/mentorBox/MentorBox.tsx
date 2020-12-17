export default function MentorBox(props: { mentor: { name: string, description: string, image: string; }; }) {
    return (
        <div className="card" style={ ({ margin: '20px' }) }>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-128x128 is-square">
                            <img className="is-rounded" src={ `${process.env.PUBLIC_URL}/assets/${props.mentor.image}` } alt={ props.mentor.name } />
                        </figure>
                    </div>
                    <div className="media-content" style={ ({ marginLeft: '10px' }) }>
                        <p className="title is-3">{ props.mentor.name }</p>
                        <p className="subtitle is-5">{ props.mentor.description }</p>
                    </div>
                </div>
            </div>
        </div>
    );
}