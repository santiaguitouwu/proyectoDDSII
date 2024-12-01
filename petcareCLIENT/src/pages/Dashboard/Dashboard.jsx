import { useState, useEffect } from 'react';
import './Dashboard.css';
// import Card from '../../components/Card';
import ModalCreate from '../../components/Modal';
import ModalEdit from '../../components/Modal';
import FormCreatePet from '../../components/FormCreatePet';
import crearMascotaImg from '../../assets/img/img.jpg';
import crearMascotaImg2 from '../../assets/img/img2.jpg';
import crearMascotaImg3 from '../../assets/img/img3.jpg';
import crearMascotaImg4 from '../../assets/img/img4.jpg';
import crearMascotaImg5 from '../../assets/img/img5.jpg';

const Dashboard = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [crearMascotaImg, crearMascotaImg2, crearMascotaImg3, crearMascotaImg4, crearMascotaImg5];
    const [isModalCreateOpen, setModalCreateOpen] = useState(false);
    const [isModalEditOpen, setModalEditOpen] = useState(false);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        // Leer el usuario del localStorage
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.username) {
            setUserName(storedUser.username);
        }
    }, []);

    const openModal = (action) => {
        if (action === "CREATE") {
            setModalCreateOpen(true);
            setModalEditOpen(false);  
        }
        if (action === "EDIT") {
            setModalEditOpen(true);
            setModalCreateOpen(false);  
        }
    };

    const closeModal = () => {
        setModalCreateOpen(false);
        setModalEditOpen(false);
    };

    const handleHomeRedirect = () => {
        window.location.href = '/';
    };

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="home-container">
            <header className="navbar1">
                <h3>¡HOLA!, {userName}!</h3>
            </header>

            <aside className="sidebar">
                <button onClick={handleHomeRedirect}>Salir</button>
                <button onClick={() => openModal("CREATE")}>Crear Mascota</button>
                <button onClick={() => openModal("EDIT")}>Editar Mascota</button>
            </aside>

            <main>
                <div className="carousel">
                    <button className="carousel-btn prev" onClick={goToPrevious}>&#8249;</button>
                    <div className="carousel-track">
                        <img src={images[currentIndex]} alt="Imagen carrusel" />
                    </div>
                    <button className="carousel-btn next" onClick={goToNext}>&#8250;</button>
                </div>

                {/* Modal para Crear Mascota */}
                {isModalCreateOpen && (
                    <ModalCreate titleModal={"Crear Mascota"} isOpen={isModalCreateOpen} onClose={closeModal}>
                        <FormCreatePet />
                    </ModalCreate>
                )}

                {/* Modal para Editar Mascota */}
                {isModalEditOpen && (
                    <ModalEdit titleModal={"Editar Mascota"} isOpen={isModalEditOpen} onClose={closeModal}>
                        <h5>Modal para editar mascota</h5>
                    </ModalEdit>
                )}

                
            </main>
        </div>
    );
};

export default Dashboard;
