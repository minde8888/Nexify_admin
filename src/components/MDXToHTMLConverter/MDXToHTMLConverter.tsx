import { FC, HTMLAttributes, useMemo } from 'react';
import { MDXProvider } from '@mdx-js/react';
import { getMDXComponent } from 'mdx-bundler/client';

interface MyMDXContentProps {
    mdxString: string;
}

const CustomHeading: FC<HTMLAttributes<HTMLHeadingElement>> = ({ children, ...props }) => {
    if (!children) return null;
  
    return (
      <h1 {...props} style={{ ...props.style, color: 'blue', fontSize: '24px' }}>
        {children}
      </h1>
    );
  };
  

const MDXToHTMLConverter: FC<MyMDXContentProps> = ({ mdxString }) => {
    const MDXContent = useMemo(() => getMDXComponent(mdxString), [mdxString]);

    const components = {
        h1: CustomHeading,
    };

    return (
        <MDXProvider components={components}>
            <MDXContent />
        </MDXProvider>
    );
};

export default MDXToHTMLConverter;
