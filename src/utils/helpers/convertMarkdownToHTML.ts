type MDXProviderComponents = {
    [key: string]: { name: string };
};

export function convertMarkdownToHTML(markdown: string, components: MDXProviderComponents): string {
    const escapeHtml = (unsafe: string): string =>
        unsafe.replace(/[&<"']/g, 
            match => ({ '&': '&amp;', '<': '&lt;', '"': '&quot;', "'": '&#039;' })[match] || match);

    return markdown
        .split('\n')
        .map((line) => {
            line = escapeHtml(line);

            // Headers
            const headerMatch = line.match(/^(#{1,6}) (.*)/);
            if (headerMatch) {
                const tag = `h${headerMatch[1].length}`;
                return `<${components[tag]?.name || tag}>${headerMatch[2]}</${components[tag]?.name || tag}>`;
            }

            // Task Lists
            if (line.match(/^\s*-\s*\[.\]\s*/)) {
                const isChecked = line.includes('[x]');
                return `<${components.li?.name || 'li'} class="task-list-item${isChecked ? ' checked' : ''}">${line}</${components.li?.name || 'li'}>`;
            }

            // Bold, Italic
            line = line.replace(/(\*\*|__)(.*?)\1/g, `<${components.strong?.name || 'strong'}>$2</${components.strong?.name || 'strong'}>`)
                       .replace(/(\*|_)(.*?)\1/g, `<${components.em?.name || 'em'}>$2</${components.em?.name || 'em'}>`);

            // Blockquotes
            if (line.startsWith('>')) return `<${components.blockquote?.name || 'blockquote'}>${line.substring(1).trim()}</${components.blockquote?.name || 'blockquote'}>`;

            // Ordered Lists
            const orderedListMatch = line.match(/^\d+\.\s*(.*)/);
            if (orderedListMatch) {
                return `<${components.ol?.name || 'ol'}><${components.li?.name || 'li'}>${orderedListMatch[1]}</${components.li?.name || 'li'}></${components.ol?.name || 'ol'}>`;
            }

            // Unordered Lists
            if (line.startsWith('- ')) return `<${components.ul?.name || 'ul'}><${components.li?.name || 'li'}>${line.substring(2).trim()}</${components.li?.name || 'li'}></${components.ul?.name || 'ul'}>`;

            // Code Blocks, Inline Code
            if (line.startsWith('```')) return `<${components.pre?.name || 'pre'}><${components.code?.name || 'code'}>${line.replace('```', '')}</${components.code?.name || 'code'}></${components.pre?.name || 'pre'}>`;
            line = line.replace(/`(.+?)`/g, `<${components.inlineCode?.name || 'code'}>$1</${components.inlineCode?.name || 'code'}>`);

            // Links
            line = line.replace(/\[(.*?)\]\((.*?)\)/g, `<${components.a?.name || 'a'} href='$2'>$1</${components.a?.name || 'a'}>`);

            // Images
            line = line.replace(/!\[(.*?)\]\((.*?)\)/g, `<${components.img?.name || 'img'} alt='$1' src='$2' />`);

            // Paragraphs
            return `<${components.p?.name || 'p'}>${line}</${components.p?.name || 'p'}>`;
        })
        .join('');
}
