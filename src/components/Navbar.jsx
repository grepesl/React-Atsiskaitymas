import React from 'react';
import { useUser } from '../contexts/UsersContext';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    const linkClass = ({ isActive }) =>
        isActive
            ? 'bg-black text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2'
            : 'text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2';

    const { loggedInUser, logout } = useUser(); // Get logged-in user and logout function from context

    return (
        <nav className="bg-indigo-700 border-b border-indigo-500">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="flex h-20 items-center justify-between">
                    <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
                        <NavLink className="flex flex-shrink-0 items-center mr-4" to="/">
                            <img className="h-10 w-auto" src="/./vite.svg" alt="React Jobs" />
                            <span className="hidden md:block text-white text-2xl font-bold ml-2">React Jobs</span>
                        </NavLink>

                        <div className="md:ml-auto">
                            <div className="flex space-x-2">
                                <NavLink to="/" className={linkClass}>
                                    Home
                                </NavLink>
                                <NavLink to="/jobs" className={linkClass}>
                                    Jobs
                                </NavLink>

                                {loggedInUser && (
                                    <NavLink to="/add-job" className={linkClass}>
                                        Add Job
                                    </NavLink>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-4">
                        {loggedInUser ? (
                            <>
                                <div className="flex items-center space-x-2 text-white">
                                    <img
                                        src={loggedInUser.avatar || 'https://example.com/default-avatar.jpg'}
                                        alt="User avatar"
                                        className="h-10 w-10 rounded-full object-cover"
                                    />
                                    <span className="hidden md:inline">{loggedInUser.name}</span>
                                </div>
                                <button
                                    onClick={logout} // Logout function will be triggered here
                                    className="text-white hover:text-indigo-300"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <NavLink to="/login" className="text-white hover:text-indigo-300">
                                    Login
                                </NavLink>
                                <NavLink to="/register" className="text-white hover:text-indigo-300">
                                    Register
                                </NavLink>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
