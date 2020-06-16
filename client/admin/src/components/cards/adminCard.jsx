import React, { useEffect, useState } from 'react';
import {
  makeStyles,
  Paper,
  Avatar,
  Typography,
  Toolbar,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Switch,
  DialogActions,
} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { IoIosCheckbox, IoIosWarning } from 'react-icons/all';
import { fetchAdmin } from '../../Redux';

export default function AdminCard() {
  const admin = useSelector((state) => state.Admin);
  const dispatch = useDispatch();
  const classes = useStyle();
  // const [isAdmin, setIsAdmin] = useState(null);
  // const [isRoot, setIsRoot] = useState(null);
  const [id, setId] = useState(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    dispatch(fetchAdmin());
    // eslint-disable-next-line
  }, []);

  console.log(id);
  const onClickButton = (id) => {
    setId(id);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        {admin?.adminData?.length &&
          admin?.adminData.map((item, index) => (
            <Paper elevation={5} key={index} className={classes.card}>
              <Avatar src={item.avatar} className={classes.avatar}></Avatar>
              <div className={classes.upperBox}></div>
              <div className={classes.lowerBox}>
                <div className={classes.info}>
                  <Typography variant="h6" className={classes.userName}>
                    {item.fullName}
                  </Typography>
                  <Toolbar className={classes.holder}>
                    <Typography variant="h6" className={classes.admin}>
                      Admin
                    </Typography>
                    {item.isAdmin ? (
                      <IoIosCheckbox color="green" fontSize={20} />
                    ) : (
                      <IoIosWarning color="orange" fontSize={20} />
                    )}
                  </Toolbar>
                  <Toolbar className={classes.holder}>
                    <Typography variant="h6" className={classes.Root}>
                      Root
                    </Typography>
                    {item.isRoot ? (
                      <IoIosCheckbox color="green" fontSize={20} />
                    ) : (
                      <IoIosWarning color="orange" fontSize={20} />
                    )}
                  </Toolbar>
                  <Button
                    variant="default"
                    size="small"
                    color="primary"
                    fullWidth
                    onClick={() => onClickButton(item._id)}
                  >
                    Edit Authorization
                  </Button>
                </div>
              </div>
            </Paper>
          ))}
      </div>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Change Authorization</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <Switch
            name="checkedA"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const useStyle = makeStyles((theme) => ({
  root: {
    marginLeft: theme.spacing(12),
    marginTop: theme.spacing(12),
    display: 'flex',
    justifyContent: 'left',
    width: '90%',
    height: '100vh',
    flexWrap: 'wrap',
  },
  card: {
    width: theme.spacing(30),
    height: theme.spacing(48),
    margin: theme.spacing(4),
  },
  upperBox: {
    width: '100%',
    height: '40%',
    backgroundColor: '#1c2e94',
  },
  lowerBox: {
    width: '100%',
    height: '50%',
  },
  avatar: {
    position: 'absolute',
    height: theme.spacing(15),
    width: theme.spacing(15),
    marginLeft: theme.spacing(7),
    marginTop: theme.spacing(10),
  },
  info: {
    textAlign: 'center',
    width: '100%',
    height: '100%',
  },
  userName: {
    marginTop: theme.spacing(6),
    padding: theme.spacing(1),
  },
  admin: {
    fontWeight: 'bold',
    fontSize: theme.spacing(1.5),
    padding: theme.spacing(1),
  },
  holder: {
    justifyContent: 'center',
    marginTop: theme.spacing(-2),
  },
  Root: {
    fontWeight: 'bold',
    fontSize: theme.spacing(1.5),
    padding: theme.spacing(1),
  },
}));
