import React from "react";
import { GoogleSignInForm } from "../components/googleSignInForm.component";
import { SignInForm } from "../components/signInForm.component";

const SignIn = () => (
    <div>
        <SignInForm/>
        <GoogleSignInForm/>
    </div>
);

export default SignIn;
