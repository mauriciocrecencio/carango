import React from "react";
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
import { useState } from "react";
import { APIAuth } from "../../services/apiService";

interface Errors {
  email: { error: boolean; message: string };
  password: { error: boolean; message: string };
  confirmPassword: { error: boolean; message: string };
}

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Carango
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Register() {
  const [errors, setErrors] = useState<Errors>({
    email: { error: false, message: "Formato de E-mail incorreto" },
    password: { error: false, message: "Senha deve conter apenas letras e números" },
    confirmPassword: { error: false, message: "Suas senhas devem ser iguais" },
  });

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const classes = useStyles();

  const emailHasError = () => {
    const { email } = userData;

    const emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/;

    if (!emailRegex.test(email)) {
      setErrors({ ...errors, email: { ...errors.email, error: true } });
      return true;
    } else {
      setErrors({ ...errors, email: { ...errors.email, error: false } });
      return false;
    }
  };

  const passwordHasError = () => {
    const { password } = userData;
    const passwordRegex = /^[a-zA-Z0-9]*$/;

    if (!passwordRegex.test(password) || !password) {
      setErrors({ ...errors, password: { ...errors.password, error: true } });
      return true;
    } else {
      setErrors({ ...errors, password: { ...errors.password, error: false } });
      return false;
    }
  };

  const confirmPasswordHasError = () => {
    const { confirmPassword, password } = userData;

    if (password !== confirmPassword) {
      setErrors({ ...errors, confirmPassword: { ...errors.confirmPassword, error: true } });
      return true;
    } else {
      setErrors({ ...errors, confirmPassword: { ...errors.confirmPassword, error: false } });
      return false;
    }
  };

  const hasErrors = () => {
    if (emailHasError()) {
      return true;
    }

    if (passwordHasError()) {
      return true;
    }
    if (confirmPasswordHasError()) {
      return true;
    }
    return false;
  };

  const requestRegister = async () => {
    if (hasErrors()) return;
    const { password, email } = userData;

    await APIAuth.post("/usuario", { email, password })
      .then((res) => console.log(res))
      .catch((err) =>
        setErrors({ ...errors, email: { error: true, message: "Este e-mail já está cadastrado" } })
      );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastre-se
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              autoComplete="fname"
              name="name"
              variant="outlined"
              required
              fullWidth
              id="name"
              label="Nome"
              autoFocus
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            />
          </Grid>
          {/* <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Sobrenome"
                name="lastName"
                autoComplete="lname"
              />
            </Grid> */}
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              helperText={errors.email.error && errors.email.message}
              error={errors.email.error}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              helperText={errors.password.error && errors.password.message}
              error={errors.password.error}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="confirmPassword"
              label="Confirmar senha"
              type="password"
              id="confirmPassword"
              autoComplete="current-password"
              helperText={errors.confirmPassword.error && errors.confirmPassword.message}
              error={errors.confirmPassword.error}
              onChange={(e) => setUserData({ ...userData, confirmPassword: e.target.value })}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={requestRegister}
        >
          Cadastrar
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Já tem sua conta? Clique aqui
            </Link>
          </Grid>
        </Grid>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
