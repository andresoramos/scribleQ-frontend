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

export function validate(data, schema) {
  const result = Joi.validate(data, schema, {
    abortEarly: false,
  });
  const { error } = result;
  if (!error) {
    return null;
  }
  const errors = {};
  for (let item of error.details) {
    errors[item.path[0]] = item.message;
  }
  return errors;
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
function validateProperty(name, value, macroSchema) {
  const obj = { [name]: value };
  const schema = { [name]: macroSchema[name] };
  const { error } = Joi.validate(obj, schema);
  if (!error) return null;
  return error.details[0].message;
}

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
        console.log("a");
        return true;
      } else {
        console.log("b");
        return false;
      }
    }
    console.log("c");
    return true;
  };
  const thisSchema = {
    email: Joi.string().email().min(3).max(100).required(),
    username: Joi.string().min(5).max(20).required(),
    password: Joi.string().min(8).max(55).required(),
  };
  const handleEmailChange = (e) => {
    const validated = validateProperty(
      e.target.name,
      e.target.value,
      thisSchema
    );
    if (validated) {
      const newError = { ...error };
      newError.emailText = validated;
      setError(newError);
    } else {
      const newError = { ...error };
      newError.emailText = "";
      setError(newError);
    }
    setEmail(e.target.value);
  };
  const handleNameChange = (e) => {
    const validated = validateProperty(
      e.target.name,
      e.target.value,
      thisSchema
    );
    if (validated) {
      const newError = { ...error };
      newError.usernameText = validated;
      setError(newError);
    } else {
      const newError = { ...error };
      newError.usernameText = "";
      setError(newError);
    }
    setUsername(e.target.value);
  };
  const handlePasswordChange = (e) => {
    const validated = validateProperty(
      e.target.name,
      e.target.value,
      thisSchema
    );
    if (validated) {
      const newError = { ...error };
      newError.passwordText = validated;
      setError(newError);
    } else {
      const newError = { ...error };
      newError.passwordText = "";
      setError(newError);
    }
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = { name: username, email: email, password: password };
    const post = await axios.post("http://localhost:5000/api/users", body);
    console.log(post);
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
            autoComplete="email"
            autoFocus
            onChange={handleEmailChange}
            helperText={error.emailText}
            error={Boolean(error.emailText)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="User Name"
            name="username"
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
            fullWidth
            disabled={shouldSubmit()}
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
