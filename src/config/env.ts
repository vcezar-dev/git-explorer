import * as z from 'zod';

const createEnv = () => {
    const EnvSchema = z.object({
        GITHUB_TOKEN: z.string(),
        GITHUB_API_URL: z.string(),
    });

    const envVars = {
        GITHUB_TOKEN: process.env.GITHUB_TOKEN,
        GITHUB_API_URL: process.env.GITHUB_API_URL,
    };

    const parsedEnv = EnvSchema.safeParse(envVars);

    if (!parsedEnv.success) {
        throw new Error(
            `Invalid env provided.
  The following variables are missing or invalid:
  ${Object.entries(parsedEnv.error.flatten().fieldErrors)
      .map(([k, v]) => `- ${k}: ${v}`)
      .join('\n')}
  `,
        );
    }

    return parsedEnv.data ?? {};
};

export const env = createEnv();
