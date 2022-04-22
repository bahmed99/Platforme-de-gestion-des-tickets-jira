import axios from 'axios'

export default async function GetNotifications(props) {
  props.setLoading(true)
    axios.get("http://localhost:5000/notifications/",{
      headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem("jwt"),
      },
    }).then(res=>{
      props.setLoading(false)

        props.setData(res.data.data)
       

    }).catch(err=>{
      console.log(err)
    })
}