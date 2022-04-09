import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';

import ReactLoading from "react-loading";
import Alert from "react-bootstrap/Alert";
import PostData from "../../Actions/UploadFileAction"


export default function FileUpload(props) {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (file) => {
        setFile(file[0]);
    };
    const informations={setModal:props.setModal,"data":props.data,"setData":props.setData,"error":error,"success":success,"loading":loading,"setError":setError,"setSuccess":setSuccess,"setLoading":setLoading,"file":file}

    return (
        <div style={{ textAlign: "Center" }}>
            <Alert
                show={success}
                variant={"success"}
                style={{ width: "700px", margin: "auto auto" }}
            >
                {"File uploaded successfully"}
            </Alert>

            <Alert
                show={error}
                variant={"danger"}
                style={{ width: "700px", margin: "auto auto" }}
            >
                {"Error"}
            </Alert>
            <br/>
            <DropzoneArea onChange={handleChange} filesLimit={1} acceptedFiles={[".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]} maxFileSize={9999999999} />
            <button className='btn' style={{
                marginTop:"10px",
                padding:"12px",
                backgroundColor: loading ? "#1f212d" : "#1f212d",
            }} disabled={loading} onClick={() => PostData(informations)}>{loading ? (
                <ReactLoading
                    height={"30px"}
                    width={"30px"}
                    type="spin"
                />
            ) : (
                "Upload"
            )}</button>
        </div>

    );
}
