import React, { FC, ReactNode } from "react";
import { CheckboxProvider } from "./checkboxProvider";
import { SelectFieldProvider } from "./selectFieldProvider";
import { PaginationProvider } from "./paginationProvider";


interface ComposeProvidersProps {
  children: ReactNode;
}

export const ComposeProviders: FC<ComposeProvidersProps> = ({ children }) => {
  return (
    <PaginationProvider>
      <SelectFieldProvider>
        <CheckboxProvider>
          {children}
        </CheckboxProvider>
      </SelectFieldProvider>
    </PaginationProvider>
  );
};
