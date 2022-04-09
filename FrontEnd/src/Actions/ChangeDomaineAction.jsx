import axios from "axios"
export default async function ChangeDomaine(props) {
    
    props.setLoading(true)
    const data = {
        domaine: props.domaine,
        token:props.token,
        password:props.password

      };
      axios
        .put("http://localhost:5000/user/change-domaine", data, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("jwt"),
          },
        })
        .then((result) => {
        
          props.setLoading(false)
          props.setSuccess(true);
          setTimeout(() => props.setSuccess(false), 2500);
          props.setModal(false)
          window.location.reload();

        })
        .catch((err) => {
          props.setError(true)
          props.setLoading(false)
          setTimeout(() => props.setError(false), 2500);
        });
}