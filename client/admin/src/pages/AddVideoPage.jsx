import React from 'react';
import AddVideoForm from '../components/Forms/addVideoForm';
import VideoList from '../components/Lists/VideoList';
import { makeStyles } from '@material-ui/core';

export default function AddVideoPage() {
  const classes = useStyle(); 
 return (
  <>
  <div className={classes.root}>
    <AddVideoForm/>
    <VideoList/>
    </div>
  </>
 )
}

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  }
}))