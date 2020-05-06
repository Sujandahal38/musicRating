import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { Switch, Route, Link } from "react-router-dom";
import { makeStyles, Typography, Button } from "@material-ui/core";
import clsx from "clsx";
import LeftDrawer from "../components/Drawer/Drawer";
import { useSelector} from "react-redux";
import { HashLoader } from "react-spinners";
import AddVideoPage from "./AddVideoPage";

const device = () => {
  let x = window.matchMedia("(min-width: 700px");
  if (x.matches) {
    return true;
  }
  if (!x.matches) {
    return false;
  }
};

export default function (props) {
  const classes = useStyle();
  const [openDrawer, setOpenDrawer] = useState(device());
  const auth = useSelector((state) => state.auth);

  return !auth?.userData ? (
    <div className={classes.loading}>
      <HashLoader color="yellow" size={45} />
      {auth?.fakeToken ? (
        <>
          <Typography>Invalid Access Request Detected. </Typography>
          <Link to="/login">
            <Button variant='contained' color='secondary' >go to login</Button>{" "}
          </Link>{" "}
        </>
      ) : (
        ""
      )}
    </div>
  ) : (
    <>
      <div className={clsx(classes.root, { [classes.shift]: openDrawer })}>
        <LeftDrawer openDrawer={openDrawer} />
        <Navbar openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
        <Switch>
          <Route path="/dashboard/addvideo" component={AddVideoPage} />
          <Route path="/dashboard/">
            <h1 style={{ fontSize: "150px" }}>asujanvs</h1>
          </Route>
        </Switch>
      </div>
    </>
  );
}

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100vw",
  },
  shift: {
    width: `calc(100% - ${240}px)`,
    marginLeft: "240px",
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  loading: {
    marginLeft: "48%",
    marginTop: theme.spacing(25),
  },
}));
