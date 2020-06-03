import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableHead,
  makeStyles,
  TableRow,
  TableCell,
  TableBody,
  Toolbar,
  IconButton,
  FormControlLabel,
  Checkbox,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { setFetchVideo, deleteVideo } from '../../Redux';
import { Link, useLocation } from 'react-router-dom';
import {
  AiTwotoneDelete,
  FaEdit,
  MdWarning,
  FaCheckCircle,
} from 'react-icons/all';
import Moment from 'react-moment';
import { HashLoader } from 'react-spinners';
export default function VideoTable() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(null);
  const [filterUnAnalyzed, setFilterUnAnalyzed] = useState(false);
  const [filterUnScraped, setFilterUnScraped] = useState(false);
  const createData = (SN, title, genre, commentFetched, analyzed, date, id) => {
    return { SN, title, genre, commentFetched, analyzed, date, id };
  };
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();
  const video = useSelector((state) => state.video);
  const onDelete = (id) => {
    dispatch(deleteVideo(id, location.pathname));
    setOpen(false);
  };
  useEffect(() => {
    dispatch(setFetchVideo(0));
    // eslint-disable-next-line
  }, []);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (id) => {
    setOpen(true);
    setId(id);
  };
  useEffect(() => {
    if (filterUnAnalyzed && !filterUnScraped) {
      let holder = [];
      if (video?.videoData?.length) {
        let filterData = video.videoData.filter((item) => !item.ratings);
        filterData.map((item, index) =>
          holder.push(
            createData(
              index + 1,
              item.title,
              item.genre,
              item.youtubeComments.length,
              item.ratings,
              <Moment format="YYYY/MM/DD">{item.createdAt}</Moment>,
              item._id
            )
          )
        );
        setRows(holder);
      }
    }
    if (filterUnAnalyzed && filterUnScraped) {
      let holder = [];
      if (video?.videoData?.length) {
        let filterData = video.videoData.filter(
          (item) => !item.ratings && item.youtubeComments.length === 0
        );
        filterData.map((item, index) =>
          holder.push(
            createData(
              index + 1,
              item.title,
              item.genre,
              item.youtubeComments.length,
              item.ratings,
              <Moment format="YYYY/MM/DD">{item.createdAt}</Moment>,
              item._id
            )
          )
        );
        setRows(holder);
      }
    }
    if (!filterUnAnalyzed && filterUnScraped) {
      let holder = [];
      if (video?.videoData?.length) {
        let filterData = video.videoData.filter(
          (item) => item.youtubeComments.length === 0
        );
        filterData.map((item, index) =>
          holder.push(
            createData(
              index + 1,
              item.title,
              item.genre,
              item.youtubeComments.length,
              item.ratings,
              <Moment format="YYYY/MM/DD">{item.createdAt}</Moment>,
              item._id
            )
          )
        );
        setRows(holder);
      }
    }
    if (!filterUnAnalyzed && !filterUnScraped) {
      let holder = [];
      if (video?.videoData?.length) {
        video.videoData.map((item, index) =>
          holder.push(
            createData(
              index + 1,
              item.title,
              item.genre,
              item.youtubeComments.length,
              item.ratings,
              <Moment format="YYYY/MM/DD">{item.createdAt}</Moment>,
              item._id
            )
          )
        );
        setRows(holder);
      }
    }
  }, [filterUnAnalyzed, filterUnScraped, video]);

  const handleUnscraped = () => {
    setFilterUnScraped(!filterUnScraped);
  };
  const handleUnAnalyzed = () => {
    setFilterUnAnalyzed(!filterUnAnalyzed);
  };

  useEffect(() => {
    let holder = [];
    if (video?.videoData) {
      video.videoData.map((item, index) =>
        holder.push(
          createData(
            index + 1,
            item.title,
            item.genre,
            item.youtubeComments.length,
            item.ratings,
            <Moment format="YYYY/MM/DD">{item.createdAt}</Moment>,
            item._id
          )
        )
      );
      setRows(holder);
    }
    // eslint-disable-next-line
  }, [video.videoData]);
  return (
    <>
      <Paper className={classes.root}>
        {video?.fetching ? (
          <div className={classes.loaderBox}>
            <HashLoader style={{ margin: '40%' }} color="purple" size={50} />
          </div>
        ) : (
          <Table stickyHeader className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell component="th" align="justify">
                  S.N
                </TableCell>
                <TableCell component="th" align="justify">
                  Title
                </TableCell>
                <TableCell component="th" align="justify">
                  Genre
                </TableCell>
                <TableCell component="th" align="justify">
                  Comment_Scraped
                </TableCell>
                <TableCell component="th" align="justify">
                  Analyzed
                </TableCell>
                <TableCell component="th" align="justify">
                  Uploaded on
                </TableCell>
                <TableCell component="th" align="justify" colSpan={3}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filterUnAnalyzed}
                        onChange={handleUnAnalyzed}
                        name="unAnalyzed"
                      />
                    }
                    label="filter unanalyzed video"
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filterUnScraped}
                        onChange={handleUnscraped}
                        name="unscraped"
                      />
                    }
                    label="filter unscraped video"
                  />
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows?.length >> 0 ? (
                rows?.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" align="center">
                      {item.SN}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      <Link to={`/dashboard/videos/${item.id}`}>
                        {item.title}
                      </Link>
                    </TableCell>
                    <TableCell component="th" align="center">
                      {item.genre}
                    </TableCell>
                    <TableCell component="th" align="center">
                      {item.commentFetched ? (
                        <FaCheckCircle fontSize={24} color="green" />
                      ) : (
                        <MdWarning fontSize={24} color="orange" />
                      )}
                    </TableCell>
                    <TableCell component="th" align="center">
                      {item.analyzed ? (
                        <FaCheckCircle fontSize={24} color="green" />
                      ) : (
                        <MdWarning fontSize={24} color="orange" />
                      )}
                    </TableCell>
                    <TableCell component="th" align="center">
                      {item.date}
                    </TableCell>
                    <TableCell component="th" align="center">
                      <Toolbar>
                        <IconButton onClick={() => handleOpen(item.id)}>
                          <AiTwotoneDelete color="red" />
                        </IconButton>
                        <Link to={`/dashboard/editvideo/${item.id}`}>
                          <IconButton>
                            <FaEdit color="blue" />
                          </IconButton>
                        </Link>
                      </Toolbar>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center" component="th">
                    <Typography variant="h6">No video available</Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Paper>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="confirmation dailog"
      >
        <DialogTitle id="alert-dialog-title">Are you sure?</DialogTitle>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={() => onDelete(id)} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    marginTop: theme.spacing(12),
    marginLeft: theme.spacing(4),
    overflow: 'scroll',
    overflowX: 'hidden',
    height: '100vh',
  },
  table: {
    width: '100%',
    minWidth: '50vw',
  },
  loaderBox: {
    width: '100%',
    display: 'flex',
    height: 'inherit',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
