'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { useRepoReadme } from '../api/get-repo';

interface RepoReadmeProps {
    owner: string;
    name: string;
}

function decodeBase64(base64: string): string {
    const binary = atob(base64.replace(/\n/g, ''));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
        bytes[i] = binary.charCodeAt(i);
    }
    return new TextDecoder('utf-8').decode(bytes);
}

export function RepoReadme({ owner, name }: RepoReadmeProps) {
    const { data, isLoading } = useRepoReadme(owner, name);

    if (isLoading) {
        const widths = ['95%', '80%', '70%', '90%', '75%', '85%', '60%', '88%'];
        return (
            <div className="flex flex-col gap-3">
                {widths.map((width, i) => (
                    <div
                        key={i}
                        className="h-4 bg-secondary rounded animate-pulse"
                        style={{ width }}
                    />
                ))}
            </div>
        );
    }

    if (!data)
        return (
            <p className="text-sm text-muted-foreground">No README found.</p>
        );

    const content = decodeBase64(data.content);

    return (
        <div
            className="min-w-0 overflow-hidden prose prose-sm dark:prose-invert max-w-none
            prose-headings:text-foreground
            prose-p:text-muted-foreground
            prose-a:text-[var(--accent-blue)]
            prose-code:text-foreground
            prose-code:bg-secondary
            prose-code:px-1
            prose-code:py-0.5
            prose-code:rounded
            prose-pre:bg-secondary
            prose-pre:border
            prose-pre:border-border
            prose-pre:overflow-x-auto
            prose-blockquote:border-l-[var(--accent-blue-border)]
            prose-blockquote:text-muted-foreground
            prose-strong:text-foreground
            prose-li:text-muted-foreground
            prose-hr:border-border
            prose-table:text-muted-foreground
            prose-th:text-foreground
            prose-img:rounded-lg
            prose-img:max-w-full
        "
        >
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    td: ({ vAlign, ...props }) => <td {...props} />,
                    th: ({ vAlign, ...props }) => <th {...props} />,
                    table: ({ children }) => (
                        <div className="overflow-x-auto w-full my-4">
                            <table className="w-full">{children}</table>
                        </div>
                    ),
                    img: ({ src, alt }) => {
                        const resolvedSrc =
                            src && !src.startsWith('http')
                                ? `https://raw.githubusercontent.com/${owner}/${name}/HEAD/${src.replace(/^\//, '')}`
                                : src;

                        return (
                            <img
                                src={resolvedSrc}
                                alt={alt}
                                className="rounded-lg max-w-full h-auto"
                                loading="lazy"
                            />
                        );
                    },
                }}
            >
                {content}
            </ReactMarkdown>
        </div>
    );
}
