import {useWordGenerator} from "@/features/useWordGenerator";


export const WordGenerator = () => {

    const {
        selectedLanguage,
        setSelectedLanguage,
        languages,
        wordCount,
        setWordCount,
        fetchRandomWords,
        loading,
        error,
        randomWords
    } = useWordGenerator()

    return (
        <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
            <div className="p-6 border-2 border-gray-700 rounded-xl shadow-lg bg-gray-800 w-full max-w-md">
                <h1 className="text-2xl font-bold mb-6 text-center">Random Text Generator</h1>

                <div className="mb-4">
                    <label htmlFor="language-select" className="block text-sm font-medium mb-2">
                        Select Language:
                    </label>
                    <select
                        id="language-select"
                        value={selectedLanguage}
                        onChange={(e) => setSelectedLanguage(e.target.value)}
                        className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {languages.map((lang) => (
                            <option key={lang.code || 'en'} value={lang.code}>
                                {lang.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-6">
                    <label htmlFor="word-count-select" className="block text-sm font-medium mb-2">
                        Number of words (3-6):
                    </label>
                    <select
                        id="word-count-select"
                        value={wordCount}
                        onChange={(e) => setWordCount(Number(e.target.value))}
                        className="w-full p-2 border border-gray-600 rounded-md bg-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                        {[3, 4, 5, 6].map((count) => (
                            <option key={count} value={count}>
                                {count}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    onClick={fetchRandomWords}
                    disabled={loading}
                    className={`w-full py-2 px-4 rounded-md transition-colors ${
                        loading
                            ? 'bg-gray-600 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                    }`}
                >
                    {loading ? 'Generating...' : 'Generate Words'}
                </button>

                {error && (
                    <div className="mt-4 p-3 bg-red-900 text-red-100 rounded-md">
                        {error}
                    </div>
                )}

                {randomWords && (
                    <div className="mt-4 p-4 bg-gray-700 rounded-md">
                        <h2 className="font-semibold mb-2">Generated Text:</h2>
                        <p className="break-words">{randomWords}</p>
                    </div>
                )}
            </div>
        </div>
    );
};