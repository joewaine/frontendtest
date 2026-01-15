const Courses = ({ courses }) => { 
    return (
<div>
  <ul>
      {courses.map(course => <Course name={course.name} key={course.id} parts={course.parts}/>)}
    </ul>
    </div>
    )
}

const Course = ({ name, parts }) => { 

  return (
        <div>
        <div>
          <h1>{name}</h1>
        <ul>
          {parts.map( part => <li key={part.id}>{part.name} {part.exercises}  </li>)}
        </ul>
        <div>
          total exercises:
         {parts.reduce((total,item) => total + item.exercises, 0)}
        </div>
       </div>
        </div>
  )
}

export default Courses;