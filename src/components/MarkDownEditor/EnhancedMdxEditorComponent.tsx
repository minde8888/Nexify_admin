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
import { FC, useCallback, useEffect, useRef } from 'react';
import styles from './markdown.module.scss';
import { useMdxEditorContext } from '../Context/MdxEditorProvider';

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

interface MdxEditorComponentProps {
  width?: string;
  initialContent?: string;
}

const EnhancedMdxEditorComponent: FC<MdxEditorComponentProps> = ({ width, initialContent = '' }) => {
  const { content, setContent } = useMdxEditorContext();
  const plugins = useEditorPlugins();
  const editorRef = useRef<MDXEditorMethods | null>(null);

  useEffect(() => {
    
    if (content !== initialContent) {
      setContent(initialContent);
    }

    editorRef.current?.focus();
  }, [initialContent, setContent, content]);

  const handleEditorChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, [setContent]);

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

