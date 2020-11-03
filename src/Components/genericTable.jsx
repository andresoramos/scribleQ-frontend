import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

export default function GenericTable(props) {
  const classes = useStyles();
  const headRows = (arr) => {
    return arr.map((item, i) => {
      return i === 0 ? (
        <TableCell>{item.category}</TableCell>
      ) : (
        <TableCell key={i} align="right">
          {item.category}
        </TableCell>
      );
    });
  };
  console.log(props.rows, "this is props.rows");
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>{headRows(props.categories)}</TableRow>
        </TableHead>
        <TableBody>
          {props.rows === null
            ? null
            : props.rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {row}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
