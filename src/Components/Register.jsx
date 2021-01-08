import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Joi from "joi";
import { setHeaders } from "./../Services/setHeaders";
import { authPost } from "./../Services/authServices";
import { validatedProperty, validate } from "./../Services/validations";
import getQuizzes from "./../Services/getQuizzes";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        ScribleQ
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register(props) {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    usernameText: "",
    passwordText: "",
    emailText: "",
  });
  const shouldSubmit = () => {
    console.log("submit function is running");
    if (username && password && email) {
      const { usernameText, passwordText, emailText } = error;
      if (usernameText || passwordText || emailText) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };
  const thisSchema = {
    email: Joi.string().email().min(3).max(100).required().label("Email"),
    username: Joi.string().min(5).max(20).required().label("Username"),
    password: Joi.string().min(8).max(55).required().label("Password"),
  };
  const handleEmailChange = (e) => {
    validatedProperty(
      e.target.name,
      e.target.value,
      thisSchema,
      error,
      setError,
      "emailText"
    );

    setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    validatedProperty(
      e.target.name,
      e.target.value,
      thisSchema,
      error,
      setError,
      "usernameText"
    );
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    validatedProperty(
      e.target.name,
      e.target.value,
      thisSchema,
      error,
      setError,
      "passwordText"
    );

    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { username, email, password };
    const notAllowed = validate(data, thisSchema);
    if (notAllowed) {
      console.log(notAllowed, "ERROR object returned");
      return;
    }
    const payload = { name: username, email, password };

    const post = await authPost(props, payload);

    if (post) {
      setHeaders(post, props);

      if (props.location.key) {
        const quizzes = await getQuizzes();
        console.log(quizzes, "Should come back undefined");
        localStorage.setItem("account", JSON.stringify(quizzes));
        props.history.goBack();
      } else {
        const quizzes = await getQuizzes();
        console.log(quizzes, "Should come back undefine dfrom the else");
        localStorage.setItem("account", JSON.stringify(quizzes));
        window.location = "/";

        // props.history.push("/");
      }
    }
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Create a new account!
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={email}
            data-testid="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmailChange}
            helperText={error.emailText}
            error={Boolean(error.emailText)}
          />
          {/* <div data-testid="sample">
            <label>Sample</label>
          </div> */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
            value={username}
            autoFocus
            onChange={handleNameChange}
            helperText={error.usernameText}
            error={Boolean(error.usernameText)}
          />
          <TextField
            onChange={handlePasswordChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            value={password}
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            helperText={error.passwordText}
            error={Boolean(error.passwordText)}
          />

          <Button
            onClick={handleSubmit}
            type="submit"
            name="submit"
            data-testid="submit"
            fullWidth
            // disabled={shouldSubmit()}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create my account!
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
