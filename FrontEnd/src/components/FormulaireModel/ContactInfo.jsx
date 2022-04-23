import React,{Fragment} from 'react';
import { Link } from 'react-router-dom';


const ContactInfo = ({address}) => {
    return (
        <Fragment>
            <div className="widget-item m-0">
             
                <Link to="/"><img src={require('../../Assets/images/1.png')} width="100%" alt=""/></Link>
            </div>
        </Fragment>
    );
};

export default ContactInfo;