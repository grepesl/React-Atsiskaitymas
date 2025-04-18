import React, { useState } from 'react';
import { useUser } from '../contexts/UsersContext';

const JobCreation = () => {
    const { loggedInUser } = useUser();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [location, setLocation] = useState('');
    const [salary, setSalary] = useState('');
    const [loading, setLoading] = useState(false);

    const handleCreateJob = async (e) => {
        e.preventDefault();

        if (!loggedInUser) {
            alert('You must be logged in to post a job!');
            return;
        }

        setLoading(true);

        const newJob = {
            title,
            description,
            type,
            location,
            salary,
            createdBy: {
                id: loggedInUser.id,
                username: loggedInUser.username,
                email: loggedInUser.email,
                avatar: loggedInUser.avatar,
                createdAt: new Date().toISOString(),
            },
        };

        try {
            const response = await fetch('/api/jobs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newJob),
            });

            const result = await response.json();
            if (response.ok) {
                alert('Job created successfully');
            } else {
                alert('Error creating job');
            }
        } catch (error) {
            console.log('Error creating job:', error);
            alert('Error creating job');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container">
            <h2 className="text-3xl font-bold">Post a New Job</h2>

            <form onSubmit={handleCreateJob}>
                <div>
                    <label>Title</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Type</label>
                    <input
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Location</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label>Salary</label>
                    <input
                        type="text"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? 'Creating...' : 'Create Job'}
                </button>
            </form>
        </div>
    );
};

export default JobCreation;
