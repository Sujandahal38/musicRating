import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from 'react-redux';
import { editVideo, getVideoByID } from '../../Redux'
import {
  makeStyles,
  Card,
  CardHeader,
  Grid,
  Divider,
  CardContent,
  TextField,
  MenuItem,
  Select,
  CardActions,
  Button,
  CircularProgress,
} from "@material-ui/core";
import { RestorePage, Save } from "@material-ui/icons";
import { useEffect } from "react";
import { useParams  } from 'react-router-dom';

export default function EditVideo(props) {
 const { id } = useParams();
  const classes = useStyle();
  const { register, errors, reset, handleSubmit } = useForm();
  const video = useSelector(state => state.video);
  const dispatch = useDispatch();
  const [genre, setGenre] = useState("Pop");
  const handleSelectGenre = (event) => {
    setGenre(event.target.value);
  };
  const onSave = (data) => {
   const finalData = {
    ...data,
    genre,
   }
   dispatch(editVideo(id,finalData));
  }
  useEffect(() => {
    dispatch(getVideoByID(id));
  },[])
  return (
  
    <>
      { video?.videoDatabyId?.title ? 
      <form className={classes.root} onSubmit={handleSubmit(onSave)}>
        <Card className={classes.card} elevation={3}>
          <CardHeader className={classes.cardHeader} title="Edit Video Info" />
          <Divider className={classes.headerUnderline} />
          <CardHeader subheader="edit the video description by filling up the form." />
          <CardContent>
            <div className={classes.form}>
              <Grid className={classes.Grid} container spacing={3}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="title"
                    label="Title"
                    fullWidth
                    inputRef={register({ required: true, maxLength: 100 })}
                    error={!!(errors.title)}
                    value={video?.videoDatabyId?.title}
                    helperText={
                      (errors.title?.type === "required" &&
                        "Add tittle") ||
                      (errors.title?.type === "maxLength" &&
                        "Title should contain below 100 charachters.")
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="youtubeLink"
                    label="Youtube Link"
                    fullWidth
                    value={video?.videoDatabyId?.youtubeLink}
                    inputRef={register({
                      required: true,
                      pattern: /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?[\w\?‌​=]*)?/,
                    })}
                    error={!!(errors.youtubeLink)}
                    helperText={
                     (errors.youtubeLink?.type === "required" &&
                       "Add youtube link") ||
                     (errors.youtubeLink?.type === "pattern" &&
                       "Invalid youtube link")
                   }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    name="artist"
                    label="Artist"
                    value={video?.videoDatabyId?.artist}
                    fullWidth
                    inputRef={register({ required: true, maxLength: 75 })}
                    error={!!(errors.artist)}
                    helperText={
                     (errors.title?.type === "required" &&
                       "Add artist name") ||
                     (errors.title?.type === "maxLength" &&
                       "Artist name should contain below 75 charachters.")
                   }
                  />
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Select
                    name="genre"
                    value={video?.videoDatabyId?.genre}
                    className={classes.Select}
                    fullWidth
                    onChange={handleSelectGenre}
                  >
                    <MenuItem value="Pop">Pop</MenuItem>
                    <MenuItem value="Rock">Rock</MenuItem>
                    <MenuItem value="Hiphop">Hiphop</MenuItem>
                    <MenuItem value="Rythm & Blues">Rythm & Blues</MenuItem>
                    <MenuItem value="Country">Country</MenuItem>
                  </Select>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    name="description"
                    value={video?.videoDatabyId?.description}
                    className={classes.description}
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    variant="filled"
                    inputRef={register({ required: true, maxLength: 250 })}
                    error={!!(errors.description)}
                    helperText={
                     (errors.description?.type === "required" &&
                       "Add description") ||
                     (errors.description?.type === "maxLength" &&
                       "Description should contain below 250 charachters.")
                   }
                  />
                </Grid>
              </Grid>
            </div>
          </CardContent>
          <CardActions>
            <Button
              className={classes.actions}
              startIcon={<RestorePage />}
              variant="contained"
              size="small"
              onClick={() => {
                reset();
              }}
            >
              Reset
            </Button>
            <Button
              type="submit"
              size="small"
              variant="contained"
              startIcon={<Save />}
              color="primary"
              disabled={!!(video?.editing)}
            >
              Save
              {video?.editing ? 
                <CircularProgress
                  size={20}
                  className={classes.CircularProgress}
                />
                : ''
              }
            </Button>
          </CardActions>
        </Card>
      </form>
      : '' }
    </>
             
  );
}

const useStyle = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(12),
    marginLeft: theme.spacing(4),
  },
  card: {
    width: "90%",
    height: "inherit",
  },
  gridList: {
    width: "100vw",
    height: "inherit",
  },
  Grid: {
    marginTop: "1em",
  },
  cardHeader: {
    padding: theme.spacing(2),
    fontSize: "35px",
  },
  headerUnderline: {
    marginLeft: theme.spacing(2),
    width: theme.spacing(5),
    height: theme.spacing(1),
    backgroundColor: "#a00fc7",
  },
  form: {
    marginLeft: theme.spacing(1),
    marginTop: theme.spacing(-5),
  },
  shiftAll: {
    width: `calc(100% - ${240}px)`,
    marginLeft: 240,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  Select: {
    marginTop: "1em",
  },
  actions: {
    marginLeft: "auto",
  },
  Button: {},
  description: {
    backgroundColor: "#F9DDD1",
  },
  CircularProgress: {
    marginLeft: theme.spacing(1),
  },
}));
