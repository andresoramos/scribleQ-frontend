import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import EmailIcon from "@material-ui/icons/Email";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Joi from "joi";
import { validatedProperty } from "./../Services/validations";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import { setNewPassword } from "./../Services/passwordResetService";
import { tokensService } from "./../Services/tokensService";

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
    margin: theme.spacing(6),
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

export default function NewPassword(props) {
  const classes = useStyles();
  const [showAlert, setShowAlert] = useState(false);
  const [tokenAlert, setTokenAlert] = useState(false);
  const [successAlert, setSuccessAlert] = useState(false);
  const [state, setState] = useState({ password: "", passwordConfirm: "" });
  const [error, setError] = useState({
    passwordText: "",
    passwordConfirmText: "",
  });

  const shouldSubmit = () => {
    console.log("submit function is running");
    if (state.password && state.passwordConfirm) {
      const { password, passwordConfirmText } = error;
      if (password || passwordConfirmText) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  };
  const thisSchema = {
    email: Joi.string().min(5).max(20).email().required().label("Username"),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = props.match.params.token;

    const tokenAllowed = await tokensService({
      token,
    });
    if (!tokenAllowed) {
      return setTokenAlert(true);
    }
    if (state.password !== state.passwordConfirm) {
      return setShowAlert(true);
    }
    const password = state.password;
    const payload = { password, token };

    const newPasswordSet = await setNewPassword(payload);
    console.log(newPasswordSet, "this is new password");
    if (newPasswordSet) {
      return setSuccessAlert(true);
    }
  };

  const nameSchema = {
    password: Joi.string().min(8).max(100).required().label("Password"),
    passwordConfirm: Joi.string().min(8).max(100).required().label("Password"),
  };
  const handleChange = (e) => {
    setShowAlert(false);
    const validationErrors = validatedProperty(
      e.target.name,
      e.target.value,
      nameSchema,
      error,
      setError,
      e.target.name + "Text"
    );
    const newState = { ...state };
    newState[e.target.name] = e.target.value;
    setState(newState);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EmailIcon />
        </Avatar>
        {successAlert && (
          <Alert severity="success">
            Your password has been updated. Please continue to sign in.
          </Alert>
        )}
        {tokenAlert && (
          <Alert severity="error">
            Your reset link has expired. Please request another one.
          </Alert>
        )}
        <Typography component="h1" variant="h5">
          Please enter your new password below.
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="password"
            label="New password"
            name="password"
            data-testid="password"
            autoComplete="password"
            autoFocus
            onChange={handleChange}
            helperText={error.passwordText}
            error={Boolean(error.passwordText)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="passwordConfirm"
            label="Confirm new password"
            name="passwordConfirm"
            data-testid="passwordConfirm"
            autoComplete="passwordConfirm"
            autoFocus
            onChange={handleChange}
            helperText={error.passwordConfirmText}
            error={Boolean(error.passwordConfirmText)}
          />
          <Button
            onClick={handleSubmit}
            type="submit"
            name="submit"
            data-testid="submit"
            fullWidth
            disabled={shouldSubmit()}
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Reset
          </Button>
          {showAlert && (
            <Alert severity="error">
              Please make sure both passwords match!
            </Alert>
          )}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
