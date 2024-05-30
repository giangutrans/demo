
import React, { createContext, useContext, useState } from 'react';

interface LoadingContextType {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = createContext<LoadingContextType>({
    loading: false,
    setLoading: () => { }
});