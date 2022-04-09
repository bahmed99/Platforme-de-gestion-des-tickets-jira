import axios from "axios";
export default async function PostData(props) {
    
    props.setLoading(true)
     axios
      .post(
        "http://localhost:5000/user/login",

        {
          email: props.email,
          password: props.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        props.setLoading(false)

        localStorage.setItem("jwt", res.data.token);
        props.setSuccess(true);
        setTimeout(() => props.setSuccess(false), 2500);
        setTimeout(() => props.Navigate("/"), 500);
        setTimeout(() => window.location.reload(), 500);

      })
      .catch((err) => {
        props.setError(true)
        props.setLoading(false)

        setTimeout(() => props.setError(false), 2500);
      });
}