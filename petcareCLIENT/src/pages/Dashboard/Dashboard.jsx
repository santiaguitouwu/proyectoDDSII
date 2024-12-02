import { useState, useEffect } from 'react';
import './Dashboard.css';
import Card from '../../components/Card';
import ModalCreate from '../../components/Modal';
import ModalEdit from '../../components/Modal';
import EditPet from '../../components/EditPet';
import FormCreatePet from '../../components/FormCreatePet';
import crearMascotaImg from '../../assets/img/img.jpg';
import crearMascotaImg2 from '../../assets/img/img2.jpg';
import crearMascotaImg3 from '../../assets/img/img3.jpg';
import crearMascotaImg4 from '../../assets/img/img4.jpg';
import crearMascotaImg5 from '../../assets/img/img5.jpg';
import { getPets } from '../../helpers/getPets.js'; // Ajusta la ruta según tu estructura de archivos
import { deletePet } from '../../helpers/deletePet.js';


const Dashboard = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [crearMascotaImg, crearMascotaImg2, crearMascotaImg3, crearMascotaImg4, crearMascotaImg5];
    const [isModalCreateOpen, setModalCreateOpen] = useState(false);
    const [isModalEditOpen, setModalEditOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [pets, setPets] = useState([]);

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

    const consult = async () => {
        try {
            const data = await getPets();
            setPets(data);
        } catch (error) {
            console.error('Error getting pets', error);
            alert('Error getting pets', error);
        }
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('¿Estás seguro de que deseas eliminar esta mascota?');
        if (!confirmDelete) return;
    
        const success = await deletePet(id);
        if (success) {
            // Actualiza la lista de mascotas tras la eliminación
            setPets((prevPets) => prevPets.filter((pet) => pet.id !== id));
            alert('Mascota eliminada con éxito');
        } else {
            alert('Error al eliminar la mascota');
        }
    };

    useEffect(() => {
        consult();
    }, []);

    useEffect(() => {
        console.log(pets); // Verifica qué datos se están guardando en el estado
    }, [pets]);

    return (
        <div className="home-container">
            <header className="navbar1">
                <h3>¡HOLA!, {userName}!</h3>
            </header>
            <main className="box-content">
                <div className="buttons-container">
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
                </div>
                <ModalCreate titleModal={"CREATE PET"} isOpen={isModalCreateOpen} onClose={closeModal}>
                    <FormCreatePet />
                </ModalCreate>

                <ModalEdit titleModal={"EDIT PET"} isOpen={isModalEditOpen} onClose={closeModal}>
                    <EditPet />
                </ModalEdit>

                <section className="table-container">
                    <h2>Consultas a la Base de Datos</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Nombre</th>
                                <th>Especie</th>
                                <th>Raza</th>
                                <th>Edad</th>
                                <th>Descripción</th>
                                <th>Editar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Mapeamos el array pets para renderizar las filas */}
                            {pets.map((pet) => (
                                <tr key={pet.id}>
                                    <td>{pet.id}</td>
                                    <td>{pet.nombre}</td>
                                    <td>{pet.especie}</td>
                                    <td>{pet.raza}</td>
                                    <td>{pet.edad}</td>
                                    <td>{pet.descripcion}</td>
                                    <td>
                                    <button onClick={() => handleDelete(pet.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
