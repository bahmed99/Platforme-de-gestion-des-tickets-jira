import React, { useState } from "react";

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
import ChangePassword from "../../Actions/ChangePasswordAction";
import ReactLoading from "react-loading";
import Alert from "react-bootstrap/Alert";

// import 'bootstrap/dist/css/bootstrap.min.css';
export default function ModelResetPassword(props) {
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const informations = {
    setModal: props.setModal,
    setSuccess: setSuccess,
    setError: setError,
    newPassword: newPassword,
    oldPassword: oldPassword,
    loading: loading,
    setLoading: setLoading,
  };
  return (
    <Modal
      className="modal-dialog-centered"
      isOpen={props.isOpen}
      toggle={() => {
        props.setModal(!props.isOpen);
      }}
    >
      <div className="modal-body p-0 row align-self-center">
        <Card className="shadow border-0 CardStyleReset">
          <CardHeader className="bg-transparent pb-1">
            <h3>Change password</h3>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-10">
            <Form role="form">
              <Alert
                show={success}
                variant={"success"}
                style={{ width: "100%", height: "20", margin: "auto auto" }}
              >
                {"Password changed successfully"}
              </Alert>
              <Alert
                show={error}
                variant={"danger"}
                style={{ width: "100%", height: "20", margin: "auto auto" }}
              >
                {"Check your old password"}
              </Alert>
              <FormGroup>
                <Label>Old Password</Label>
                <Input
                  type="password"
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                />
              </FormGroup>
              <FormGroup>
                <Label>New Password</Label>
                <Input
                  type="password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </FormGroup>
              <div className="text-center">
                <Button
                  className="my-4"
                  style={{backgroundColor:"#d81e05"}}
                  type="button"
                  onClick={() => ChangePassword(informations)}
                >
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
      </div>
    </Modal>
  );
}
