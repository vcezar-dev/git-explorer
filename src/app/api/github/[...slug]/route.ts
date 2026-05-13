import { env } from '@/config/env';
import { NextRequest } from 'next/server';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ slug: string[] }> },
) {
    const { slug } = await params;
    const endpoint = slug.join('/');
    const { searchParams } = new URL(request.url);

    const url = new URL(`${env.GITHUB_API_URL}/${endpoint}`);
    searchParams.forEach((value, key) => url.searchParams.set(key, value));

    const response = await fetch(url.toString(), {
        headers: {
            Authorization: `Bearer ${env.GITHUB_TOKEN}`,
            Accept: 'application/vnd.github+json',
        },
        next: { revalidate: 60 },
    });

    const data = await response.json();
    return Response.json(data);
}
