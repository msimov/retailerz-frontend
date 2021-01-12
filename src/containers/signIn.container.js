import React from "react";
import { GoogleSignInForm } from "../components/googleSignInForm.component";
import { PasswordForgetLink } from "../components/passwordForgetLink.component";
import { SignInForm } from "../components/signInForm.component";

const SignIn = () => (
    <div>
        <SignInForm/>
        <GoogleSignInForm/>
        <PasswordForgetLink/>
    </div>
);

export default SignIn;
