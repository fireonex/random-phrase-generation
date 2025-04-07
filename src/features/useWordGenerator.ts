import {useState} from "react";

type Language = {
    code: string;
    name: string;
};
export const useWordGenerator = () => {
    const languages: Language[] = [
        {code: '', name: 'English'},
        {code: 'es', name: 'Spanish'},
        {code: 'it', name: 'Italian'},
        {code: 'fr', name: 'French'},
        {code: 'de', name: 'German'},
        {code: 'zh', name: 'Chinese'},
        {code: 'pt-br', name: 'Portuguese'},
    ];
    const [selectedLanguage, setSelectedLanguage] = useState<string>(languages[0].code);
    const [wordCount, setWordCount] = useState<number>(3);
    const [randomWords, setRandomWords] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const fetchRandomWords = async () => {
        setLoading(true);
        setError(null);

        try {
            const params = new URLSearchParams();
            params.set('number', Math.min(wordCount, 10).toString());
            if (selectedLanguage) params.set('lang', selectedLanguage);

            const response = await fetch(`https://random-word-api.herokuapp.com/word?${params.toString()}`);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(
                    errorData.error ||
                    errorData.details ||
                    `Request failed with status ${response.status}`
                );
            }

            const data: string[] = await response.json();

            if (!data || !Array.isArray(data)) {
                throw new Error('Invalid data format received');
            }

            setRandomWords(data.join(' '));
        } catch (err) {
            const message = err instanceof Error ? err.message : 'Unknown error occurred';
            setError(message);
            console.error('Fetch error:', err);
        } finally {
            setLoading(false);
        }
    };
    return {
        selectedLanguage,
        setSelectedLanguage,
        languages,
        wordCount,
        setWordCount,
        fetchRandomWords,
        loading,
        error,
        randomWords
    }
}