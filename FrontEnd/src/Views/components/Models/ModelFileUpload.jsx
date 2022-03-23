import React ,{useState} from 'react'

import {
    Button,
    Card,
    CardHeader,
    CardBody,
    FormGroup,
    Form,
    Input,
    Modal,
    Label,
} from "reactstrap";
import FileUpload from "../inputs/FileUpload.jsx"
import "../../../Assets/css/Inputs.css"

// import 'bootstrap/dist/css/bootstrap.min.css';
export default function ModelFileUpload(props) {
    return (
        <Modal
            className="modal-dialog-centered"
            isOpen={props.isOpen}>
            <div className="modal-body p-0 row align-self-center">
                <Card className="shadow border-0 cardModelUploadFile">
                    <CardHeader className="bg-transparent pb-1">
                        <h3>Upload your file</h3>
                    </CardHeader>
                    <CardBody className="px-lg-5 py-lg-10">
                        <Form role="form">
                            <FileUpload data={props.data}  setData= {props.setData} setModal={props.setModal}/>
                        </Form>
                    </CardBody>
                </Card>
            </div >
        </Modal>
    )
}