import React from "react";
import Utility from "../utility/Utility";

class Home extends React.Component {

    componentDidMount() {
        Utility.getFacebookPosts()
            .then(posts => {
                console.log(posts);
            })
    }

    render() {
        return (
            <h1>Home page!</h1>
        );
    }
}

export default Home;