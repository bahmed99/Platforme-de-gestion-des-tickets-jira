import React ,{useState} from "react";
import { useParams } from "react-router-dom";
import FilterBar from "../components/Filterbar.js";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
export default function Project() {
  const { project } = useParams();

  const [data, setData] = useState([]);

  return (
    <div className="container-scroller">
      <div>
        <Sidebar data={data} setData={setData} loading={false}/>
        <div className="container-fluid page-body-wrapper">
          <Navbar />
        </div>
        <div className="main-panel">
          <div className="content-wrapper">
          <FilterBar />
          </div>
        </div>
       
      </div>
    </div>
  );
}
