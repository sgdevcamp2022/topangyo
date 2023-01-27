export function SignInBox({holderText}) {
    return(
        <>
        <div style = {{
            display: "flex",
            justifyContent: "center",
        }}>
            <input type = "text" style = {{
                width : "30%",
                height : "34px",
                margin : "5px auto",
                borderRadius: "7px",
                border: "solid 2px #868e96",
                paddingLeft : "5px",
                color : "black"
            }} className= "button"
            placeHolder={holderText} >
            </input>
            </div>
        </>
    );
}