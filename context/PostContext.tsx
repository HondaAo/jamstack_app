import { createContext, useState, ReactChild, ReactNode } from "react"
import { Field, Return } from "../types";

export const PostContext = createContext(null);

interface Props{
    children: ReactNode
}

export const PostProvider: React.FC<Props> = ({children}) => {
    const [ posts, setPosts ] = useState<Return[] | null>(null);
    const refreshPosts = async() => {
        try{
            const res = await fetch('/api/getPosts')
            const latest = await res.json();
            setPosts(latest)
        }catch(err){
            console.error(err)
        }
    }

    const createPost = async(description: Field): Promise<void> => {
        try{ 
            const res = await fetch('/api/createPost', {
                method: 'POST',
                body: JSON.stringify(description),
                headers: {'Content-Type': 'application/json'}
            })
            const newPost = await res.json();
            setPosts((prevPosts) => {
                return [
                    newPost,
                    ...prevPosts
                ]
            })
        }catch(err){
            console.error(err)
        }
    }

    const updatePost = async(updatedPost: Return): Promise<void> => {
        try{
            const res = await fetch('/api/updatePost', {
                method: 'PUT',
                body: JSON.stringify(updatedPost),
                headers: { 'Content=Type': 'application/json'},
            });
            await res.json()
            setPosts((prevPosts) => {
                const exisitngPosts = [...prevPosts];
                const existingPost = exisitngPosts.find(post => post.id === updatedPost.id);
                existingPost.fields = updatedPost.fields
                return exisitngPosts
            })
        }catch(err){
            console.error(err)
        }
    }

    const deletePost = async(id) => {
        try{
            await fetch('/api/deletePost', {
                method: 'Delete',
                body: JSON.stringify({ id }),
                headers: { 'Content-Type': 'application/json' },
            })
           setPosts((prevPosts) => {
               return prevPosts.filter((post) => post.id !== id )
           })
        }catch(err){
            console.error(err)
        }
    }
    return (
        <PostContext.Provider value={{ posts, setPosts, createPost, updatePost, deletePost }}>
            {children}
        </PostContext.Provider>
    )
}