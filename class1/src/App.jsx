import { useState } from 'react';
import { FaUser } from "react-icons/fa";
import Add from "./Add.jsx";
import Edit from "./Edit.jsx";
import "./App.css";
import Task from './Task.jsx';
import { v4 as uuidv4 } from 'uuid'; 

const App = () => {

  const style = {
    backgroundColor: 'white',
    padding: "10px",
    borderRadius: "50%",
    width: "20px",
    height: "20px"
  }

  const [search, setSearch] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [rows,setRows] = useState([]);
  const [rowEdit, setRowEdit] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(prevState => !prevState); 
  };
  
  const handleSubmit = (newRow) => {
    if (rowEdit) {
      setRows(prevRows => prevRows.map(row => (row.id === rowEdit.id ? newRow : row)));
      setRowEdit(null);
      setIsModalVisible(false);
    }
    else {
    setRows(prevRows => [...prevRows, { ...newRow, id: uuidv4() }]);
      toggleModal();
    }
  }

  const handleDeleteTask = (taskId) => {
    setRows(prevRows => prevRows.filter(row => row.id !== taskId));
  };
  
    const handleEditRow = (row) => {
    setRowEdit(row);
    
    }
  
  const handleCancelEdit = () => {
    setRowEdit(null);
  };

  const handlePriorityChange = (e) => {
    setPriorityFilter(e.target.value);
  }
  
  
  const handleSortOptionChange = (e) => {
    setSortOption(e.target.value);
  }

  const filteredSortedRows = rows.filter(item => (
    (search.trim() === '' || item.assignee.toLowerCase().includes(search.toLowerCase())) &&
    (priorityFilter === '' || item.priority === priorityFilter)
  )).sort((a, b) => {
    if (sortOption === 'priority') {
      return a.priority.localeCompare(b.priority);
    }
    return 0;
  });

  return (
    <>
      <div className="container">
        <div className="head">
          <h2>Task Board</h2>
          <FaUser style={style}/>
        </div>
        <div className="main-con">
          <div className="search">
            <div className="fil">
              <p>Filter By:</p>
              <input type="text" onChange={(e) => setSearch(e.target.value)}
              placeholder='AssigneeName' />
              <select name="priority" onChange={handlePriorityChange} id="">
                <option value="">Default</option>
                <option value="P0">P0</option>
                <option value="P1">P1</option>
                <option value="P2">P2</option>
              </select>
            </div>
            <div className="ntask">
              <button onClick={toggleModal} >Add new Task</button>
              {isModalVisible && <Add closeModal={toggleModal} onSubmit={handleSubmit}/>}
            </div>
          </div>
          <div className="sort">
            <p>Sort By:</p>
            <select name="" id="" onChange={handleSortOptionChange}>
                <option value="">Default</option>
                <option value="priority">Priority</option>
              </select>
          </div>
          <div className="task">
           
            <div className="pending"><h3>Pending</h3>
             {filteredSortedRows
              .map((row, index) => {
                if(row.status === "pending") {
                  row.btn = "Assign";
                  return <Task key={index} row={row} onDelete={handleDeleteTask} onEdit={handleEditRow}/>;
                }
                return null;
              })}
                
              </div>
            <div className="inprogress"><h3>In Progress</h3>
            {filteredSortedRows
              .map((row, index) => {
                if(row.status === "inprogress") {
                  row.btn = "In Progress";
                  return <Task key={index} row={row} onDelete={handleDeleteTask} onEdit={handleEditRow}/>;
                }
                return null;
              })}
            </div>
            <div className="completed"><h3>Completed</h3>
            {filteredSortedRows
              .map((row, index) => {
                if(row.status === "Completed") {
                  row.btn = "Completed";
                  return <Task key={index} row={row} onDelete={handleDeleteTask} onEdit={handleEditRow}/>;
                }
                return null;
              })}</div>
            <div className="deployed"><h3>Deployed</h3>
            {filteredSortedRows
              .map((row, index) => {
                if(row.status === "Deployed") {
                  row.btn = "Deployed";
                  return <Task key={index} row={row} onDelete={handleDeleteTask} onEdit={handleEditRow}/>;
                }
                return null;
              })}</div>
            <div className="deffered"><h3>Deffered</h3>
            {filteredSortedRows
              .map((row, index)=> {
                if(row.status === "deffered") {
                  row.btn = "Deffered";
                  return <Task key={index} row={row} onDelete={handleDeleteTask} onEdit={handleEditRow}/>;
                }
                return null;
              })}</div>
          </div>
        </div>
      </div>
      {rowEdit && <Edit row={rowEdit} onCancel={handleCancelEdit} onSubmit={handleSubmit} />}
    </>

  )
}

export default App
