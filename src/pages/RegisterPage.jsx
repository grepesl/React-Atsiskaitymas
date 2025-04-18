import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [errorMessage, setErrorMessage] = useState(null);
    const navigate = useNavigate();

    const initialValues = {
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        birthDate: '',
        avatar: '',
    };

    const validationSchema = Yup.object({
        username: Yup.string()
            .required('Username is required')
            .min(3, 'Username must be at least 3 characters')
            .max(20, 'Username must be less than 20 characters'),
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required')
            .test('email-unique', 'Email is already registered', async (value) => {
                const response = await fetch('api/users');
                const users = await response.json();
                return !users.find((user) => user.email === value);
            }),
        password: Yup.string()
            .required('Password is required')
            .min(6, 'Password must be at least 6 characters'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Passwords must match')
            .required('Confirm your password'),
        birthDate: Yup.date().required('Birth date is required'),
    });

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const { username, email, password, birthDate, avatar } = values;

        const newUser = {
            username,
            email,
            password,
            birthDate,
            avatar: avatar || 'https://www.w3schools.com/w3images/avatar2.png', // Default avatar
        };

        try {
            const response = await fetch('api/users');
            const users = await response.json();
            if (users.find((user) => user.username === username || user.email === email)) {
                setErrorMessage('Username or email is already taken');
                setSubmitting(false);
                return;
            }

            const res = await fetch('api/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });

            if (!res.ok) {
                throw new Error('Failed to register user');
            }


            resetForm();
            navigate('/');
        } catch (error) {
            setErrorMessage('Registration failed. Please try again.');
            console.error('Error during registration:', error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">Register</h2>

                {errorMessage && (
                    <div className="text-red-500 text-center mb-4">
                        <p>{errorMessage}</p>
                    </div>
                )}

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-5">
                            <div>
                                <label htmlFor="username">Username</label>
                                <Field
                                    name="username"
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                />
                                <ErrorMessage name="username" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <Field
                                    name="email"
                                    type="email"
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <label htmlFor="password">Password</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <Field
                                    name="confirmPassword"
                                    type="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                />
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="birthDate">Birth Date</label>
                                <Field
                                    name="birthDate"
                                    type="date"
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                />
                                <ErrorMessage name="birthDate" component="div" className="text-red-500 text-sm" />
                            </div>

                            <div>
                                <label htmlFor="avatar">Avatar (Optional)</label>
                                <Field
                                    name="avatar"
                                    type="url"
                                    className="w-full px-4 py-2 border border-gray-300 rounded"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                            >
                                Register
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default RegisterPage;
