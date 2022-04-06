import axios from "axios"
export default async function GetData(props) {
    
    axios.get("http://localhost:5000/user/username",{
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("jwt"),
      },
    }).then(res=>{
      props.setUsername(res.data)

    }).catch(err=>{
      console.log(err)
    })
}