import React from "react";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import RemoveIcon from "@material-ui/icons/Remove";
import Button from "@material-ui/core/Button";
import { findMarketHistory } from "./../Services/findQuiz";

const headCells = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Name",
  },
  {
    id: "uploadDate",
    numeric: true,
    disablePadding: false,
    label: "Upload Date",
  },
  { id: "likes", numeric: true, disablePadding: false, label: "Likes" },
  { id: "dislikes", numeric: true, disablePadding: false, label: "Dislikes" },
  { id: "edit", numeric: true, disablePadding: false, label: "Edit" },
  {
    id: "downloads",
    numeric: true,
    disablePadding: false,
    label: "Download Count",
  },
  {
    id: "earnings",
    numeric: true,
    disablePadding: false,
    label: "Total Earnings",
  },
  {
    id: "earnings",
    numeric: true,
    disablePadding: false,
    label: "Remove from Market",
  },
];

function EnhancedTableHead(props) {
  const {
    order,
    orderBy,

    onRequestSort,
  } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell, i) => (
          <TableCell
            key={i}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

export default function UploadsTable(props) {
  const classes = useStyles();

  // if (props.rows.length === 0) {
  //   props.createRow(0);
  // }

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        {/* <EnhancedTableToolbar numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={"medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead classes={classes} />
            <TableBody>
              {props.rows.map((row, index) => {
                return (
                  <TableRow hover key={row.name}>
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell
                      component="th"
                      // id={labelId}
                      scope="row"
                      padding="none"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.uploadDate}</TableCell>
                    <TableCell align="right">{row.likes}</TableCell>
                    <TableCell align="right">{row.dislikes}</TableCell>
                    <TableCell align="right">
                      {row.edit ? (
                        <Checkbox
                          onClick={async () => {
                            const historyObj = await findMarketHistory(
                              row.name
                            );

                            if (!historyObj) {
                              return;
                            }
                            const history = {
                              ...historyObj.history,
                              _id: historyObj._id,
                            };
                            history.edit = true;
                            history.submitted = false;

                            // props.updateFormStateProperties(
                            //   ["edit", "submitted"],
                            //   [true, false]
                            // );

                            props.restoreHistory(history);
                          }}
                        />
                      ) : null}
                    </TableCell>
                    <TableCell align="right">{row.downloadCount}</TableCell>
                    <TableCell align="right">{row.totalEarnings}</TableCell>
                    <TableCell align="right">
                      {row.remove ? <Button component={RemoveIcon} /> : null}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
