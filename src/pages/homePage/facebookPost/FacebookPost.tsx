export default function FacebookPost(props: { postOembed: JSX.Element; }) {

    return (
        <div className="box" style={ ({ textAlign: 'center', marginBottom: '20px', minWidth: '552px' }) }>
            {props.postOembed }
        </div>
    );
}