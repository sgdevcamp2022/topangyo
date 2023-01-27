import { Component } from "react";
import {Button} from "./../components/SignInPage/Button";
import {SignInBox} from "./../components/SignInPage/SignInBox";

export function SignInPage() {
    return(
        <>
        <SignInBox placeHolder="ID">
        </SignInBox>
        <SignInBox placeHolder="PassWord">
        </SignInBox>

        <Button text = "Login">
        </Button>
        </>
    );
}