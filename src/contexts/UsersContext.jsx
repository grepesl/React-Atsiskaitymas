import React, { createContext, useState, useEffect, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("api/users"); // Pilnas URL
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error("Failed to fetch users", error);
            }
        };
        fetchUsers();
    }, []);

    const login = (email, password) => {
        const user = users.find((u) => u.email === email && u.password === password);
        if (user) {
            setLoggedInUser(user); // Atnaujinama, kai vartotojas rastas
            console.log("User logged in:", user); // Debug
            return true;
        }
        return false;
    };

    const logout = () => {
        setLoggedInUser(null); // Išvaloma, kai vartotojas atsijungia
    };

    return (
        <UserContext.Provider value={{ loggedInUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
