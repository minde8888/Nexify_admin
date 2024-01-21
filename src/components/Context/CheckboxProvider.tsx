import React, { createContext, useState, ReactNode, FC, useContext } from 'react';
import { CheckboxError } from '../../errorHandler/checkboxError';

interface CategoryCheckboxProviderProps {
  children: ReactNode;
}

interface CategoryCheckboxContextType {
    checkedCategories: { [key: string]: boolean };
    setCheckedCategories: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>;
}

const CategoryCheckboxContext = createContext<CategoryCheckboxContextType | undefined>(undefined);

export const CategoryCheckboxProvider: FC<CategoryCheckboxProviderProps> = ({ children }) => {
    const [checkedCategories, setCheckedCategories] = useState<{ [key: string]: boolean }>({});

    return (
        <CategoryCheckboxContext.Provider value={{ checkedCategories, setCheckedCategories }}>
            {children}
        </CategoryCheckboxContext.Provider>
    );
};

export const useCheckboxContext = () => {
    const context = useContext(CategoryCheckboxContext);
    if (!context) {
        throw new CheckboxError('useCategoryCheckboxContext must be used within a CategoryCheckboxProvider');
    }
    return context;
};
