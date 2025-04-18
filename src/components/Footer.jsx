import React from 'react'

const Footer = () => {
    return (
        <>
            <footer className="bg-indigo-800 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">

                        {/* Copyright & Creator */}
                        <div className="text-center md:text-left">
                            <p>&copy; {new Date().getFullYear()} Created <span className="font-semibold">Greta P.</span></p>
                        </div>

                        {/* Social Icons */}
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-indigo-300">Facebook</a>
                            <a href="#" className="hover:text-indigo-300">Instagram</a>
                            <a href="#" className="hover:text-indigo-300">LinkedIn</a>
                        </div>

                        {/* Policies */}
                        <div className="flex space-x-4">
                            <a href="#" className="hover:text-indigo-300">Cookies</a>
                            <a href="#" className="hover:text-indigo-300">Privacy Policy</a>
                            <a href="#" className="hover:text-indigo-300">Terms & Uses</a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
export default Footer
