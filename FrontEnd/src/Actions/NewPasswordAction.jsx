import axios from "axios";
export default async function PostData(props) {


      
        props.setLoading(true)
        axios
          .post(
            "http://localhost:5000/user/new-password",
  
            {
              password: props.password,
              token: props.token,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
          .then((res) => {
            props.setLoading(false)
            props.setSuccess(true);
            setTimeout(() => props.setSuccess(false), 2500);
            setInterval(function () {
                props.Navigate("/sign-in");
            }, 2000);
            
          })
          .catch((err) => {
            props.setLoading(false)
  
            props.setError(true);
            setTimeout(() => props.setError(false), 2500);
          });
     
}