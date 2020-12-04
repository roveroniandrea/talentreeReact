import { Component, Fragment } from "react";
import FacebookPost from './facebookPost/FacebookPost';
import { FacebookAPI, FacebookPostData } from '../utility/FacebookAPI';
import style from './Home.module.css';
import { EventBriteAPI, EventData } from '../utility/EventbriteAPI';
import { Utility } from '../utility/Utility';

interface HomeState {
    posts: FacebookPostData[];
    recentEvents: EventData[];
}
class Home extends Component<{}, HomeState> {

    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            posts: [],
            recentEvents: []
        };
    }

    componentDidMount() {
        FacebookAPI.getFacebookPosts()
            .then(posts => {
                this.setState({
                    posts
                });
            });

        EventBriteAPI.getNextActivities()
            .then(events => {
                //TODO: controlla correttezza
                let nearest = events.sort((e1, e2) => e1.start.getTime() - e2.start.getTime());
                this.setState({
                    recentEvents: nearest.slice(0, 5)
                });
            });
    }

    render() {
        return (
            <div className="columns is-desktop">
                <div className={ `column is-three-quarters ${style.postColumn}` }>
                    { this.state.posts.map(post => <FacebookPost key={ post.fullId } post={ post } />) }
                </div>
                <div className="column">
                    <div className="box">
                        <h1 className="title">Eventi recenti</h1>
                        { this.state.recentEvents.map(ev => (
                            <Fragment>
                                <hr />
                                <div className="button">
                                    <div className="block" key={ ev.eventId }>
                                        <p className="title is-4">{ ev.eventName }</p>
                                        <p className="subtitle is-6">{ Utility.formatDate(ev.start) }</p>
                                    </div>
                                </div>
                            </Fragment>
                        )) }
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;