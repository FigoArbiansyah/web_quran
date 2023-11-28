/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import React from 'react';
import Footer from '../components/Footer';
import '../index.css';

const Main = (props) => (
  <main className="main min-h-screen">
    {props.children}
    <Footer />
  </main>
);

export default React.memo(Main);
