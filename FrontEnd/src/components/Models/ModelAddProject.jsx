import { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Form,
  Modal
} from "reactstrap";

import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import PostData from "../../Actions/AddProjectsAction"


export default function ModelAddProject(props) {
 
  const [projets, setProjets] = useState([]);
  const [selectedprojects , setSelectedprojects] = useState([])
  const [selectedoptions, setSelectedoptions] = useState([]);
  const [options, setOptions] = useState([]);


  const informations={"setModal":props.setModal,"setData":props.setData,"options":options,"setOptions":setOptions,"projets":projets,"setProjets":setProjets,"selectedprojects":selectedprojects,"setSelectedprojects":setSelectedprojects,"selectedoptions":selectedoptions,"setSelectedoptions":setSelectedoptions}


  useEffect(() => {
    setOptions([])
      for (let i=0 ; i<props.difference.length ; i++)
      {
        setOptions((prevProjets) => [...prevProjets,{label: props.difference[i],value: props.difference[i]}]);
      }
      setProjets(props.data)
      

  }, [props.difference])

  

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
    setSelectedprojects(props.data)
    for (let i=0 ; i<selectedoptions.length ; i++)
    {
      const B = selectedoptions[i].label
      setSelectedprojects((prevValue) => [...prevValue, B]);
    }
    
    
  }, [selectedoptions]);
  


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
                  onClick={()=>PostData(informations)}
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