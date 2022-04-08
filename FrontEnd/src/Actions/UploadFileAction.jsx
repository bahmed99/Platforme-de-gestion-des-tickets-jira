import axios from "axios";
export default async function PostData(props) {
    
    
    props.setLoading(true)
    let data = new FormData()
    data.append("file", props.file)
    axios.post("http://127.0.0.1:5000/file/", data, {
        headers: {
            "Authorization": localStorage.getItem("jwt")
        },
    }).then(res => {
        
        
        axios.get("http://127.0.0.1:5000/projects/GetProjectsFromFile",{

            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("jwt"),
              }
        }).then(res=>{
            props.setData(res.data.projects)
            props.setModal(false)
            props.setLoading(false)
            props.setSuccess(true)
            setTimeout(() => props.setSuccess(false), 2000);

            
        }).catch(err=>{
            console.log(err)
        })

    }).catch(err => {
        props.setLoading(false)
        props.setError(true)
        console.log(err)
        setTimeout(() => props.setError(false), 2000);

    })
}