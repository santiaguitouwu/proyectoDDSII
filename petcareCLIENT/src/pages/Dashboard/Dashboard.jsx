import React, { act, useState } from 'react';

import './Dashboard.css';

import Card from '../../components/Card';
import ModalCreate from '../../components/Modal';
import ModalEdit from '../../components/Modal';
import EditPet from '../../components/EditPet';

import FormCreatePet from '../../components/FormCreatePet';

const Dashboard = () => {

    const [isModalCreateOpen, setModalCreateOpen] = useState(false);
    const [isModalEditOpen, setModalEditOpen] = useState(false);

    const openModal = (action) => {
        if (action == "CREATE") {
            setModalCreateOpen(true);
        }

        if (action == "EDIT") {
           
            setModalEditOpen(true)
        }
    }

    const closeModal = () => {
        setModalCreateOpen(false);
        setModalEditOpen(false)
    }

    const handleHomeRedirect = () => {
        window.location.href = '/';
    };

    return (
        <div className="home-container">
            <header className="navbar1">
                <nav className="navbar-menu">
                </nav>
                <button className="login-button" onClick={handleHomeRedirect}>Salir</button>
            </header>

            <main className="box-content">
                <ModalCreate isOpen={isModalCreateOpen} onClose={closeModal}>
                    <h2>Título del Modal</h2>
                    <p>Este es el contenido del modal.</p>
                    <button onClick={closeModal}>Cerrar Modal</button>
                </ModalCreate>

                <Card
                    labelAction={"CREATE"}
                    onActionBtn={openModal}
                    actionIcon={<img className='img-card' src='https://caracol.com.co/resizer/v2/2AJWYCLW5FFSXKSRWZ5ZRTZW7Q.png?auth=5bde0f36b2a56867bb692ebb604eb46c3fb16e1f6f64f039510928255c9c7f2c&width=650&height=488&quality=70&smart=true' ></img>}
                />

                <Card
                    labelAction={"EDIT"}
                    onActionBtn={openModal}
                    actionIcon={<img className='img-card' src='https://www.elpais.com.co/resizer/v2/2FKLTNJJMJE5BFAK3MIOHDE7VU.jpg?auth=bff511f3d05ee7666a635413cf79365af3a1c90ef9d1a94b4442cd825d9d37f1&smart=true&quality=75&width=1280&height=720' ></img>}
                />

   
                <ModalCreate titleModal={"CREATE PET"} isOpen={isModalCreateOpen} onClose={closeModal}>
                    <FormCreatePet  />
                </ModalCreate>

                <ModalEdit titleModal={"EDIT PET"} isOpen={isModalEditOpen} onClose={closeModal}>
                   <EditPet  />
                </ModalEdit>

            </main>
        </div>
    );
};


export default Dashboard;
