import { Component } from "react";
import {Button} from "./../components/SignInPage/Button";
import {SignInBox} from "./../components/SignInPage/SignInBox";

export function SignInPage() {
    return(
        <>
        <SignInBox holderText="ID">
        </SignInBox>
        <SignInBox holderText="PassWord">
        </SignInBox>

        <Button text = "Login">
        </Button>
        </>
    );
}