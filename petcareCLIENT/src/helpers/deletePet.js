export const deletePet = async (id) => {
    try {
        const response = await fetch(`http://localhost:8000/api/v1/pet/${id}/`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la mascota');
        }
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
