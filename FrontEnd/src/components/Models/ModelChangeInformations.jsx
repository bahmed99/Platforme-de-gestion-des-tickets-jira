import React, { useState, useEffect } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  Form,
  Modal,
  Button,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import ChangeDomaine from "../../Actions/ChangeDomaineAction";
import FileUpload from "../inputs/FileUpload.jsx";

import ReactLoading from "react-loading";
import Alert from "react-bootstrap/Alert";

// import 'bootstrap/dist/css/bootstrap.min.css';
export default function ModelChangeInformations(props) {
  const [domaine, setDomaine] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);


  const informations = {
    setModal: props.setModal,
    setSuccess: setSuccess,
    setError: setError,
    domaine: domaine,
    token: token,
    loading: loading,
    setLoading: setLoading,
    setUser: props.setUser,
    password: password,
  };
  useEffect(() => {
  
    
      setDomaine(props.user.jira_domaine);
      setToken(props.user.jira_token);
    
  }, []);

  

  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={props.isOpen}
      toggle={() => {
        props.setModal(!props.isOpen);
      }}
    >
      <div className="modal-body p-0 row align-self-center">
        {props.user.jira_domaine !== "" ? (
          <Card className="shadow border-0 CardStyleDomaine">
            <CardHeader className="bg-transparent pb-1">
              <h3>Change Domaine</h3>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-10">
              <Form
                role="form"
                onSubmit={(e) => {
                  e.preventDefault();
                  ChangeDomaine(informations);
                }}
              >
                <Alert
                  show={success}
                  variant={"success"}
                  style={{ width: "100%", height: "20", margin: "auto auto" }}
                >
                  {"Domaine changed successfully"}
                </Alert>
                <Alert
                  show={error}
                  variant={"danger"}
                  style={{ width: "100%", height: "20", margin: "auto auto" }}
                >
                  {"Check your informations"}
                </Alert>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    required
                    type="password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Jira domaine</Label>
                  <Input
                    required
                    type="text"
                    value={domaine}
                    onChange={(e) => {
                      setDomaine(e.target.value);
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Jira token</Label>
                  <Input
                    required
                    type="text"
                    value={token}
                    onChange={(e) => {
                      setToken(e.target.value);
                    }}
                  />
                </FormGroup>
                <div className="text-center">
                  <Button className="my-4" color="primary" type="sumbit">
                    {loading ? (
                      <ReactLoading
                        height={"30px"}
                        width={"30px"}
                        type="spin"
                        className="loadingSpin"
                      />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </div>
              </Form>
            </CardBody>
          </Card>
        ) : (
          <Card className="shadow border-0 cardModelUploadFile">
            <CardHeader className="bg-transparent pb-1">
              <h3>Upload your file</h3>
            </CardHeader>
            <CardBody className="px-lg-5 py-lg-10">
              <Form role="form">
                <FileUpload
                  data={props.data}
                  setData={props.setData}
                  setModal={props.setModal}
                />
              </Form>
            </CardBody>
          </Card>
        )}
      </div>
    </Modal>
  );
}
