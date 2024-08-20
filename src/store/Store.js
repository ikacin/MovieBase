import React, { createContext, useReducer } from 'react';

const initialState = {
    authorization: {
        id:null,
        name: null,
        email:null ,
        date: null,
        accessToken: null,
        refreshToken: null,
        userRole: null,
        expiresAt: null,
        isAuthenticated: false
    },
    users: []
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_AUTHORIZATION':
            return {
                ...state,
                authorization: {
                    id:action.payload.id,
                    name: action.payload.name,
                    email:action.payload.email ,
                    date: action.payload.date,
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                    userRole: action.payload.userRole,
                    expiresAt: action.payload.expiresAt,
                    isAuthenticated: action.payload.isAuthenticated
                }
            };
        case 'ADD_USER':
            return {
                ...state,
                users: [...state.users, action.payload],
            };

        case 'REMOVE_USER':
            return {
                ...state,
                users: state.users.filter((user) => user.id !== action.payload),
            };
        default:
            return state;
    }
};

const MyContext = createContext();

const MyProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MyContext.Provider value={{ state, dispatch }}>
            {children}
        </MyContext.Provider>
    );
}

export { MyContext, MyProvider };
