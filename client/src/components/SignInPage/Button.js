export function Button({text}) {
    return(
        <>
            <div style = {{
                width : "30%",
                height : "34px",
                margin : "15px auto",
                textAlign : "center",
                borderRadius: "7px",
                backgroundColor : "#4B89DC",
                color : "black"
            }} className= "button">
                {text}
            </div>
        </>
    );
}