import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import Routes from './routes'

const renderApp = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component/>
    </AppContainer>,
    document.getElementById('app')
  );
};

renderApp(Routes);

// Webpack Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./routes', () => {
    renderApp(require('./routes').default);
  })
}
