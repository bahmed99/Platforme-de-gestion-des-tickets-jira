import axios from "axios"
export default async function GetUser(props) {
    
    axios.get("http://localhost:5000/user/user",{
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("jwt"),
      },
    }).then(res=>{
      props.setUser(res.data.user)
  

    }).catch(err=>{
      console.log(err)
    })
}