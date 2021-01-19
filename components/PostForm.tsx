import React, { useContext, useState } from 'react' 
import { createContext } from 'vm';
import { PostContext } from '../context/PostContext';
import { User } from '../types';

interface PostFormProps {
    user: User
}

export const PostForm: React.FC<PostFormProps> = ({user}) =>{
    const [ title, setTitle] = useState('');
    const [ description, setDescription ] = useState('');
    const { createPost } = useContext(PostContext)
    const onSubmit = (e) => {
        e.preventDefault();
        createPost({ title, description, userId: user.sub })
        setTitle('')
        setDescription('')
    }
    return (
        <form className="form my-6" onSubmit={onSubmit}>
            <div>
                <label>Title</label>
                <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" required />
                <label>Description</label>
                <input type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)} className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" required />
                <input type="submit" value="Submit" className="group relative w-full flex justify-center mt-4 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" />
            </div>
        </form>
    );
}