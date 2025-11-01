import { useCallback, useEffect, useState } from "react"
import { getSuggestions } from "../api/user.api"
import PanelButton from "../components/PanelButton"
import SearchField from "../components/SearchField"
import Suggestions from "../components/Suggestions"

const UserSearchPanel = ({pickup, destination, setPickup, setDestination, searchPanelClickHandler, submitButtonHandler, focusedOn}) => {

  const [suggestions, setSuggestions] = useState([])
  const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false)
  const [input, setInput] = useState("")

  const fetchData = useCallback(async (input) =>{
    try {
      const response = await getSuggestions(input)
      const suggestionsData = response.map((suggestion) =>{
        return {
          description: suggestion.description,
          place_id: suggestion.place_id
        }
      })
      console.log(suggestionsData)
      setSuggestions(suggestionsData)

    } catch (error) {
      setSuggestions([])
      console.log(error)

    } finally {
      setIsSuggestionsLoading(false)
    }
  }, [])

  useEffect(() =>{

    if(input.length > 1000){
      setIsSuggestionsLoading(true)
      
      const delay = setTimeout(() =>{
        fetchData(input)
      }, 800)
      
      return () => clearTimeout(delay)
    } 
    
    else {
      setSuggestions([])
      setIsSuggestionsLoading(false)
    }
    
  }, [input, fetchData])

  const inputHandler= async (e) =>{
    const {name, value} = e.target

    if(name === "pickup") setPickup(value)
    else if(name === "destination") setDestination(value)

    setInput(value)
  }

  return (
    <>
        <div className='absolute transform rotate-90 w-23 h-[3px] bg-slate-500 rounded-full top-36 left-1'></div>

        <div className='h-44 flex flex-col mx-auto justify-evenly'>

          <SearchField 
          label="Enter Pickup" 
          name="pickup" 
          value={pickup} 
          onChange={inputHandler} 
          onClick={searchPanelClickHandler}/>

          <SearchField 
          label="Enter Destination" 
          name="destination"
          value={destination} 
          onChange={inputHandler} 
          onClick={searchPanelClickHandler}/>
        </div>

        <Suggestions
          suggestions={suggestions}
          isSuggestionsLoading={isSuggestionsLoading}
          onClick={(description) =>{
            if(focusedOn === "pickup"){
              setPickup(description)

            } else if(focusedOn === "destination"){
              setDestination(description)
            }
          }}        
        />

        <div
        className='absolute bottom-7 w-screen flex justify-center'>
          <PanelButton 
          buttonName={(pickup && destination) ? "Choose a Vehicle" : (!pickup && !destination) ? "Enter Pickup & Destination" : !pickup ? "Enter Pickup" : "Enter Destination"}
          disabled={!pickup || !destination}
          onClick={submitButtonHandler} 
          />
        </div>
    
    </>
  )
}

export default UserSearchPanel
