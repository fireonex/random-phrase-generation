import type {NextApiRequest, NextApiResponse} from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const number = parseInt(req.query.number as string) || 3;
    const lang = req.query.lang as string || '';

    console.log(`Fetching ${number} words in ${lang || 'English'}`);

    try {
        const apiUrl = new URL('https://random-word-api.vercel.app/api');
        apiUrl.searchParams.set('words', number.toString());
        if (lang) apiUrl.searchParams.set('lang', lang);

        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 5000);

        const apiResponse = await fetch(apiUrl.toString(), {
            signal: controller.signal
        });
        clearTimeout(timeout);

        if (!apiResponse.ok) {
            throw new Error(`External API error: ${apiResponse.status}`);
        }

        const data = await apiResponse.json();

        if (!Array.isArray(data)) {
            throw new Error('Invalid API response format');
        }

        res.status(200).json(data);
    } catch (error) {
        console.error('API Route Error:', error);
        res.status(500).json({
            error: 'Failed to fetch words',
            details: error instanceof Error ? error.message : 'Unknown error'
        });
    }
}