import loadable from '@loadable/component';
import { Component } from 'react';
import { RecoilRoot } from 'recoil';
const MainRouter = loadable(() => import('./core/mainRouter/MainRouter'));

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
