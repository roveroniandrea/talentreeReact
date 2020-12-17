import { Fragment } from 'react';

export default function MentorBox(props: { mentor: { name: string, description: string, image: string; }, left: boolean; }) {

    const filler = (
        <div key="filler" className="column is-one-quarter is-hidden-mobile"></div>
    );
    const card = (
        <div key="card" className="card column is-three-quarters" style={ ({ margin: '20px' }) }>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-128x128 is-square">
                            <img className="is-rounded" src={ `${process.env.PUBLIC_URL}/assets/${props.mentor.image}` } alt={ props.mentor.name } />
                        </figure>
                    </div>
                    <div className="media-content" style={ ({ marginLeft: '10px' }) }>
                        <p className="title is-4">{ props.mentor.name }</p>
                        <p className="subtitle is-6">{ props.mentor.description }</p>
                    </div>
                </div>
            </div>
        </div>
    );
    return (
        <div className="columns">
            {[ filler, card ].sort(() => props.left ? -1 : 1) }
        </div>
    );
}