import axios from "axios"
export default async function DeleteNotification(df) {
    
   
      axios
        .put("http://localhost:5000/notifications/",{data: df}, {
          headers: {
            "Content-Type": "application/json",
            "Authorization": localStorage.getItem("jwt"),
          },
        })
        .then((result) => {
        
          
        })
        .catch((err) => {
         
        });
}