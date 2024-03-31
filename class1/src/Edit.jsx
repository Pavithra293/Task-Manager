import { useState,useEffect} from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import "./Edit.css";

const Edit = ({ row, onCancel, onSubmit }) => {

  const style = { height: "23px", width: "23px", cursor: "pointer" };

  const [formState, setFormState] = useState({});
  const [initialFormState, setInitialFormState] = useState({}); 

  useEffect(() => {
    setFormState({
      title: row.title,
      desc: row.desc,
      team: row.team,
      assignee: row.assignee,
      priority: row.priority,
      status: row.status,
    });
    setInitialFormState({
      title: row.title,
      desc: row.desc,
      team: row.team,
      assignee: row.assignee,
      priority: row.priority,
      status: row.status,
    });
    }, [row]);
    
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = (e) => {
  e.preventDefault();
  const editedRow = { id: row.id, ...formState };
  onSubmit(editedRow); 
  onCancel(); 
};

    const handleReset = () => {
        setFormState(initialFormState);
        onCancel();
    };
    
 
  return (
    <>
      <div className="modal-container">
        <div className="modal">
          <div className="head">
            <h3>EDIT TASK</h3>
            <IoIosCloseCircleOutline style={style} onClick={onCancel} />
          </div>
          <form onSubmit={handleSubmit}>

            <div className="frm-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                value={formState.title}
                onChange={handleChange} disabled
              />
            </div>
            <div className="frm-group">
              <label htmlFor="desc">Description</label>
              <textarea
                name="desc"
                cols="30"
                rows="5"
                value={formState.desc}
                onChange={handleChange} disabled
              ></textarea>
            </div>
            <div className="frm-group">
              <label htmlFor="team">Team</label>
              <input
                type="text"
                name="team"
                value={formState.team}
                onChange={handleChange} disabled
              />
            </div>
            <div className="frm-group">
              <label htmlFor="assignee">Assignee</label>
              <input
                type="text"
                name="assignee"
                value={formState.assignee}
                onChange={handleChange} disabled
              />
            </div>
            <div className="frm-group">
              <div className="lline">
              <label htmlFor="priority">Priority:</label>
              <select
                name="priority"
                value={formState.priority}
                onChange={handleChange}
              >
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
              <div className='status'>
                <label htmlFor="status">Status:</label>
                <select
                name="status"
                value={formState.status}
                onChange={handleChange}
              >
                <option value="pending">Pending</option>
                <option value="inprogress">In progress</option>
                    <option value="completed">Completed</option>
                    <option value="deployed">Deployed</option>
                    <option value="deffered">Deffered</option>
              </select>
                </div>
              </div >
              </div>
            <div>
            <div className="btns">
            <button type="submit" className="btn" onSubmit={handleSubmit}>
              Submit
            </button>
            <button type="button" className="btn" onClick={handleReset}>
              Reset
            </button>
            </div>
            </div>
             </form>
        </div>
      </div>
    </>
  );
};

export default Edit;
