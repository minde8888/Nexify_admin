export function convertMarkdownToHTML(markdown: string, components: MDXProviderComponents): string {
    return markdown
        .split('\n')
        .map((line) => {
            // Headers
            if (line.startsWith('###### ')) return `<${components.h6?.name ?? 'h6'}>${line.substring(7)}</${components.h6?.name ?? 'h6'}>`;
            if (line.startsWith('##### ')) return `<${components.h5?.name ?? 'h5'}>${line.substring(6)}</${components.h5?.name ?? 'h5'}>`;
            if (line.startsWith('#### ')) return `<${components.h4?.name ?? 'h4'}>${line.substring(5)}</${components.h4?.name ?? 'h4'}>`;
            if (line.startsWith('### ')) return `<${components.h3?.name ?? 'h3'}>${line.substring(4)}</${components.h3?.name ?? 'h3'}>`;
            if (line.startsWith('## ')) return `<${components.h2?.name ?? 'h2'}>${line.substring(3)}</${components.h2?.name ?? 'h2'}>`;
            if (line.startsWith('# ')) return `<${components.h1?.name ?? 'h1'}>${line.substring(2)}</${components.h1?.name ?? 'h1'}>`;

            // Bold and italic
            line = line
                .replace(/\*\*(.*)\*\*/gim, `<${components.strong?.name ?? 'strong'}>$1</${components.strong?.name ?? 'strong'}>`)
                .replace(/\*(.*)\*/gim, `<${components.em?.name ?? 'em'}>$1</${components.em?.name ?? 'em'}>`);

            // Blockquotes
            if (line.startsWith('>')) return `<${components.blockquote?.name ?? 'blockquote'}>${line.substring(1).trim()}</${components.blockquote?.name ?? 'blockquote'}>`;

            // Lists
            if (line.match(/^\d\./))
                return `<${components.ol?.name ?? 'ol'}><${components.li?.name ?? 'li'}>${line.substring(2).trim()}</${components.li?.name ?? 'li'}></${components.ol?.name ?? 'ol'}>`;
            if (line.startsWith('- '))
                return `<${components.ul?.name ?? 'ul'}><${components.li?.name ?? 'li'}>${line.substring(2).trim()}</${components.li?.name ?? 'li'}></${components.ul?.name ?? 'ul'}>`;

            // Code blocks
            if (line.startsWith('```'))
                return `<${components.pre?.name ?? 'pre'}><${components.code?.name ?? 'code'}>${line.replace('```', '')}</${components.code?.name ?? 'code'}></${components.pre?.name ?? 'pre'}>`;

            // Inline code
            line = line.replace(/`(.+?)`/gim, `<${components.inlineCode?.name ?? 'code'}>$1</${components.inlineCode?.name ?? 'code'}>`);

            // Links
            line = line.replace(/\[(.*?)\]\((.*?)\)/gim, `<${components.a?.name ?? 'a'} href='$2'>$1</${components.a?.name ?? 'a'}>`);

            // Images
            line = line.replace(/!\[(.*?)\]\((.*?)\)/gim, `<${components.img?.name ?? 'img'} alt='$1' src='$2' />`);

            // Paragraphs
            return `<${components.p?.name ?? 'p'}>${line}</${components.p?.name ?? 'p'}>`;
        })
        .join('');
}
