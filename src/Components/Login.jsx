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
  console.log(error, "this is the error object");
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

export default function Login(props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    nameText: "",
    passwordText: "",
  });
  const shouldSubmit = () => {
    console.log("submit function is running");
    if (name && password) {
      const { nameText, passwordText } = error;
      if (nameText || passwordText) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };
  const thisSchema = {
    name: Joi.string().min(5).max(20).required().label("Username"),
    password: Joi.string().min(8).max(55).required().label("Password"),
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
    try {
      const data = { name, password };
      const notAllowed = validate(data, thisSchema);
      if (notAllowed) {
        return;
      }
      const post = await axios.post("http://localhost:5000/api/auth", data);
      if (post) {
        console.log(post, "this was the post");
      }
    } catch (error) {
      console.log(error, "this is the error");
      //   window.location = "/testredirect";
    }
  };

  const handleEmailOrNameChange = (e) => {
    const nameSchema = {
      name: Joi.string().min(3).max(100).required().label("Input"),
    };
    const submitted = { name: e.target.value };

    const validated = validate(submitted, nameSchema);

    if (validated) {
      if (submitted.name.length === 0) {
        const newError = { ...error };
        newError.nameText = "Field cannot be empty.";
        setError(newError);
      } else {
        const newError = { ...error };
        newError.nameText =
          "Username or email must be longer than three characters";
        setError(newError);
      }
    } else {
      const newError = { ...error };
      newError.nameText = "";
      setError(newError);
    }
    setName(e.target.value);
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Welcome back!
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address or User Name"
            name="email"
            data-testid="email"
            autoComplete="email"
            autoFocus
            onChange={handleEmailOrNameChange}
            helperText={error.nameText}
            error={Boolean(error.nameText)}
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
            name="submit"
            data-testid="submit"
            fullWidth
            // disabled={shouldSubmit()}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign-in
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
