import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app.jsx';

render( <AppContainer>
        <App/>
</AppContainer>,
    document.querySelector("#app"));

if (module && module.hot) {
  module.hot.accept('./app.jsx', () => {
    const HotApp = require('./app.jsx').default;
    render(
      <AppContainer>
        <HotApp/>
      </AppContainer>,
      document.querySelector("#app")
    );
  });
}
