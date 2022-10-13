import { useContext, createContext } from "react";

export interface ContextProps {

}

export const Context = createContext({} as ContextProps);

export const UseAppContext = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("Context must be used within a Provider");
    }
    return context;
};

export function ContextProvider({ children }: any) {
    return (
        <Context.Provider value={{}}>
            {children}
        </Context.Provider>
    );
}