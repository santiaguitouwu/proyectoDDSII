import React, { useState } from 'react';
import './Dashboard.css';
import Card from '../../components/Card';
import ModalCreate from '../../components/Modal';
import ModalEdit from '../../components/Modal';
import FormCreatePet from '../../components/FormCreatePet';
import crearMascotaImg from '../../assets/img/img.jpg';
import crearMascotaImg2 from '../../assets/img/img2.jpg';
import crearMascotaImg3 from '../../assets/img/img3.jpg';
import crearMascotaImg4 from '../../assets/img/img4.jpg';
import crearMascotaImg5 from '../../assets/img/img5.jpg';

const Dashboard = () => {
    const [isModalOpen, setModalOpen] = useState({ create: false, edit: false });
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [crearMascotaImg, crearMascotaImg2, crearMascotaImg3, crearMascotaImg4, crearMascotaImg5];

    const openModal = (type) => setModalOpen({ ...isModalOpen, [type]: true });
    const closeModal = () => setModalOpen({ create: false, edit: false });

    const handleHomeRedirect = () => {
        window.location.href = '/';
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const renderModal = (type) => (
        <div className="modal">
            <div className="modal-content">
                <h2>{type === 'create' ? 'Crear Mascota' : 'Editar Mascota'}</h2>
                <form>
                    <label>
                        Nombre:
                        <input type="text" name="nombre" required />
                    </label>
                    <label>
                        Edad:
                        <input type="number" name="edad" required />
                    </label>
                    <label>
                        Tipo:
                        <input type="text" name="tipo" required />
                    </label>
                    <button type="submit">{type === 'create' ? 'Guardar' : 'Actualizar'}</button>
                </form>
                <button onClick={closeModal}>Cerrar</button>
            </div>
        </div>
    );

    return (
        <div className="home-container">
            <header className="navbar1">
                <h3>BIENVENIDO!</h3>
            </header>

            <aside className="sidebar">
                <button onClick={handleHomeRedirect}>Salir</button>
                <button onClick={() => openModal("create")}>Crear Mascota</button>
                <button onClick={() => openModal("edit")}>Editar Mascota</button>
            </aside>

            <main>
                <div className="carousel">
                    <button className="carousel-btn prev" onClick={goToPrevious}>&#8249;</button>
                    <div className="carousel-track">
                        <img src={images[currentIndex]} />
                    </div>
                    <button className="carousel-btn next" onClick={goToNext}>&#8250;</button>
                </div>

                {isModalOpen.create && renderModal('create')}
                {isModalOpen.edit && renderModal('edit')}

                <div className="card-container">
                    <Card labelAction={"CREATE"} onActionBtn={openModal} actionIcon={<img src={crearMascotaImg} alt="Crear Mascota" />} />
                    <Card labelAction={"EDIT"} onActionBtn={openModal} actionIcon={<img src={crearMascotaImg2} alt="Editar Mascota" />} />
                </div>

                <ModalCreate titleModal={"Crear Mascota"} isOpen={isModalOpen.create} onClose={closeModal}>
                    <FormCreatePet />
                </ModalCreate>

                <ModalEdit titleModal={"Editar Mascota"} isOpen={isModalOpen.edit} onClose={closeModal}>
                    <h5>Modal para editar mascota</h5>
                </ModalEdit>
            </main>
        </div>
    );
};

export default Dashboard;