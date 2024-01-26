import React, { FC, ReactNode } from "react";
import { CategoryCheckboxProvider } from "./CheckboxProvider";
import { SelectFieldProvider } from "./SelectFieldProvider";
import { PaginationProvider } from "./PaginationProvider";


interface ComposeProvidersProps {
  children: ReactNode;
}

export const ComposeProviders: FC<ComposeProvidersProps> = ({ children }) => {
  return (
    <PaginationProvider>
      <SelectFieldProvider>
        <CategoryCheckboxProvider>
          {children}
        </CategoryCheckboxProvider>
      </SelectFieldProvider>
    </PaginationProvider>
  );
};
