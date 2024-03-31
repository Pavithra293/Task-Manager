import {useState} from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";

import DeleteConfirmation from './DeleteConfirmation';

import './Task.css'
const Task = ({ row, onDelete, onEdit }) => {
  
    const style = {
        backgroundColor: '#084d7a',
        height: '20px',
        width: '20px',
        padding: '5px',
        borderRadius: '2px',
      color: 'white',
  }

  const handleEdit = () => {
    onEdit(row);
  };

  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleConfirmDelete = () => {
    onDelete(row.id);
    setShowDeleteConfirmation(false);
  };

  
  const [open, setOpen] = useState(false);
    return (
        <>
      <div className='contain'>
          <div className="top">
                    <p>{row.title}</p>
                    <p className='pri'>{ row.priority}</p>
            
          </div>
          <div className="desc">
            <p>{row.desc}</p>
          </div>
          <div className="asign">
            <p className='asig'>{row.assignee}</p>
            <div className="menu-trigger"  onClick={()=>{setOpen(!open)}}>
              <BsThreeDotsVertical style={style} />
              {showDeleteConfirmation && (
                <DeleteConfirmation
                  taskTitle={row.title}
                onCancel={handleCancelDelete}
                onConfirm={handleConfirmDelete}
              />
            )}
            
            <div className={`dropdown-menu ${open ? 'active':'inactive'}`}>
              <ul>
                  <DropdownItem handleDeleteClick={handleDeleteClick} handleEdit={handleEdit}/>
              </ul>
              </div>
              </div>
          </div>
          <button className='lbtn' onClick={handleDeleteClick}>{row.btn}</button>
        </div>
      </>
  )
}

function DropdownItem({ handleDeleteClick,handleEdit }) {
  return (
    <li className="dropdownItem">
      <p onClick={handleEdit}>Edit</p>
      <p onClick={handleDeleteClick}>Delete</p>
    </li>
  )
}

export default Task;
