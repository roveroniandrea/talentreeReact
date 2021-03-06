import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Button } from './button/Button';

interface AppProps {
  name: string,
  surname: string,
}
interface AppState {
  number: number
}
class App extends React.Component<AppProps, AppState> {
  timer: any;

  constructor(props: AppProps | Readonly<AppProps>) {
    super(props);
    this.state = {
      number: 0
    };
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState((state, _props) => ({
        number: state.number + 1
      }))
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Nome: {this.props.name}, cognome: {this.props.surname}
          </p>
          <p>{this.state.number}</p>
          <Button onClick={() => this.onClickHandler()} text="Aumenta di 100" />
          <button>Ciao</button>
        </header>
      </div>
    );
  }

  onClickHandler() {
    this.setState((state, _props) => ({
      number: state.number + 100
    }));
  }
}

export default App;
