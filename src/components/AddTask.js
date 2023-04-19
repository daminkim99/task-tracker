import { useState } from "react"

const AddTask = ({onAdd}) => {
    //controlled component, meaning we override the default behavior of the form 
    //now state is owned and operated by react instead being operated natively by the form 
    const[text, setText]=useState('')
    const[day, setDay]=useState('')
    const[reminder, setReminder]=useState(false)

    const onSubmit=(e) => {
        e.preventDefault()

        if(!text){
            alert('Please add a task')
            return
        }
        //calling onAdd 
        onAdd({text, day, reminder})
        //reset the state of all the form back to empty
        setText('')
        setDay('')
        setReminder(false)
    }

  return (
    //for ex , the default value for the form would be whatever text we put in but instead  we're taking that 
    //out of the input boxes control and assigning it to the state , value will be the  text value of the state currently is 
    //in order to trigger the change, add onChange
    <form className="add-form" onSubmit={onSubmit}>
        <div className="form-control">
            <label>Task</label>
            <input 
            type="text" 
            placeholder="Add Task"
            value= {text} 
            onChange={(e)=> setText(e.target.value)}
             />
        </div>
        <div className="form-control">
            <label>Day & Time</label>
            <input 
            type="text" 
            placeholder="Add Day & Time"
            value= {day} 
            onChange={(e)=> setDay(e.target.value)} />
        </div>
        <div className="form-contro form-contro-check">
            <label>Set Reminder</label>
            <input 
            type="checkbox"
            checked={reminder}
            value= {reminder} 
            onChange={(e)=> setReminder(e.currentTarget.checked)} />
        </div>
        <input type="submit" value="Save Task" className='btn btn-block'/>
    </form>
  )
}

export default AddTask