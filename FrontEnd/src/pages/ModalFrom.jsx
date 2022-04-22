import React from 'react';
import From from '../components/FormulaireModel/FormulaireModele';
import ContactInfo from "../components/FormulaireModel/ContactInfo"
import '../Assets/css/ModalForm.style.css'
const ModalForm = () => {
    return (
        <div className={'contact-page-area-wrapper sp-y inscriptionpage'}>
            <div className="container">
                <div className="contact-content-wrap col-lg-10 ">
                    <div className="row">
                        <div className="col-lg-9">
                            <div className="contact-form-area contact-method">
                                <From/>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="contact-information contact-method">
                                <div className="contact-info-con">
                                    
                                    <ContactInfo/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalForm;