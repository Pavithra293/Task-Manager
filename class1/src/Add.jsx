
import { useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./Add.css"

const Add = ({ closeModal, onSubmit }) => {

    const [errors, setErrors] = useState("");

    const validateForm = () => {
        if (formState.title && formState.desc && formState.team && formState.assignee) {
            setErrors("")
            closeModal();
            return true;
        }
        else {
            let errorFields = [];
            for (const [key, value] of Object.entries(formState))
                if (key!="btn" && !value) {
                    
                    errorFields.push(key);

                }
            setErrors(errorFields.join(","));
            return false;
        }
    }

    const style = { height: "23px", width: "23px", cursor: "pointer" }
    
    const [formState, setFormState] = useState({
        title: "",
        desc: "",
        team: "",
        assignee: "",
        priority: "P1",
        status: "pending",
        btn: ""
    })

    const handleChange = (e) => {
        setFormState({
         ...formState, [e.target.name]:e.target.value  
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            onSubmit(formState);
            closeModal();
            console.log("Form submitted successfully");
        }
        else {
            return;
        }
        
    }
    
    return (
        <>
                <div className="modal-container">
                    <div className="modal">
                        <div className="head">
                            <h3>CREATE A TASK</h3>
                            < IoIosCloseCircleOutline style={style} onClick={closeModal} />
                        </div>
                        <form autocomplete="off" onSubmit={handleSubmit}>
                            <div className='form-group'>
                                <label htmlFor="title">Title</label>
                                <input type="text" name="title" value={formState.title} onChange={handleChange} />
                            </div>
                            <div className='form-group'>
                                <label htmlFor="desc">Description</label>
                            <textarea name="desc" id="" cols="30" rows="5" value={formState.desc} onChange={handleChange}></textarea>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="team">Team</label>
                                <input type="text" name="team" value={formState.team} onChange={handleChange}/>
                            </div>
                            <div className='form-group'>
                                <label htmlFor="Assignee">Asignee</label>
                                <input type="text" name="assignee" value={formState.assignee} onChange={handleChange}/>
                            </div>
            
                            <div className="form-group pr" >
                                <label htmlFor="priority">Priority</label>
                                <select name="priority" value={formState.priority} onChange={handleChange}>
                                    <option value="P0">P0</option>
                                    <option value="P1">P1</option>
                                    <option value="P2">P2</option>
                            </select>
                           
                        </div>
                        <div className="form-group">
                             {errors && <div className="error">{ `Please include: ${errors}`}</div>}
                        </div>
                            <div className="btm">
                            
                                <button type="submit" className='bbtn' >Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </>
  )
}

export default Add;
