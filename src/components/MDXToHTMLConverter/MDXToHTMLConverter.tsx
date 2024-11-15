import useMarkdownRenderer from '../../hooks/useMarkdownRenderer';

interface MarkdownComponentProps{
  mdxString: string;
}

const MDXToHTMLConverter  = ({mdxString}:MarkdownComponentProps) => {

  const customComponents = {
    h1: (props: any) => <h1 style={{ color: 'black' }} {...props}>{props.children}</h1>,
  };

  const renderedHTML = useMarkdownRenderer(mdxString, customComponents);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: renderedHTML }} />
    </div>
  );
};

export default MDXToHTMLConverter;
