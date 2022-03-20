import React, { useState } from 'react';
import { DropzoneArea } from 'material-ui-dropzone';
import axios from 'axios';
import ReactLoading from "react-loading";
import Alert from "react-bootstrap/Alert";


export default function FileUpload() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const handleChange = (file) => {
        setFile(file[0]);
    };

    const uploadFile = () => {


        if (file) {

            setLoading(true)
            let data = new FormData()
            data.append("file", file)
            axios.post("http://127.0.0.1:5000/file/", data, {
                headers: {
                    "Authorization": localStorage.getItem("jwt")
                },
            }).then(res => {
                setSuccess(true)
                setLoading(false)
                setTimeout(() => setSuccess(false), 2000);

            }).catch(err => {
                setLoading(false)
                setError(true)
                console.log(err)
                setTimeout(() => setError(false), 2000);

            })
        }

    }




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
            }} disabled={loading} onClick={() => uploadFile()}>{loading ? (
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
