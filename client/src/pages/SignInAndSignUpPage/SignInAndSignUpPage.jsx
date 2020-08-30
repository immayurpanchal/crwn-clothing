import React from 'react';
import SignIn from '../../components/SignIn';
import SignUp from '../../components/SignUp';
import './SignInAndSignUpPage';
import './SignInAndSignUpPage.scss';

const SignInAndSignUpPage = () => {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUp />
    </div>
  );
};

export default SignInAndSignUpPage;
