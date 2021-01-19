import React from 'react'
import { PostProvider } from '../context/PostContext'
import '../styles/index.css'

function MyApp({ Component, pageProps }) {
  return(
  <PostProvider>
   <div className="container mx-auto my-10 max-w-xl">
     <Component {...pageProps} />
   </div>
  </PostProvider>
  ) 
}

export default MyApp
