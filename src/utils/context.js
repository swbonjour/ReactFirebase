import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useReducer } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";
import { auth } from './firebaseAuth';

export const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
        });

        return () => {
            unsub();
        }
    }, []);

    return (
        <AuthContext.Provider value={{currentUser}}>
            {children}
        </AuthContext.Provider>
    )
}

export const ChatContext = createContext();
export const ChatContextProvider = ({children}) => {
    const { currentUser } = useContext(AuthContext);
    const initialState = {
        chatId: 'null',
        user: {}
    }

    const chatReducer = (state, action) => {
        switch(action.type) {
            case "CHANGE_USER":
                return {
                   user: action.payload,
                   chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(chatReducer, initialState);

    return (
        <ChatContext.Provider value={{data: state, dispatch}}>
            {children}
        </ChatContext.Provider>
    )
}