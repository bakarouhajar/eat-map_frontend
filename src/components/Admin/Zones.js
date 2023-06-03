import React, { useEffect, useState } from "react";
import { Table, Form, Button, Modal } from "react-bootstrap";
import axiosInstance from "../axiosInstance";
import AdminHeader from "./AdminHeader";

function Zones() {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [zones, setZones] = useState([]);
  const [filteredZones, setFilteredZones] = useState([]);
  const [selectedZone, setSelectedZone] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedZoneName, setUpdatedZoneName] = useState("");
  const [newZoneName, setNewZoneName] = useState("");
  const [newZoneCityId, setNewZoneCityId] = useState("");

  useEffect(() => {
    fetchCities();
    fetchAllZones();
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

  const fetchAllZones = async () => {
    try {
      const response = await axiosInstance.get("/api/zones");
      const data = response.data;
      setZones(data);
      setFilteredZones(data);
    } catch (error) {
      console.error("Error fetching zones:", error);
    }
  };

  const fetchZonesByVille = async (villeId) => {
    try {
      const response = await axiosInstance.get(`/api/zones/by-ville/${villeId}`);
      const data = response.data;
      setFilteredZones(data);
    } catch (error) {
      console.error("Error fetching zones:", error);
    }
  };

  const handleCityChange = (e) => {
    const selectedCityId = e.target.value;
    setSelectedCity(selectedCityId);
    if (selectedCityId === "") {
      setFilteredZones(zones);
    } else {
      const filteredZonesByCity = zones.filter(
        (zone) => zone.ville.id === parseInt(selectedCityId)
      );
      setFilteredZones(filteredZonesByCity);
    }
  };

  const handleDeleteZone = async (zone) => {
    try {
      await axiosInstance.delete(`/api/zones/${zone.id}`);
      setFilteredZones((prevZones) => prevZones.filter((z) => z.id !== zone.id));
    } catch (error) {
      console.error("Error deleting zone:", error);
    }
  };

  const handleUpdateZone = (zone) => {
    setSelectedZone(zone);
    setUpdatedZoneName(zone.nom);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedZone(null);
    setShowModal(false);
  };

  const handleSaveUpdate = async () => {
    if (selectedZone && updatedZoneName.trim() !== "") {
      try {
        const updatedZone = { ...selectedZone, nom: updatedZoneName };
        await axiosInstance.put(`/api/zones/${selectedZone.id}`, updatedZone);
        setFilteredZones((prevZones) =>
          prevZones.map((zone) => (zone.id === selectedZone.id ? updatedZone : zone))
        );
        setSelectedZone(null);
        setShowModal(false);
      } catch (error) {
        console.error("Error updating zone:", error);
      }
    }
  };

  const handleAddZone = async (e) => {
    e.preventDefault();
    if (newZoneName.trim() !== "" && newZoneCityId !== "") {
      try {
        const newZone = {
          nom: newZoneName,
          ville: { id: newZoneCityId },
        };
        await axiosInstance.post("/api/zones", newZone);
        setNewZoneName("");
        setNewZoneCityId("");
        fetchAllZones();
      } catch (error) {
        console.error("Error adding zone:", error);
      }
    }
  };

  return (
    <>
      <AdminHeader />

      <div className="container">
        <h1 className="mt-3" style={{ fontFamily: "cursive" }}>
          Liste des zones
        </h1>
        <div style={{ backgroundColor: "#D3D3D3" }}>
          <div className="container mb-4">
            <h4>Ajouter une zone</h4>
            <Form onSubmit={handleAddZone}>
              <div className="row">
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Control
                      as="select"
                      value={newZoneCityId}
                      onChange={(e) => setNewZoneCityId(e.target.value)}
                    >
                      <option value="">Select a city</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.nom}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group>
                    <Form.Control
                      type="text"
                      value={newZoneName}
                      onChange={(e) => setNewZoneName(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </div>
              <Button className="btn btn-success mt-2 mb-2" type="submit">
                Add Zone
              </Button>
            </Form>
          </div>
        </div>

        <div>
          <Form.Group>
            <Form.Label className="alert alert-warning">
              Sélectionnez une ville pour filtrer les zones:
            </Form.Label>
            <Form.Control
              as="select"
              onChange={handleCityChange}
              className="mb-4"
              value={selectedCity}
            >
              <option value="">Select a city</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.nom}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </div>

        {filteredZones.length > 0 && (
          <Table striped bordered hover>
            <thead style={{ backgroundColor: "#9C9C9C" }}>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredZones.map((zone) => (
                <tr key={zone.id}>
                  <td>{zone.id}</td>
                  <td>{zone.nom}</td>
                  <td>
                    <Button
                      onClick={() => handleUpdateZone(zone)}
                      style={{ backgroundColor: "#F28135" }}
                    >
                      Update
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteZone(zone)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}

        {/* Modal for zone update */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Update Zone</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label>Zone Name:</Form.Label>
              <Form.Control
                type="text"
                value={updatedZoneName}
                onChange={(e) => setUpdatedZoneName(e.target.value)}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSaveUpdate}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Zones;
