import Suggestion from './Suggestion'

const Suggestions = ({onClick, suggestions, isSuggestionsLoading}) => {

  return (
    <div
    className='overflow-y-auto no-scrollbar flex flex-col items-center gap-y-3 h-80 mt-4 font-[helvetica]'>
      
        {isSuggestionsLoading && (
          <div className='text-2xl tracking-tight text-slate-800'
          >Loading Suggestions...</div>
        )}

        {!isSuggestionsLoading && suggestions.map((suggestion) =>{
            return <Suggestion 
            description={suggestion.description}
            key={suggestion.place_id}
            onClick={() =>{
              onClick(suggestion.description)
            }} 
            />
        })}
    </div>
  )
}

export default Suggestions
