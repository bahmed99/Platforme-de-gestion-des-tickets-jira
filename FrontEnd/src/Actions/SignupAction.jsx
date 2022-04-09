import axios from "axios";
export default async function PostData(props) {
    
    props.setLoading(true);
    const data = {
      name: props.name,
      email: props.email,
      password: props.password,
      token:  props.jira_token,
      domaine:  props.jira_domaine,
    };
   
    axios
      .post("http://localhost:5000/user/signup", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        props.setSuccess(true)
        props.setLoading(false);

        props.setName("");
        props.setEmail("");
        props.setPassword("");
        setTimeout(() =>  props.setSuccess(false), 2500);
        props.Navigate("/sign-in");
      })
      .catch((err) => {
        props.setLoading(false);
        props.setError(true);
        setTimeout(() =>  props.setError(false), 2500);

        props.setName("");
        props.setEmail("");
        props.setPassword("");
      });
}