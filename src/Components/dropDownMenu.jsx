import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
  },
}));

// const options = [
//   "Science",
//   "Math",
//   "History",
//   "Social Studies",
//   "Music/Art",
//   "Psychology",
//   "Other",
// ];

//Finish making it so that once the user picks a topic for their quiz,
//They're able to then send it off to the market place.
export default function DropDownMenu(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);

  const handleClickListItem = (event) => {
    if (props.options[0] !== "Science") {
      props.firstClick();
    }
    setAnchorEl(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    console.log("2 ran");
    props.setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    console.log("3 ran");
    setAnchorEl(null);
  };

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="Device settings">
        <ListItem
          button
          aria-haspopup="true"
          aria-controls="lock-menu"
          aria-label="Which category best matches your quiz?"
          onClick={handleClickListItem}
        >
          <ListItemText
            primary="Which category best matches your quiz?"
            secondary={props.options[props.selectedIndex]}
          />
        </ListItem>
      </List>
      <Menu
        id="lock-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.options.map((option, index) => (
          <MenuItem
            key={option}
            // disabled={index === 0}
            selected={index === props.selectedIndex}
            onClick={(event) => handleMenuItemClick(event, index)}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}
