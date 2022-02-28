import Wrapper from './Wrapper';

import '../../styles/errorScreen.css';

const ErrorScreen = ({ children }) => {
  return (
    <Wrapper>
      <div className='error-container'>
        <p style={{ fontSize: '100px' }}>😖</p>

        {children}
      </div>
    </Wrapper>
  );
};

export default ErrorScreen;
