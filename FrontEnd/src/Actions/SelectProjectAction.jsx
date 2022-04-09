import axios from "axios";
export default async function PostData(props) {
    const data = {
        all_projects: props.projets,
        selected_projects: props.selectedprojects
        
      
      };
      axios
        .post("http://localhost:5000/projects/SaveProjects", data, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("jwt"),
          },
        })
        .then((result) => {
          
          
          props.setData(props.selectedprojects)
          props.setIcons(result.data.data)
          props.setModal(false)
        })
        .catch((err) => {
          
        });

}