import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated } from '../actions/auth';
import { load_user } from '../actions/profile';

const Layout = ({ children, checkAuthenticated, isAuthenticated, load_user }) => {
    useEffect(() => {
        checkAuthenticated();
        if (isAuthenticated)
            load_user();
    }, []);

    return (
        <Fragment>
            {children}
        </Fragment>
    );
};
const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
  });
  
export default connect(mapStateToProps, { checkAuthenticated, load_user })(Layout);