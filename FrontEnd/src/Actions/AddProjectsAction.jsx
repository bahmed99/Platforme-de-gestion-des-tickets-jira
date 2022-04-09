import axios from "axios"
export default async function GetData(props) {
    
    
    const info = {
        selected_projects: props.selectedprojects,
      };
      axios
        .put("http://localhost:5000/projects/UpdateProjects", info, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("jwt"),
          },
        })
        .then((result) => {
          props.setModal(false)
          props.setIcons(result.data.data)
          
          props.setData(props.selectedprojects)
        })
        .catch((err) => {
          
        });
}