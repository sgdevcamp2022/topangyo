export function SignInBox({placeHolder}) {
    return(
        <>
            <input type = "text" style = {{
                width : "30%",
                height : "34px",
                margin : "15px auto",
                textAlign : "center",
                borderRadius: "7px",
                border: "solid 2px #000000",
                color : "black"
            }} className= "button"
            placeholder="{placeHolder}" >
            </input>
        </>
    );
}