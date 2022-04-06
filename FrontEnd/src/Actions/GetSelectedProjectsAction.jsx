export default async function GetData(props) {
    
    fetch(`http://127.0.0.1:5000/projects/GetSelectedProjects`, {
        method: "get",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("jwt"),
        },
      })
        .then((res) => res.json())
        .then((result) => {
          props.setLoading(false);
          props.setData(result.projects.selected_projects);
          props.setAllProject(result.projects.all_projects)
        });
}