import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { useContext, useEffect } from 'react'
import { Navbar } from '../components/Navbar'
import { Post } from '../components/Post'
import { Return, User } from '../types'
import { table, minifyRecords } from './api/utils/Airtable'
import { PostContext } from '../context/PostContext'
import auth0 from './api/utils/auth0'
import { PostForm } from '../components/PostForm'

interface Props {
  initialPosts: Return[],
  user: User
}
export default function Home({initialPosts, user}: Props) {
  const {posts, setPosts} = useContext(PostContext)
  useEffect(() => {
    setPosts(initialPosts)
  },[])
  return (
    <div>
      <Head>
        <title>Create Blog App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={user} />
      <main>
        <h1>Blog App</h1>
        {user && (
        <>
        <PostForm user={user} />
        {posts && posts.map((post: Return) => {
          return(
            <Post key={post.id} post={post} />
          )
        })}
        </>
        )}
      </main>
    </div>
  )
}
export const getServerSideProps: GetServerSideProps = async context => {
  const { user } = await auth0.getSession(context.req);
  let posts = [];
  try{
  if(user){
    posts = await table.select({
       filterByFormula: `userId = '${user.sub}'`
     }).firstPage();
  }
  return {
    props: {
      initialPosts: minifyRecords(posts),
      user
    }
  }
 }catch(err){
   console.error(err);
   return {
     props: {
       err: "Something went wrong"
     }
   }
 }
}

