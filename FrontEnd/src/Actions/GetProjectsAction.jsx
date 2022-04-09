export default async function GetData(props) {
    
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
            props.setProjets((prevProjets) => [...prevProjets, result[i].key]);
  
            props.setOptions((prevProjets) => [
              ...prevProjets,
              { label: result[i].key, value: result[i].key},
            ]);
          }
        });
}