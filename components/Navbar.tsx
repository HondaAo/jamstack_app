import React from 'react' 
import { User } from '../types';

interface NavbarProps {
    user: User
}

export const Navbar: React.FC<NavbarProps> = ({user}) =>{
        return (
            <nav className="flex justify-between">
                <p className="text-2xl font-bold text-grey-800">My Posts</p>
                <div className="flex">
                { user ? (
                    <a href="/api/logout" className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">
                        LOGOUT
                    </a>
                ):(
                    <a href="/api/login" className="rounded bg-blue-500 hover:bg-blue-600 text-white py-2 px-4">
                        LOGIN
                    </a>
                )}
                </div>
            </nav>
        );
}