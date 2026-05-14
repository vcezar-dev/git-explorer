import { RepoHeader } from '@/features/repo/components/repo-header';
import { RepoReadme } from '@/features/repo/components/repo-readme';
import { RepoLanguages } from '@/features/repo/components/repo-languages';
import { RepoContributors } from '@/features/repo/components/repo-contributors';

interface RepoPageProps {
    params: Promise<{ slug: string[] }>;
}

export default async function RepoPage({ params }: RepoPageProps) {
    const { slug } = await params;
    const [owner, name] = slug;

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            <RepoHeader owner={owner} name={name} />

            <div className="grid grid-cols-[1fr_300px] gap-8 mt-8">
                <div className="min-w-0">
                    <RepoReadme owner={owner} name={name} />
                </div>

                <aside className="flex flex-col gap-6">
                    <div>
                        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-3">
                            Languages
                        </p>
                        <RepoLanguages owner={owner} name={name} />
                    </div>

                    <div className="h-px bg-border" />

                    <div>
                        <p className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide mb-3">
                            Contributors
                        </p>
                        <RepoContributors owner={owner} name={name} />
                    </div>
                </aside>
            </div>
        </div>
    );
}
