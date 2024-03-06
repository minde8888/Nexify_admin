import React, { createContext, useState, ReactNode, FC, useContext } from 'react';
import { CheckboxError } from '../errorHandler/checkboxError';

interface CheckboxProviderProps {
    children: ReactNode;
}

interface CheckboxContextType {
    checked: { [key: string]: boolean };
    setChecked: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
    resetChecked: () => void;
}

const CheckboxContext = createContext<CheckboxContextType | undefined>(undefined);

export const CheckboxProvider: FC<CheckboxProviderProps> = ({ children }) => {
    const [checked, setChecked] = useState<{ [key: string]: boolean }>({});

    const resetChecked = () => {
        setChecked({});
    };

    return (
        <CheckboxContext.Provider value={{
            checked,
            setChecked,
            resetChecked
        }}>
            {children}
        </CheckboxContext.Provider>
    );
};

export const useCheckboxContext = () => {
    const context = useContext(CheckboxContext);
    if (!context) {
        throw new CheckboxError('useCheckboxContext must be used within a CheckboxProvider');
    }
    return context;
};
