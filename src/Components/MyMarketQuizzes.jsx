import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import DropDownMenu from "./dropDownMenu";
import getQuizzes from "./../Services/getQuizzes";
import UploadsTable from "./UploadsTable";
import { findMarketObj, findAllMarkets } from "./../Services/findQuiz";

const useStyles = makeStyles({
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: "10%",
  },
});

export default function MyMarketQuizzes(props) {
  const classes = useStyles();
  const [options, setOptions] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [allMarkets, setAllMarkets] = useState([]);
  const [row, setRow] = useState([]);

  useEffect(() => {
    async function populateQuizzes() {
      const quiz = await getQuizzes(true);
      if (quiz.length === 0) {
        return props.history.push("/");
      }
      if (allMarkets.length === 0) {
        const all = await findAllMarkets(quiz[selectedIndex].creatorId);
        localStorage.setItem("allMarketObjs", JSON.stringify(all));
        setAllMarkets(all);
      }
      let nameOptions = [];
      for (var i = 0; i < quiz.length; i++) {
        nameOptions.push(quiz[i].name);
      }
      localStorage.setItem("marketQuizzes", JSON.stringify(quiz));

      setOptions(JSON.stringify(nameOptions));
    }
    if (options.length === 0) {
      populateQuizzes();
      setTimeout(() => {
        createRow(0);
      }, 0);
    }
  });
  // const assignCurrentQuiz = async () => {
  //   const quizzes = JSON.parse(localStorage.getItem("marketQuizzes"));
  //   const selectedMatch = quizzes[selectedIndex]._id;
  //   const marketObject = await findMarketObj(selectedMatch);
  //   setCurrentQuiz(marketObject);
  // };

  // name,
  // uploadDate,
  // likes,
  // dislikes,
  // edit,
  // downloadCount,
  // totalEarnings,
  // remove,
  const createRow = (index) => {
    // const currentName =
    //   typeof options !== "string" ? "" : JSON.parse(options)[index];
    const quiz = JSON.parse(localStorage.getItem("marketQuizzes"))[index];
    const copyAllMarkets = [...allMarkets];
    const currentMarket = copyAllMarkets[index];

    const finalRow = [
      {
        name: quiz.name,
        uploadDate:
          currentMarket !== undefined ? currentMarket.uploadDate : null,
        likes: currentMarket !== undefined ? currentMarket.likes.likes : null,
        dislikes:
          currentMarket !== undefined ? currentMarket.likes.dislikes : null,
        edit: true,
        downloadCount:
          currentMarket !== undefined
            ? currentMarket.downloadCount !== undefined
              ? currentMarket.downloadCount
              : 0
            : 0,
        totalEarnings:
          currentMarket !== undefined
            ? currentMarket.totalEarnings
              ? currentMarket.totalEarnings
              : 0
            : 0,
        remove: true,
      },
    ];
    return setRow(finalRow);
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        // backgroundColor: "pink",
      }}
    >
      <div
        style={{
          width: "40%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60%",
          // backgroundColor: "blue",
        }}
      >
        <Grid item xs={12} md={6}>
          <CardActionArea component="a" href="#">
            <Card className={classes.card}>
              <div className={classes.cardDetails}>
                <CardContent>
                  <Typography component="h2" variant="h5">
                    {props.title}
                  </Typography>
                  <Typography variant="subtitle1" color="textSecondary">
                    {<br></br>}
                  </Typography>
                  <Typography variant="subtitle1" paragraph>
                    {props.description}
                  </Typography>
                  <DropDownMenu
                    createRow={createRow}
                    selectedIndex={selectedIndex}
                    // assignCurrentQuiz={assignCurrentQuiz}
                    setSelectedIndex={setSelectedIndex}
                    general={true}
                    options={
                      typeof options === "string"
                        ? JSON.parse(options)
                        : options
                    }
                    message="Here are the quizzes you've created."
                  />
                </CardContent>
              </div>
            </Card>
          </CardActionArea>
        </Grid>
      </div>
      <div>
        <UploadsTable
          quizArray={JSON.parse(localStorage.getItem("marketQuizzes"))}
          currentQuiz={allMarkets[selectedIndex]}
          createRow={createRow}
          restoreHistory={props.restoreHistory}
          setEdit={props.setEdit}
          updateFormStateProperties={props.updateFormStateProperties}
          rows={row}
          selectedIndex={selectedIndex}
          currentName={
            typeof options !== "string"
              ? ""
              : JSON.parse(options)[selectedIndex]
          }
        />
      </div>
    </div>
  );
}

//
