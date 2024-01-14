import '@mdxeditor/editor/style.css';
import {
  MDXEditor,
  UndoRedo,
  CodeToggle,
  CreateLink,
  toolbarPlugin,
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  linkPlugin,
  linkDialogPlugin,
  thematicBreakPlugin,
  frontmatterPlugin,
  codeBlockPlugin,
  codeMirrorPlugin,
  diffSourcePlugin,
  markdownShortcutPlugin,
  DiffSourceToggleWrapper,
  InsertCodeBlock,
  InsertTable,
  InsertThematicBreak,
  ListsToggle,
  BlockTypeSelect,
  tablePlugin,
  MDXEditorMethods

} from '@mdxeditor/editor';
import { useCallback, useEffect, useRef } from 'react';
import styles from './markdown.module.scss';

interface MyMdxEditorComponentProps {
  setContent: (value: string) => void;
  content: string;
  width?: string;
  index?: number;
  addContent?: (propertyIndex: number, content: string) => void;
}

const CustomToolbar = () => (
  <>
    <UndoRedo />
    <CodeToggle />
    <CreateLink />
    <InsertCodeBlock />
    <InsertTable />
    <InsertThematicBreak />
    <ListsToggle />
    <BlockTypeSelect />
    <DiffSourceToggleWrapper children={undefined} />
  </>
);

const useEditorPlugins = () => [
  toolbarPlugin({ toolbarContents: () => <CustomToolbar /> }),
  headingsPlugin(),
  listsPlugin(),
  quotePlugin(),
  linkPlugin(),
  tablePlugin(),
  linkDialogPlugin(),
  thematicBreakPlugin(),
  frontmatterPlugin(),
  codeBlockPlugin({ defaultCodeBlockLanguage: 'txt' }),
  codeMirrorPlugin({
    codeBlockLanguages: {
      js: 'JavaScript',
      css: 'CSS',
      txt: 'Text',
      tsx: 'TypeScript'
    }
  }),
  diffSourcePlugin({ viewMode: 'rich-text', diffMarkdown: '' }),
  markdownShortcutPlugin(),
];

const EnhancedMdxEditorComponent: React.FC<MyMdxEditorComponentProps> = ({
  setContent,
  content,
  width,
  addContent,
  index
}: MyMdxEditorComponentProps) => {

  const plugins = useEditorPlugins();
  const editorRef = useRef<MDXEditorMethods | null>(null);

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.focus();
    }
  }, [content]);

  const handleEditorChange = useCallback((newContent: string) => {
    setContent(newContent);
    if (addContent && index !== undefined) {
      addContent(index, newContent);
    }
  }, [addContent, index, setContent]);

  return (
    <div style={{ width: width }}>
      <MDXEditor
        ref={editorRef}
        key={content}
        className="dark-theme dark-editor"
        onChange={handleEditorChange}
        markdown={content}
        plugins={plugins}
        contentEditableClassName={styles.prose}
      />
    </div>
  );
};

export default EnhancedMdxEditorComponent;
