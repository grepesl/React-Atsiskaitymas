import React from 'react'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { UserProvider } from "../contexts/UsersContext.jsx";

const MainLayout = () => {
    return (
        <>
            <UserProvider>
                <Navbar />
                <Outlet />
                <ToastContainer />
                <Footer />
            </UserProvider>
        </>
    )
}
export default MainLayout
