
const Filter = ({personSearch,handlePersonSearch}) => { 
    return(
     <form>
        <div>
  
        filter shown with: <input onChange={handlePersonSearch} /><br/>
        </div>

      </form>
)
}

export default Filter