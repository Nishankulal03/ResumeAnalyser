interface SuggestionsProps {
  suggestions: string[];
}

export function Suggestions({ suggestions }: SuggestionsProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Improvement Suggestions</h2>
      <ul className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="flex items-start space-x-2">
            <span className="inline-block w-6 h-6 bg-blue-100 text-blue-800 rounded-full text-center leading-6 flex-shrink-0">
              {index + 1}
            </span>
            <span className="text-gray-700">{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}