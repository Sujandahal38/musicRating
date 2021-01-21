import React from 'react';
import Youtube from 'react-youtube';

const ViewVideoCard = ({ video}) => {
    document.title = video.title;
    const opts = {
        height: '450',
        width: '100%',
        playerVars: {
          autoplay: 1,
        },
    }
  return (
    <>
      <Youtube opts={opts}   videoId={video.embedCode} />
    </>
  );
};


export default ViewVideoCard;
