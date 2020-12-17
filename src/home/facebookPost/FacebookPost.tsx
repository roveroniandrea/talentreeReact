export default function FacebookPost(props: { postOembed: JSX.Element; }) {

    return (
        <div className="box" style={ ({ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }) }>
            {props.postOembed }
        </div>
    );
}