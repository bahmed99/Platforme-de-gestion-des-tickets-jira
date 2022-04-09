import axios from "axios"
export default async function ChangePassword(props) {
    
    props.setLoading(true)
    const data = {
        oldPassword: props.oldPassword,
        newPassword:props.newPassword

      };
      axios
        .put("http://localhost:5000/user/change-password", data, {
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

        })
        .catch((err) => {
          props.setError(true)
          props.setLoading(false)
          setTimeout(() => props.setError(false), 2500);
        });
}