import React from "react"

export default function Die(props) {

    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "rgb(229, 227, 227)"
    }

    return(
        <div className="die-face" style={styles} onClick={props.holdDice}>
            {props.value}
        </div>
    )
}