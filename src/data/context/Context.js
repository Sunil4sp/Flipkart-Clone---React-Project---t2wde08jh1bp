import { createContext, useState } from "react";

export const AccountContext = createContext(null);

const Context = ({children}) => {
    const [userAccount, setUserAccount] = useState('');
    return (
        <AccountContext.Provider value={{userAccount, setUserAccount }}>
            {children}
        </AccountContext.Provider>
    )
}

export default Context;