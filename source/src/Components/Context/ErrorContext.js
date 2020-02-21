import React, {useState, createContext } from 'react'

export const ErrorContext = createContext();

export default function ErrorDisplayBoundry({children}){
  const [error, setError] = useState(null);
  
  // const ctx = useMemo(() => ({error, setError}, [error]));
  
  return <ErrorContext.Provider value={{error, setError}}>{children}</ErrorContext.Provider>
}