import React from 'react';
import './App.scss';
import routes from './routes'
import { renderRoutes } from 'react-router-config';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import store from './store'
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <BrowserRouter>
          {renderRoutes(routes)}
        </BrowserRouter>
      </div>
    </Provider>
  );
}

export default App;
