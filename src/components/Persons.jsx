const Persons = ({personSearch,personDelete}) => { 
    return(
     <div>
         {personSearch.length > 0 ?
         <ul>
           { personSearch.map((person,i) => 
            {
              return <li key={i}>{person.name}, {person.id} {person.number}<button onClick={() => personDelete(person.id)}>del</button></li>
         })}
         </ul>
        :'' 
        }

</div>
)
}


export default Persons