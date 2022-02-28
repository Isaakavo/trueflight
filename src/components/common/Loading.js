import React from 'react';

import FlightIcon from '@mui/icons-material/Flight';

import Wrapper from './Wrapper';
import '../../styles/loading.css'

const Loading = () => {
return (
  <Wrapper>
    <FlightIcon sx={{ fontSize: 50 }} className='loading-icon' fontSize='large' />
    <div>
      <h1 className='loading-text'>Loading...</h1>
    </div>
  </Wrapper>
)
}

export default Loading;