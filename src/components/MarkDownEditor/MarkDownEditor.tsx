import React, { useEffect } from "react";
import MDEditor from '@uiw/react-md-editor';

interface MarkDownEditorProps {
  setContent: (value: string) => void;
  content: string | undefined;
  showEditor: boolean;
  addContent?: (propertyIndex: number, content: string) => void;
  index?: number;
}

const MarkDownEditor: React.FC<MarkDownEditorProps> = ({
  setContent,
  content,
  showEditor,
  addContent,
  index,
}) => {

  const handleChange = (newValue: string | undefined) => {
    if (typeof newValue !== 'undefined') {
      setContent(newValue);
      if (addContent && index)
        addContent(index, newValue);
    }
  };

  return (
    <div style={{ width: "95%" }}>
      {showEditor && (
        <div data-color-mode="light">
          <MDEditor
            value={content || ''}
            onChange={handleChange}
            textareaProps={{
              placeholder: "Please enter Markdown text"
            }}
          />
        </div>
      )}
    </div>
  );
};

export default MarkDownEditor;
