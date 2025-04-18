import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useUser } from "../contexts/UsersContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { login, loggedInUser } = useUser();
    const [error, setError] = useState("");

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Minimum 6 characters")
            .required("Password is required"),
    });

    const handleSubmit = (values, { setSubmitting }) => {
        const success = login(values.email, values.password);
        if (!success) {
            setError("Incorrect email or password.");
        } else {
            setError("");
            navigate("/");
        }
        setSubmitting(false);
    };

    if (loggedInUser) {
        return (
            <div className="text-center py-10">
                <h2 className="text-2xl font-bold">Welcome back, {loggedInUser.name}!</h2>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-md bg-white shadow-md rounded p-8">
                <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
                    Login
                </h2>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="space-y-5">
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

                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                            >
                                Log In
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Login;
