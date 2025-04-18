import React from 'react';
import { FaMapMarker } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const JobListing = ({ job }) => {
    const { createdBy } = job;

    const userAvatar = createdBy?.avatar || 'https://via.placeholder.com/150';
    const userName = createdBy?.username || 'Unknown User';
    const createdAt = createdBy?.createdAt ? new Date(createdBy.createdAt).toLocaleDateString() : 'Unknown Date';

    return (
        <div className="bg-white rounded-xl shadow-md relative">
            <div className="p-4">
                <div className="mb-6">
                    <div className="text-gray-600 my-2">{job.type}</div>
                    <h3 className="text-xl font-bold">{job.title}</h3>
                </div>

                <div className="mb-5">{job.description}</div>

                <h3 className="text-indigo-500 mb-2">{job.salary} / Year</h3>

                <div className="border border-gray-100 mb-5"></div>

                <div className="flex flex-col lg:flex-row justify-between mb-4">
                    <div className="text-orange-700 mb-3 mr-1">
                        <FaMapMarker className="inline text-lg mb-1" />
                        {job.location}
                    </div>
                    <Link
                        to={`/jobs/${job.id}`}
                        className="h-[36px] bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-center text-sm"
                    >
                        Read More
                    </Link>
                </div>

                <div className="flex items-center space-x-4">
                    <img
                        src={userAvatar}
                        alt="User avatar"
                        className="h-10 w-10 rounded-full object-cover"
                    />
                    <span className="text-gray-800 font-medium">{userName}</span>
                    <p className="text-sm text-gray-600">{createdAt}</p>
                </div>
            </div>
        </div>
    );
};

export default JobListing;
