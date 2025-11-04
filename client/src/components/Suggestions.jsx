import Suggestion from './Suggestion'

const Suggestions = ({onClick, suggestions, isSuggestionsLoading}) => {

  return (
    <div
    className='overflow-y-scroll no-scrollbar flex flex-col items-center gap-y-4 h-[315px] mt-2 pt-2 font-[helvetica]'>
      
        {isSuggestionsLoading && (
          <div className='text-2xl tracking-tight text-slate-800'
          >Loading Suggestions...</div>
        )}

        {!isSuggestionsLoading && suggestions.map((suggestion) =>{
            return <Suggestion 
            mainText={suggestion.mainText}
            secondaryText={suggestion.secondaryText}
            key={suggestion.placeId}
            onClick={() =>{
              onClick(suggestion)
            }} 
            />
        })}
    </div>
  )
}

export default Suggestions
