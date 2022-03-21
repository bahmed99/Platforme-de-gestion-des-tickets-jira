import { useState } from "react";
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



import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";

import axios from "axios";

export default function SelectProjects(props) {
  const [title, setTitle] = useState("");
  const user = JSON.parse(localStorage.getItem("user"));
  const [projets, setProjets] = useState([])
  const [options, setOptions] = useState([])

  

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      color: state.selectProps.menuColor,
    }),

    
  };

  const onClickAjouterSeance = async () => {
    fetch(`http://localhost:5000/projects/projects`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt")
            },
        }).then(res => res.json())
            .then(result => {
                for(let i=0 ; i<result.length ; i++)
                {
                  setProjets(prevProjets => ([...prevProjets, result[i].name]))

                  setOptions(prevProjets => ([...prevProjets, {label: result[i].name, value: result[i].name } ]))

                }
            })
  };

  return (
    <Modal
      className=" modal-dialog-centered "
      size="sm"
      isOpen={props.isOpen}
      style={{ marginRight: "auto", marginLeft: "auto" }}
      toggle={() => {
        props.setModal(!props.isOpen);
      }}
    >
      <div className="modal-body p-0 row align-self-center">
        <Card className=" shadow border-0 CardStyle">
          <CardHeader className="bg-transparent pb-1">
            <h3>Select Projects</h3>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-10">
            <Form role="form">
              <ReactMultiSelectCheckboxes
                options={options}
                styles={customStyles}
                width="300px"
                menuColor="black"
              />

              <div className="text-center">
                <Button
                  className="btn btn-outline-danger   CardButtonStyle"
                  color="transparent"
                  type="button"
                  onClick={(e) => onClickAjouterSeance()}
                >
                  Ajouter
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Modal>
  );
}
