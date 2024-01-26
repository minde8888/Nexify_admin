type MDXProviderComponents = {
    [key: string]: { name: string };
};

export function convertMarkdownToHTML(markdown: string, components: MDXProviderComponents): string {
    // Function to escape HTML characters
    const escapeHtml = (unsafe: string): string =>
        unsafe.replace(/[&<"']/g, 
            match => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', "'": '&#039;' })[match] || match);

    // Split the markdown content by line and process each line
    return markdown.split('\n').map(line => {
        // Escape HTML characters, except in code blocks
        if (!line.startsWith('```')) {
            line = escapeHtml(line);
        }

        // Headers
        const headerMatch = line.match(/^(#{1,6}) (.+)/);
        if (headerMatch) {
            const level = headerMatch[1].length;
            return `<${components[`h${level}`]?.name || `h${level}`}>${headerMatch[2]}</${components[`h${level}`]?.name || `h${level}`}>`;
        }

        // Line Breaks
        if (line.endsWith('  ')) {
            line = line.substring(0, line.length - 2) + '<br />';
        }

        // Block Quotes
        const blockQuoteMatch = line.match(/^(>+) (.+)/);
        if (blockQuoteMatch) {
            return `<${components.blockquote?.name || 'blockquote'}>${blockQuoteMatch[2]}</${components.blockquote?.name || 'blockquote'}>`;
        }

        // Lists
        const ulMatch = line.match(/^(\*|-) (.+)/);
        if (ulMatch) {
            return `<${components.ul?.name || 'ul'}><${components.li?.name || 'li'}>${ulMatch[2]}</${components.li?.name || 'li'}></${components.ul?.name || 'ul'}>`;
        }
        const olMatch = line.match(/^(\d+)\. (.+)/);
        if (olMatch) {
            return `<${components.ol?.name || 'ol'}><${components.li?.name || 'li'}>${olMatch[2]}</${components.li?.name || 'li'}></${components.ol?.name || 'ol'}>`;
        }

        // Code Blocks and Inline Code
        if (line.startsWith('```')) {
            return line.replace('```', `<${components.pre?.name || 'pre'}><${components.code?.name || 'code'}>`) + `</${components.code?.name || 'code'}></${components.pre?.name || 'pre'}>`;
        }
        line = line.replace(/`([^`]+)`/g, `<${components.inlineCode?.name || 'code'}>$1</${components.inlineCode?.name || 'code'}>`);

        // Links and Images
        line = line.replace(/\[([^\]]+)\]\(([^)]+)\)/g, `<${components.a?.name || 'a'} href='$2'>$1</${components.a?.name || 'a'}>`);
        line = line.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, `<${components.img?.name || 'img'} alt='$1' src='$2'/>`);

        // Tables
        if (line.trim().startsWith('|')) {
            const cells = line.split('|').slice(1, -1).map(cell => cell.trim());
            return `<tr>${cells.map(cell => `<td>${cell}</td>`).join('')}</tr>`;
        }

        // Paragraphs for other text
        return `<${components.p?.name || 'p'}>${line}</${components.p?.name || 'p'}>`;
    }).join('');
}
