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
    users: [],
    favoriteItems:[]
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_AUTHORIZATION':
            const updatedAuthState = {
                ...state,
                authorization: {
                    ...state.authorization,
                    id: action.payload.id,
                    name: action.payload.name,
                    email: action.payload.email,
                    date: action.payload.date,
                    accessToken: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken,
                    userRole: action.payload.userRole,
                    expiresAt: action.payload.expiresAt,
                    isAuthenticated: action.payload.isAuthenticated
                }
            };
            localStorage.setItem('appState', JSON.stringify(updatedAuthState));
            return updatedAuthState;
        case 'ADD_USER':
            const updatedUserState = {
                ...state,
                users: [...state.users, action.payload],
            };
            localStorage.setItem('appState', JSON.stringify(updatedUserState));
            return updatedUserState;
        case 'REMOVE_USER':
            const filteredState = {
                ...state,
                users: state.users.filter(user => user.id !== action.payload),
            };
            localStorage.setItem('appState', JSON.stringify(filteredState));
            return filteredState;

        case 'FAVORITE':
            const isFavorited = state.favoriteItems.includes(action.payload);
            const updatedFavorites = isFavorited
                ? state.favoriteItems.filter(id => id !== action.payload)
                : [...state.favoriteItems, action.payload];

            const updatedStateWithFavorites = {
                ...state,
                favoriteItems: updatedFavorites
            };
            localStorage.setItem('appState', JSON.stringify(updatedStateWithFavorites));
            return updatedStateWithFavorites;

        default:
            return state;
    }
};

const MyContext = createContext();

const MyProvider = ({ children }) => {
    const storedState = localStorage.getItem('appState');
    const initial = storedState ? { ...initialState, ...JSON.parse(storedState) } : initialState;

    const [state, dispatch] = useReducer(reducer, initial);

    return (
        <MyContext.Provider value={{ state, dispatch }}>
            {children}
        </MyContext.Provider>
    );
}


export { MyContext, MyProvider };
