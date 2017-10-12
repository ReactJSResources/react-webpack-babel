import React from 'react';
import '../styles/index.scss';
import Header from './components/header';
import ContactGrid from './components/contact-grid';

//Load fileMock data into contact-grid

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <ContactGrid />
        <ContactGrid />
        <ContactGrid />
        <ContactGrid />
        <p>This React project just works including <span className="redBg">module</span> local styles.</p>
        <p>Enjoy!</p>
      </div>
    )
  }
}
