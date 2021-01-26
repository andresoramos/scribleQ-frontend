import React, { useState } from "react";
import Form from "../Services/EmailForm";
import Link from "@material-ui/core/Link";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import EmailIcon from "@material-ui/icons/Email";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Joi from "joi";
import { validatedProperty } from "./../Services/validations";
import { getResetToken } from "./../Services/passwordResetService";

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

export default function PasswordReset(props) {
  const classes = useStyles();
  const [state, setState] = useState({ feedback: "", name: "", email: "" });
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    emailText: "",
  });
  const shouldSubmit = () => {
    if (email) {
      const { emailText } = error;
      if (emailText) {
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
    const body = { email: state.email, isAllowed: true };

    const token = await getResetToken(body);

    const resetUrl = `http://localhost:3000/newPassword/${token.data}`;

    console.log(resetUrl, "this will be emailed");
    const templateId = "template_Pcl5Wd0z";
    sendFeedback(templateId, {
      to_email: state.email,
      your_link: resetUrl,
      message_html: state.feedback,
      from_name: state.name,
      reply_to: state.email,
    });
  };

  const nameSchema = {
    email: Joi.string().min(3).max(100).email().required().label("Email"),
  };
  const handleEmailOrNameChange = (e) => {
    validatedProperty(
      e.target.name,
      e.target.value,
      nameSchema,
      error,
      setError,
      "emailText"
    );
    const newState = { ...state };
    newState.email = e.target.value;
    setState(newState);
    setEmail(e.target.value);
  };

  const sendFeedback = (templateId, variables) => {
    window.emailjs
      .send("gmail", templateId, variables)
      .then((res) => {
        console.log("Email successfully sent!");
      })
      // Handle errors here however you like, or use a React error boundary
      .catch((err) =>
        console.error(
          "Oh well, you failed. Here some thoughts on the error that occured:",
          err
        )
      );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <EmailIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Enter you the email address to which you'd like us to send a link to
          reset your password.
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
            helperText={error.emailText}
            error={Boolean(error.emailText)}
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
            Reset
          </Button>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}
