import React from 'react'
import noteContext from '../context/notes/noteContext'


const About = () => {
const a = React.useContext(noteContext);

  return (
    <div>this is about {a.name} and he is in class {a.class}</div>
  )
}

export default About