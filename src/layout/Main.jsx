import React from 'react'
import Footer from '../components/Footer'
import "../index.css"

const Main = (props) => {
  return (
    <main className='main min-h-screen'>
        {props.children}
        <Footer />
    </main>
  )
}

export default Main