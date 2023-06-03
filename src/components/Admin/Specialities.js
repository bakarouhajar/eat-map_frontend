import React, { useEffect, useState } from "react";
import { Table, Form, Button, Modal } from "react-bootstrap";
import axiosInstance from "../axiosInstance";
import AdminHeader from "./AdminHeader";

function Specialities() {
    const [specialities, setSpecialities] = useState([]);
    const [newSpeciality, setNewSpeciality] = useState("");
    const [selectedSpeciality, setSelectedSpeciality] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [editedSpeciality, setEditedSpeciality] = useState("");
    const [incrementalNumber, setIncrementalNumber] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchSpecialities(searchQuery);
    }, [searchQuery]);

    const fetchSpecialities = async (query) => {
        try {
            const response = await axiosInstance.get(`/api/specialities?query=${query}`);
            const data = response.data;
            setSpecialities(data);
            setIncrementalNumber(data.length + 1);
        } catch (error) {
            console.error("Error fetching specialities:", error);
        }
    };

    const handleAddSpeciality = async (e) => {
        e.preventDefault();
        if (newSpeciality.trim() !== "") {
            try {
                const speciality = {
                    nom: newSpeciality,
                };
                await axiosInstance.post("/api/specialities", speciality);
                setNewSpeciality("");
                setSearchQuery("");
                fetchSpecialities("");
            } catch (error) {
                console.error("Error adding speciality:", error);
            }
        }
    };

    const handleDeleteSpeciality = async (speciality) => {
        try {
            await axiosInstance.delete(`/api/specialities/${speciality.id}`);
            setSearchQuery("");
            fetchSpecialities("");
        } catch (error) {
            console.error("Error deleting speciality:", error);
        }
    };

    const handleEditSpeciality = (speciality) => {
        setSelectedSpeciality(speciality);
        setEditedSpeciality(speciality.nom);
        setShowModal(true);
    };

    const handleModalSave = async () => {
        if (editedSpeciality.trim() !== "") {
            try {
                const updatedSpeciality = {
                    ...selectedSpeciality,
                    nom: editedSpeciality,
                };
                await axiosInstance.put(
                    `/api/specialities/${selectedSpeciality.id}`,
                    updatedSpeciality
                );
                setShowModal(false);
                setSearchQuery("");
                fetchSpecialities("");
            } catch (error) {
                console.error("Error updating speciality:", error);
            }
        }
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filter specialities based on the search query
    const filteredSpecialities = specialities.filter((speciality) =>
        speciality.nom.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <AdminHeader />
            <div className="container">
                <h1 className="mt-3" style={{ fontFamily: "cursive" }}>
                    Liste des spécialités
                </h1>
                <div
                    style={{
                        backgroundColor: "#D3D3D3",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    className="mb-4"
                >
                    <div className="speciality-container d-flex justify-content-center align-items-center">
                        <div className="container mb-4">
                            <h4 style={{ textAlign: "center" }}>Ajouter une spécialité</h4>
                            <Form onSubmit={handleAddSpeciality}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Form.Group>
                                            <Form.Control
                                                type="text"
                                                value={newSpeciality}
                                                onChange={(e) => setNewSpeciality(e.target.value)}
                                                style={{ width: "220%" }}
                                            />
                                        </Form.Group>
                                    </div>
                                </div>
                                <Button className="btn btn-success mt-2 mb-2" type="submit">
                                    Ajouter
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>

                {/* Search bar */}
                <div className="mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Rechercher une spécialité..."
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>

                {/* Render the specialities table */}
                {filteredSpecialities.length > 0 && (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredSpecialities.map((speciality, index) => (
                                <tr key={speciality.id}>
                                    <td>{index + 1}</td>
                                    <td>{speciality.nom}</td>
                                    <td>
                                        <Button
                                            onClick={() => handleEditSpeciality(speciality)}
                                            style={{ backgroundColor: "#F28135" }}
                                        >
                                            Edit
                                        </Button>{" "}
                                        <Button
                                            variant="danger"
                                            onClick={() => handleDeleteSpeciality(speciality)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}



                {/* Modal for editing speciality */}
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modifier la spécialité</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Nom de la spécialité</Form.Label>
                            <Form.Control
                                type="text"
                                value={editedSpeciality}
                                onChange={(e) => setEditedSpeciality(e.target.value)}
                            />
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Annuler
                        </Button>
                        <Button variant="primary" onClick={handleModalSave}>
                            Enregistrer
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default Specialities;
