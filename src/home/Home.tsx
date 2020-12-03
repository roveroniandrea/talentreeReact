import { Component, Fragment } from "react";
import FacebookPost from '../facebookPost/FacebookPost';
import { FacebookAPI, FacebookPostData } from '../utility/FacebookAPI';

interface HomeState {
    posts: FacebookPostData[];
}
class Home extends Component<{}, HomeState> {

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        FacebookAPI.getFacebookPosts()
            .then(posts => {
                this.setState({
                    posts
                });
            });
    }

    render() {
        return (
            <Fragment>
                <h1>Home page!</h1>
                {this.state.posts.map(post => <FacebookPost key={ post.fullId } post={ post } />) }
            </Fragment>
        );
    }
}

export default Home;