import React, { useState } from 'react';
import { SignIn } from '../components/organisms/SignIn';
import { SignUp } from '../components/organisms/SignUp';

export const Auth = () => {
    const [isSignIn, setIsSignIn] = useState(true);

    return (
        <div>
            {isSignIn ? (
                <SignIn value={'Register'} setIsSignIn={setIsSignIn} />
            ) : (
                <SignUp value={'Login'} setIsSignIn={setIsSignIn} />
            )}
        </div>
    );
};
