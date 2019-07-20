import React from 'react';
 import Loader from 'react-loader-spinner';

const loadingScreen = (props) => {
  return(
  <div className="spinner">
  <Loader
         type="Plane"
         color="#00BFFF"
         height="100"
         width="100"
      />
  </div>
  )
}

export default loadingScreen;
