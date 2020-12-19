import { Component } from 'react';
import { RecoilRoot } from 'recoil';
import MainRouter from './core/mainRouter/MainRouter';

class App extends Component {
  render() {
    return (
      <RecoilRoot>
        <MainRouter></MainRouter>
      </RecoilRoot>
    );
  }
}

export default App;
