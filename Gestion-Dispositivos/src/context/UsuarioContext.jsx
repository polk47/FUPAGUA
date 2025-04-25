import React, { createContext, useState } from "react";

export const UsuarioContext = createContext();

const UsuarioProvider = ({ children }) => {
  const [usuario, setUser] = useState(null);
  const [usuarioActual, setUsuarioActual] = useState(null); 

  const updateUsuario = (usuarioData) => {
    setUser(usuarioData);
    setUsuarioActual(usuarioData); 
  };

  const clearUsuario = () => {
    setUser(null);
    setUsuarioActual(null); 
  };

  return (
    <UsuarioContext.Provider value={{ usuario, usuarioActual, updateUsuario, clearUsuario }}>
      {children}
    </UsuarioContext.Provider>
  );
};

export { UsuarioProvider };