import { useState, useEffect } from "react";
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
  const [projets, setProjets] = useState([]);
  const [selectedprojects , setSelectedprojects] = useState([])
  const [selectedoptions, setSelectedoptions] = useState([]);
  const [options, setOptions] = useState([]);


  function onChange(value, event) {
    if (event.action === "select-option" && event.option.value === "*") {
      this.setState(this.options);
    } else if (
      event.action === "deselect-option" &&
      event.option.value === "*"
    ) {
      this.setState([]);
    } else if (event.action === "deselect-option") {
      this.setState(value.filter((o) => o.value !== "*"));
    } else if (value.length === this.options.length - 1) {
      this.setState(this.options);
    } else {
      this.setState(value);
    }
  }

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      color: state.selectProps.menuColor,
    }),

  };

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/projects/projects`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("jwt"),
      },
    })
      .then((res) => res.json())
      .then((result) => {
        for (let i = 0; i < result.length; i++) {
          setProjets((prevProjets) => [...prevProjets, result[i].name]);

          setOptions((prevProjets) => [
            ...prevProjets,
            { label: result[i].name, value: result[i].name },
          ]);
        }
      });
  }, []);

  useEffect(() => {
    setSelectedprojects([])
    for (let i=0 ; i<selectedoptions.length ; i++)
    {
      const B = selectedoptions[i].label
      setSelectedprojects((prevValue) => [...prevValue, B]);
    }
  }, [selectedoptions]);

  const onClickAjouterSeance = async () => {
      const data = {
        all_projects: projets,
        selected_projects: selectedprojects,
      };
      axios
        .post("http://localhost:5000/projects/SaveProjects", data, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("jwt"),
          },
        })
        .then((result) => {
          props.setModal(false)
        
        props.setData(selectedprojects)
        })
        .catch((err) => {
          
        });


  };

      }


  


  return (
    <Modal

      className=" modal-dialog-centered "
      size=""

      isOpen={props.isOpen}
      toggle={() => {
        props.setModal(!props.isOpen);
      }}
    >
      <div className="modal-body p-0 row align-self-center">
        <Card className="shadow border-0 CardStyle">
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
                value={selectedoptions}
                onChange={onChange}
                setState={setSelectedoptions}
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
