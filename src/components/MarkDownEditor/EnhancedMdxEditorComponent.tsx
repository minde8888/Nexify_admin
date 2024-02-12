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
  tablePlugin

} from '@mdxeditor/editor';
import { useCallback } from 'react';
import styles from './markdown.module.scss';

interface MdxEditorComponentProps {
  setContent: (value: string) => void;
  content: string;
  width?: string;
  index?: number;
  addContent?: (propertyIndex: number, content: string) => void;
  componentKey?: number;
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

const EnhancedMdxEditorComponent: React.FC<MdxEditorComponentProps> = ({
  setContent,
  content,
  width,
  addContent,
  index,
  componentKey
}: MdxEditorComponentProps) => {

  const plugins = useEditorPlugins();

  const handleEditorChange = useCallback((newContent: string) => {
    setContent(newContent);
    if (addContent && index !== undefined) {
      addContent(index, newContent);
    }
  }, [addContent, index, setContent]);

  return (
    <div style={{ width: width }}>
      <MDXEditor
        key={componentKey}
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