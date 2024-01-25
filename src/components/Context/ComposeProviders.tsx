import React, { FC, ReactNode } from "react";
import { CategoryCheckboxProvider } from "./CheckboxProvider";
import { SelectFieldProvider } from "./SelectFieldContext";
import { PaginationProvider } from "./PaginationContext";
import { MdxEditorProvider } from "./MdxEditorProvider";

interface ComposeProvidersProps {
  children: ReactNode;
}

export const ComposeProviders: FC<ComposeProvidersProps> = ({ children }) => {
  return (
    <PaginationProvider>
      <MdxEditorProvider>
        <SelectFieldProvider>
          <CategoryCheckboxProvider>
            {children}
          </CategoryCheckboxProvider>
        </SelectFieldProvider>
      </MdxEditorProvider>
    </PaginationProvider>
  );
};
