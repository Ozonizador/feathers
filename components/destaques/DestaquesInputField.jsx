import React from 'react'
import {GoogleApiWrapper} from 'google-maps-react';
import InputField from '../home/homeInputFeild/HomeInputFeild'
import ContaCards from '../../components/contacard/Contacards'
import Modal from '../../components/modal/Modal'
import Notification from '../../components/notification/Notification'
import Profileinput from '../../components/profileinput/Profileinput'
import Pg4 from '../../components/pg4_5homecard/Pg4_5homecard'
import DestaquesSelection from '../../components/pg4_5selection/Pg4_5selection'
// import Pg4Input from '../../components/pg4_5input/Pg4_5input'
// import Maps from '../../components/maps/Maps'



const DestaquesInputField = () => {
    return (
        <>
            <header style={{ marginBottom: "0" }}>
                <div className="container-fluid ">
                    <div className="ycontainer-md">
                        <div className="" style={{ display:'flex', justifyContent: "center", margin:'2rem 0' }}>
                            <InputField />
                        </div>


                        {/* <ContaCards />
                        <Modal />
                        <Notification />
                        <Profileinput />
                        <Pg4 />
                        <DestaquesSelection /> */}
                        
                    </div>

                </div>

            </header>
        </>
    )
}

export default DestaquesInputField