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

export default function GenericTable(props) {
  const classes = useStyles();
  const headRows = (arr) => {
    return arr.map((item, i) => {
      return i === 0 ? (
        <TableCell key={i}>{item.category}</TableCell>
      ) : (
        <TableCell key={i} align="right">
          {item.category}
        </TableCell>
      );
    });
  };
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
                    {row.quizName}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.dateUploaded}
                  </TableCell>
                  {!row.validUntil ? (
                    <TableCell component="th" scope="row">
                      This quiz is permanently available.
                    </TableCell>
                  ) : (
                    <TableCell component="th" scope="row">
                      {row.validUntil}
                    </TableCell>
                  )}
                  <TableCell component="th" scope="row">
                    {row.likes}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.dislikes}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.totalDownloads}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {row.totalRevenue}
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
