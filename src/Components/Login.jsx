import React, { useState } from "react";
import Form from "../Services/EmailForm";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Alert from "@material-ui/lab/Alert";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Joi from "joi";
import { addToLockedOut } from "../Services/lockedOutServices";
import {
  checkIpObject,
  instantiateIpObject,
  getIp,
  putIpObject,
} from "./../Services/trackIpService";

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
    console.log("left validate peacefully");

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

const addToIpObject = async () => {
  const getId = await checkIpObject();
  const id = getId.id;
  const ip = await getIp();
  const putObject = { ...getId.data };
  if (!putObject[ip]) {
    putObject[ip] = [];
    putObject[ip].push(new Date(Date.now()));
  } else {
    putObject[ip].push(new Date(Date.now()));
  }

  const calculated = await calculateTime(
    putObject[ip][0],
    putObject[ip][putObject[ip].length - 1],
    putObject[ip],
    ip
  );
  if (calculated) {
    putObject[ip] = calculated;
  }
  const newAddition = { ...putObject };
  putObject.id = id;
  putObject.ips = newAddition;
  console.log(putObject, "put object before putting");
  const changed = await putIpObject(putObject);
};

const calculateTime = async (time1, time2, array, ip) => {
  const timeDiff = time2 - new Date(time1);
  if (timeDiff <= 300000) {
    if (array.length >= 20) {
      await addToLockedOut(ip);
      console.log("lockedout");
      return;
    }
  } else {
    array.splice(0, array.length - 1);
  }
  return array;
};

export default function Login(props) {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState(false);
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
    name: Joi.string().min(5).max(100).required().label("Username"),
    password: Joi.string().min(8).max(55).required().label("Password"),
  };

  const handlePasswordChange = (e) => {
    setLoginError(false);
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
      const ipObject = await checkIpObject();

      if (ipObject.data.length === 0) {
        await instantiateIpObject();
      }
      await addToIpObject();

      // getIp();
      // const data = { name, password };
      // const notAllowed = validate(data, thisSchema);
      // if (notAllowed) {
      //   return;
      // }
      // const post = await axios.post("http://localhost:5000/api/auth", data);
      // if (post) {
      //   localStorage.setItem("token", post.headers["x-auth-token"]);
      //   localStorage.setItem("name", post.headers["name-token"]);
      //   props.setName(localStorage.getItem("name"));

      //   window.location = "/";
      // }
    } catch (error) {
      console.log(error.response, "this is the ERROR");
      // if (error.response.status === 400) {
      //   setLoginError(true);
      // }
    }
  };

  const handleEmailOrNameChange = (e) => {
    setLoginError(false);
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
  const handleMakeAccount = (e) => {
    props["0"].history.push("/register");
  };
  const handleForgot = (e) => {
    props["0"].history.push("/passwordReset");
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
          {loginError && (
            <Alert severity="error">
              Invalid entry entered. Please try again
            </Alert>
          )}
          <Grid container>
            <Grid item xs>
              <Link onClick={handleForgot} href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={handleMakeAccount} href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
