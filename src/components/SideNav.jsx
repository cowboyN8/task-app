import * as React from "react";
import '../index.css'
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

export default function TemporaryDrawer(props) {
  

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    props.setDrawerOpen({ ...props.drawerOpen, [anchor]: open });
    
  };

  const handleClose = () => {
    props.setDrawerOpen(false);
  };

  const handleClick = () => {
   
    props.createNewTask();
    props.setDrawerOpen(false);
    props.setDate(null);
  };



  const list = (anchor) => (
    <Box role="presentation" sx={{ minWidth: "400px", height: "91vh" }}>
      {props.name &&
      props.description &&
      props.date &&
      props.points &&
      props.category ? (
        <div className="drawer-header">
          <button
            onClick={toggleDrawer(anchor, false)}
            className="cancel-button"
            
          >
            Cancel
          </button>
          <div className="drawer-title">Add New Task</div>
          <button onClick={handleClick} className="save-button"
          >
            Save Changes
          </button>
        </div>
      ) : (
        <div className="drawer-header-empty">
          <button
            onClick={toggleDrawer("right", false)}
            className="close-button"
          >
            Close
          </button>
          <div className="drawer-title">Add New Task</div>
          <Button className="hack-button" 
          ></Button>
        </div>
      )}

      <div className="drawer-body">
        <div className="form-card">
          <div className="form-card-header">Task Information</div>
          <form className="new-task-form">
            <TextField
              id="outlined-basic"
              label="Task Name"
              variant="outlined"
              onChange={(event) => props.setName(event.target.value)}
              required
            />
            <TextField
              id="outlined-basic"
              label="Description"
              variant="outlined"
              onChange={(event) => props.setDescription(event.target.value)}
              required
              multiline
            />

            <TextField
              id="points"
              label="Points"
              variant="outlined"
              onChange={(event) => props.setPoints(event.target.value)}
              required
              type="number"
            />

            <TextField
              id="category"
              label="Category"
              onChange={(event) => props.setCategory(event.target.value)}
              select
            >
              <MenuItem value={"Main"}>Main</MenuItem>
              <MenuItem value={"Side"}>Side</MenuItem>
              <MenuItem value={"Daily"}>Daily</MenuItem>
            </TextField>
            <input
              id="date"
              label="Date"
              variant="outlined"
              onChange={(event) => props.setDate(event.target.value)}
              required
              type="date"
              className="date-picker"
              value={props.date}
            />
          </form>
        </div>
      </div>
    </Box>
  );

  return (
    <div className="addtask-button">
      <React.Fragment key={"right"}>
        { props.taskList.length > 0 && <Button
          sx={{ backgroundColor: "#6B63FF" }}
          variant="contained"
          onClick={toggleDrawer("right", true)}
        >
          Add Task
        </Button>}
        <Drawer
          anchor={"right"}
          open={props.drawerOpen["right"]}
          onClose={toggleDrawer("right", false)}
        >
          {list("right")}
        </Drawer>
      </React.Fragment>
    </div>
  );
}