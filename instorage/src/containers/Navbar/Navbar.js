import React from 'react';
import { AuthUserContext } from '../../Session';
import AuthNav from './AuthNav';
import NoAuthNav from './NoAuthNav';

const Navbar = () => {
  return (
    <div>
      <style type="text/css">
        {`
          .header {
            background-color: #7CC6FE;
          }
        `}
      </style>
      <AuthUserContext.Consumer>
          {authUser =>
            authUser ? <AuthNav /> : <NoAuthNav />
          }
      </AuthUserContext.Consumer>
    </div>
  )
}

export default Navbar;
