import React from 'react' 
import { Return } from '../types';

interface PostProps {
    post: Return
}

export const Post: React.FC<PostProps> = ({post}) =>{
        return (
            <div>
                <p>{post.fields.title}</p>
                <p>{post.fields.description}</p>
                <button>delete</button>
            </div>
        );
}