type MDXProviderComponents = {
    [key: string]: { name: string };
};

export function convertMarkdownToHTML(markdown: string, components: MDXProviderComponents): string {
    const escapeHtml = (unsafe: string): string => unsafe.replace(/[&<"']/g, (match) => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', "'": '&#039;' }[match] || match));

    return markdown
        .split('\n')
        .map((line) => {
            // Replace &#x20; with normal spaces before processing
            line = line.replace(/&#x20;/g, ' ');

            if (!line.trim()) {
                return '';
            }

            // Escape HTML for non-code lines
            if (!line.startsWith('```')) {
                line = escapeHtml(line);
            }

            // Headers
            const headerMatch = line.match(/^(#{1,6}) (.+)/);
            if (headerMatch) {
                const level = headerMatch[1].length;
                return `<h${level} dir="ltr"><span data-lexical-text="true">${headerMatch[2]}</span></h${level}>`;
            }

            // Line Breaks
            if (line.endsWith('  ')) {
                line = line.substring(0, line.length - 2) + '<br />';
            }

            // Block Quotes
            const blockQuoteMatch = line.match(/^(>+) (.+)/);
            if (blockQuoteMatch) {
                return `<blockquote dir="ltr"><span data-lexical-text="true">${blockQuoteMatch[2]}</span></blockquote>`;
            }

            // Lists
            const ulMatch = line.match(/^(\*|-) (.+)/);
            if (ulMatch) {
                return `<ul><li value="1" class="_listitem_16kwi_69" dir="ltr"><span data-lexical-text="true">${ulMatch[2]}</span></li></ul>`;
            }
            const olMatch = line.match(/^(\d+)\. (.+)/);
            if (olMatch) {
                return `<ol><li value="1" class="_listitem_16kwi_69" dir="ltr"><span data-lexical-text="true">${olMatch[2]}</span></li></ol>`;
            }

            // Code Blocks and Inline Code
            if (line.startsWith('```')) {
                return `<div data-lexical-decorator="true" contenteditable="false"><div class="_sandpackWrapper_11eqz_364">${line.replace('```', '')}</div></div>`;
            }
            line = line.replace(/`([^`]+)`/g, `<code>$1</code>`);

            // Links and Images
            line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<a href='$2' rel="noreferrer" title="" dir="ltr"><span data-lexical-text="true">$1</span></a>`);
            line = line.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, `<img alt='$1' src='$2' dir="ltr"/>`);

            // Tables
            if (line.trim().startsWith('|')) {
                const cells = line
                    .split('|')
                    .slice(1, -1)
                    .map((cell) => `<td>${cell.trim()}</td>`);
                return `<tr>${cells.join('')}</tr>`;
            }

            // Paragraphs for other text
            return `<p dir="ltr"><span data-lexical-text="true">${line}</span></p>`;
        })
        .join('');
}
