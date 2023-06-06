import React, { createContext, useContext } from "react";

const themeContext = createContext({});

export default themeContext;
export const useTheme = ( )  => useContext(themeContext)
    