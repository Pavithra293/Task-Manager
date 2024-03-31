import React from 'react';
import "./DeleteConfirmation.css"
import { IoIosCloseCircleOutline } from "react-icons/io";

const DeleteConfirmation = ({taskTitle, onCancel, onConfirm }) => {
        const style = { height: "23px", width: "23px" ,cursor:"pointer"}

    return (
      <>
      <div className="mdlc">
                <div className="mdl">
                    <div className="head">
                        <h3>DELETE TASK</h3>
                        < IoIosCloseCircleOutline style={style} onClick={onCancel} />
                    </div>
                    <div className="qn">
                        <p className='ques'>Do you wish to delete Task? </p>
                    </div>
                    <div className="con">
                        {taskTitle}
                    <div className="confirm">
                        <button className='bt' onClick={onConfirm}>Yes</button>
                        <button className='bt'onClick={onCancel}>No</button>
                        </div>
                        </div>
              </div>
      </div>
    </>
  );
}

export default DeleteConfirmation;