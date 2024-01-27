import { useEffect, useState } from "react";
import { convertMarkdownToHTML } from "../utils/helpers/convertMarkdownToHTML";

const useMarkdownRenderer = (markdown: string, components: MDXProviderComponents): string => {
    const [html, setHtml] = useState('');

    useEffect(() => {
        const htmlText = convertMarkdownToHTML(markdown, components);
        setHtml(htmlText);
    }, [markdown, components]);

    return html;
};

export default useMarkdownRenderer;