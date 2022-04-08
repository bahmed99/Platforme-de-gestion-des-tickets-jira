
export default async function PostData(props) {

    fetch(`http://localhost:5000/projects/GetReponse`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("jwt"),

      },
    })
      .then((res) => res.json())
      .then((result) => {

        props.setLoadingInformations(false);
        if (result.message === true) {
          if (result.file === false) {
            props.setAjoutSeanceModalOpen(true);
          } else {
            props.setUploadFile(true);
          }
        } else {
            props.setLoading(false);
        }
      });
     
}