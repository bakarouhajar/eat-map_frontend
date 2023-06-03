import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axiosInstance from "../axiosInstance";
import AdminHeader from "./AdminHeader";
import Swal from 'sweetalert2';

function Cities() {
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [updatedCityName, setUpdatedCityName] = useState("");
    const [newCityName, setNewCityName] = useState("");
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchCities();
    }, []);

    const fetchCities = async () => {
        try {
            const response = await axiosInstance.get("/api/villes");
            const data = response.data;
            setCities(data);
        } catch (error) {
            console.error("Error fetching cities:", error);
        }
    };

    const handleDeleteCity = async (cityId) => {
        try {
            await axiosInstance.delete(`/api/villes/${cityId}`);
            fetchCities();
        } catch (error) {
            console.error("Error deleting city:", error);
        }
    };

    const handleUpdateCity = (city) => {
        setSelectedCity(city);
        setUpdatedCityName(city.nom);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedCity(null);
        setUpdatedCityName("");
    };

    const handleSaveChanges = async () => {
        try {
            if (selectedCity) {
                const updatedCity = { ...selectedCity, nom: updatedCityName };
                await axiosInstance.put(`/api/villes/${selectedCity.id}`, updatedCity);
                fetchCities();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'La ville a été modifiée avec succès',
                    showConfirmButton: false,
                    timer: 1500
                });
                handleCloseModal();
            }
        } catch (error) {
            console.error("Error updating city:", error);
        }
    };

    const handleAddCity = async () => {
        try {
            const newCity = { nom: newCityName };
            await axiosInstance.post("/api/villes", newCity);
            fetchCities();
            setNewCityName("");
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'La ville a été ajoutée avec succès',
                showConfirmButton: false,
                timer: 1500
            });
        } catch (error) {
            console.error("Error adding city:", error);
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredCities = cities.filter((city) =>
        city.nom.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <AdminHeader />
            <div className="container">
                <h1 className="mt-3" style={{ fontFamily: "cursive" }}>
                    Liste des villes
                </h1>
                <div style={{ backgroundColor: "#D3D3D3" }}>

                    <div className="container mb-4">
                        <h4>Ajouter une ville</h4>
                        <Form>
                            <div className="d-flex justify-content-center align-items-center mb-3" style={{ backgroundColor: "#D3D3D3" }}>
                                <Form.Label htmlFor="cityName" className="mr-2 mt-4">
                                    <pre>   </pre>
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    id="cityName"
                                    placeholder="Veuillez saisir le nom de la ville à ajouter"
                                    value={newCityName}
                                    onChange={(e) => setNewCityName(e.target.value)}
                                    className="mr-2"
                                    style={{ width: "50%" }}
                                />
                                <Button className="btn btn-success" onClick={handleAddCity}>
                                    Ajouter
                                </Button>
                            </div>
                        </Form>
                    </div>
                </div>

                <div className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Rechercher une ville"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>

                <Table striped bordered hover>
                    <thead style={{ backgroundColor: "#9C9C9C" }}>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredCities.map((city) => (
                            <tr key={city.id}>
                                <td>{city.id}</td>
                                <td>{city.nom}</td>
                                <td>
                                    <Button
                                        style={{ backgroundColor: "#F28135" }}
                                        onClick={() => handleUpdateCity(city)}
                                        className="ms-2"
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDeleteCity(city.id)}
                                    >
                                        Delete
                                    </Button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Update City</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>City Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={updatedCityName}
                                onChange={(e) => setUpdatedCityName(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Cities;
