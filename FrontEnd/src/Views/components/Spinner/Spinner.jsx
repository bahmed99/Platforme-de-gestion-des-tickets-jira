import { useState } from "react";
import { css } from "@emotion/react";
import CircleLoader from "react-spinners/CircleLoader";

const override = css`
  display: flex;
  margin: auto auto auto auto;
  border-color: red;
    align-items: center;
    justify-content: center;
`;


export default function Spinner(props) {
    
   
    return (
        <div className="sweet-loading">
            <CircleLoader color={"#1f212d"} loading={props.loading} css={override} size={150} />
        </div>
    )
}
