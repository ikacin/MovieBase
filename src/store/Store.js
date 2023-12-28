import React, { createContext, useContext, useReducer } from 'react';

// Kullanıcı verilerini başlangıç durumu olarak oluşturun
const initialState = {
    users: [
        { id: 1, name: "User 1", email: "user1@example.com" },
        { id: 2, name: "User 2", email: "user2@example.com" },
    ],
};


const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_AUTHORIZATION':
            return {
                ...state,
                authorization: action.payload.authorization,
            }
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


function MyProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <MyContext.Provider value={{ state, dispatch }}>
            {children}
        </MyContext.Provider>
    );
}

export { MyContext, MyProvider };
