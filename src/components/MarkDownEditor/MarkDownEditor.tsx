import React, { useCallback } from "react";
import MDEditor from '@uiw/react-md-editor';

interface MarkDownEditorProps {
  setContent: (value: string) => void;
  content: string | undefined;
  showEditor: boolean;
  addContent?: (propertyIndex: number, content: string) => void;
  index?: number;
  width?: string;
  editorHeight?: number; 
}

const MarkDownEditor: React.FC<MarkDownEditorProps> = ({
  setContent,
  content,
  showEditor,
  addContent,
  index,
  width,
  editorHeight
}) => {
  const handleChange = useCallback((newValue: string | undefined) => {
    if (typeof newValue === 'undefined') return;

    setContent(newValue);

    if (addContent && index !== undefined) {
      addContent(index, newValue);
    }
  }, [addContent, index, setContent]);

  return (
    <div style={{ width: width }}>
      {showEditor && (
        <div data-color-mode="light">
          <MDEditor
            value={content}
            onChange={handleChange}
            textareaProps={{
              placeholder: "Please enter Markdown text"
            }}
            height={editorHeight}
          />
        </div>
      )}
    </div>
  );
};

export default MarkDownEditor;
