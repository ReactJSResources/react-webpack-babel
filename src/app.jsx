import React from 'react';
import Navigation from './components/Navigation';
import 'normalize.css';

import "styles/base/_main.sass"  // Global styles
import "styles/base/_common.sass"  // Global styles
import styles from "./app.sass"  // Css-module styles

const App = () => (
  <div className='App'>
    <Navigation/>
    <div>
      <h1>It Works!</h1>
      <p>This React project just works including <span className={styles.redButton}>css-module</span> local styles.</p>
      <p>Enjoy!</p>
    </div>
  </div>
);

export default App;
