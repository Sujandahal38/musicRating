import React, { useState } from "react";
import {
  Paper,
  Container,
  Grid,
  makeStyles,
  Toolbar,
  Fade,
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import SignupForm from "../components/Forms/SignupForm";
import personalInfo from "../assets/svg/signIn.svg";
import security from "../assets/svg/security.svg";
import mention from "../assets/svg/mention.svg";
import { useHistory } from "react-router-dom";

function step() {
  return [personalInfo, security, mention];
}

export default function SignupPage(props) {
  const history = useHistory();
  const snack = useSelector((state) => state.snack);
  const classes = useStyle();
  const steps = step();
  const [image, setImage] = useState(0);

  if (snack?.status === 409) {
    history.push("/login");
  }
  if (snack?.status === 201) {
    history.push("/login");
  }
  const [imageStep] = useState(0);
  return (
    <>
      <Container>
        <Paper className={classes.root} elevation={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={7} className={classes.descriptionBox}>
              <Container>
                <Toolbar className={classes.imageContainer}>
                  {steps[image] && (
                    <Fade in={!!steps[image]} timeout={3000}>
                      <img
                        alt="hello"
                        className={classes.image}
                        src={steps[image]}
                      />
                    </Fade>
                  )}
                </Toolbar>
              </Container>
            </Grid>
            <Grid className={classes.loginForm} item xs={12} sm={5}>
              <Container>
                <SignupForm step={imageStep} setImage={setImage} />
              </Container>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </>
  );
}

const useStyle = makeStyles((theme) => ({
  root: {
    width: "80vw",
    marginLeft: theme.spacing(5),
    marginTop: theme.spacing(10),
    height: "60vh",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
      marginTop: theme.spacing(5),
      marginLeft: "0px",
    },
  },
  adminsvg: {
    height: "60vh",
  },
  descriptionBox: {
    backgroundColor: "#c52aef",
    color: "white",
    height: "60vh",
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  imageContainer: {
    width: "100%",
    justifyContent: "center",
  },
  loginForm: {
    color: "blck",
    height: "60vh",
    [theme.breakpoints.down("sm")]: {
      width: "100vw",
    },
  },
  image: {
    height: "55vh",
    width: "100%",
  },
}));
