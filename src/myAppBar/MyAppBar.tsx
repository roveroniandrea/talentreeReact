import { AppBar, Tab, Tabs } from "@material-ui/core";
import React from "react";
import { withRouter } from "react-router-dom";

interface MyAppBarProps {
    match: any,
    location: any,
    history: any
}

interface MyAppBarState {
    selectedTabIndex: number;
}

class MyAppBar extends React.Component<MyAppBarProps, MyAppBarState> {

    myRoutes: Array<{ name: string, route: string }>

    constructor(props: MyAppBarProps | Readonly<MyAppBarProps>) {
        super(props);
        this.state = {
            selectedTabIndex: 0
        }

        this.myRoutes = [
            {
                name: 'Home',
                route: '/'
            },
            {
                name: 'Pagina 2',
                route: '/2'
            }
        ]
    }

    componentDidMount() {
        this.setState({
            selectedTabIndex: this.myRoutes.findIndex(r => r.route === this.props.location.pathname)
        });
    }

    render() {
        return (
            <AppBar position="static">
                <Tabs value={this.state.selectedTabIndex} onChange={(_e, index) => this.changeToRoute(index)}>
                    {
                        this.myRoutes.map(r =>
                            <Tab key={r.name} label={r.name}></Tab>
                        )
                    }
                </Tabs>
            </AppBar>
        );
    }

    changeToRoute(index: number) {
        this.props.history.push(this.myRoutes[index].route);
        this.setState({
            selectedTabIndex: index
        })
    }
}

export default withRouter(MyAppBar);