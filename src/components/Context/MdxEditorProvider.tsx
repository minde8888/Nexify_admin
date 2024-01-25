import React, { createContext, useState, useContext, ReactNode, FC } from 'react';
import '@mdxeditor/editor/style.css';
import { MdxEditorError } from '../../errorHandler/mdxEditorError';

interface MdxEditorProviderProps {
  children: ReactNode;
  initialContent?: string;  // Add initial content prop
}

interface MdxEditorContextType {
  content: string;
  setContent: (content: string) => void;
}

const MdxEditorContext = createContext<MdxEditorContextType | undefined>(undefined);

export const MdxEditorProvider: FC<MdxEditorProviderProps> = ({ children, initialContent = '' }) => {
  const [content, setContent] = useState<string>(initialContent);

  return (
    <MdxEditorContext.Provider value={{ content, setContent }}>
      {children}
    </MdxEditorContext.Provider>
  );
};

export const useMdxEditorContext = (): MdxEditorContextType => {
  const context = useContext(MdxEditorContext);
  if (!context) {
    throw new MdxEditorError('useMdxEditorContext must be used within a MdxEditorProvider');
  }
  return context;
};
