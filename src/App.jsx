import React from 'react'
import {Router, createBrowserRouter, createRoutesFromElements, RouterProvider, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import MainLayout from "./layouts/MainLayout.jsx";
import JobsPage from "./pages/JobsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import JobPage, { jobLoader } from "./pages/JobPage.jsx";
import AddJobPage from "./pages/AddJobPage.jsx";
import EditJobPage from "./pages/EditJobPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

const App = () => {
    // Add Job
    const addJob = async (newJob) => {
        const res = await fetch('/api/jobs', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newJob)
        });
        return;
    }

    // Delete Job
    const deleteJob = async (id) => {
        const res = await fetch(`/api/jobs/${id}`, {
            method: "DELETE"
        });
    }

    // Update Job
    const updateJob = async (job) => {
        const res = await fetch(`/api/jobs/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(job)
        });

        return;
    }

    const router  = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/jobs" element={<JobsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
                <Route path="/edit-job/:id" element={<EditJobPage updateJobSubmit={updateJob} />} loader={jobLoader} />
                <Route path="/jobs/:id" element={<JobPage deleteJob={deleteJob} />} loader={jobLoader} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        )
    );

    return <RouterProvider router={router} />
}

export default App