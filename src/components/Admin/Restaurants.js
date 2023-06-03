import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import AdminHeader from './AdminHeader';

function Restaurants(){

    const [Resto, setResto] = useState([]);
    const [RestoId, setRestoId] = useState('');
    const [lattitudeR, setlattitude] = useState('');
    const [longtitude, setlongtitude] = useState('');
    const [adresse, setAdresse] = useState('');
    const [close, setClose] = useState('');
    const [nomR, setNom] = useState('');
    const [open, setOpen] = useState('');
    const [rank, setRank] = useState('');
    const [weekend, setWeekend] = useState('');
    const [serie, setSerie] = useState('');
    const [user, setUser] = useState('');
    const [zone, setZone] = useState('');
    const [zoneName, setZoneName] = useState('');
    const [showModal, setShowModal] = useState(false); 
    const [series , setSeries] = useState([]);
    const [users , setUsers] = useState([]);
    const [zones , setZones] = useState([]);

    const [cities, setCities] = useState([]);



    const getRestoById = async(id) => {
        try{
            const response = await axios.get(`http://localhost:8080/restaurants/findById/${id}`);
            setRestoId(response.data.id);
            setlattitude(response.data.lattitudeR);
            setlongtitude(response.data.longtitude);
            setAdresse(response.data.adresse);
            setClose(response.data.close);
            setNom(response.data.nom);
            setOpen(response.data.open);
            setRank(response.data.rank);
            setWeekend(response.data.weekend);
            setSerie(response.data.serie);
            setUser(response.data.user);
            setZone(response.data.zone);
        }catch(error){console.error(error);}
    }



    const fetchResto = async() => {
        try{
            const response = await axios.get('/api/restaurant');
            setResto(response.data);
        }catch(error){console.error(error);}
    }
    useEffect(() => { fetchResto(); }, []);

    const deleteResto = async(id)=>{
        try{
            await axios.delete(`/api/restaurant/${id}`);
            setResto(Resto.filter(restos => restos.id !== id))
        }catch(error){console.error(error);}
    }

    const handleRestoNameChange = (event) => {
        setlongtitude(event.target.value);
        setlattitude(event.target.value);
        setAdresse(event.target.value);
        setClose(event.target.value);
        setNom(event.target.value);
        setOpen(event.target.value);
        setRank(event.target.value);
        setWeekend(event.target.value);
        setUsers(event.target.value);
        setZones(event.target.value);
        setSeries(event.target.value);
      }

      useEffect(() => {
        const fetchSeries = async () => {
          try {
            const response = await axios.get('http://localhost:8080/series/api/series');
            if (Array.isArray(response.data)) {
              setSeries(response.data);
            } else {
              console.error('Response data is not an array:', response.data);
            }
          } catch (error) {
            console.error(error);
          }
        };
        
        fetchSeries();
      }, []);

      useEffect(() => {
        const fetchUsers = async () => {
          try {
            const response = await axios.get('http://localhost:8080/users/api/users');
            if (Array.isArray(response.data)) {
              setUsers(response.data);
            } else {
              console.error('Response data is not an array:', response.data);
            }
          } catch (error) {
            console.error(error);
          }
        };
        
        fetchUsers();
      }, []);

      useEffect(() => {
        const fetchZones = async () => {
          try {
            const response = await axios.get('http://localhost:8080/zones/api/zones');
            setZones(response.data);
          } catch (error) {
            console.error(error);
          }
          
        };
        fetchZones();
}, []);


      const handleOpenModal = (resto) => { 
        if (resto) { 
          setRestoId(resto.id); 
          setZoneName(resto.zone.nom);
        } 
        else { setRestoId(''); 
                setZoneName('');
                 } 
              setShowModal(true); };
      

              const addResto = async(event) =>{
                try{
                    const response = await axios.post('/api/restaurant' , 
                                { lattitude : lattitudeR,
                                  longtitude : longtitude,
                                  adresse : adresse,
                                  close : close,
                                  nom : nomR,
                                  open : open,
                                  rank : rank,
                                  weekend : weekend
                                });
                    setResto([...Resto, response.data]);
                    setNom('');
                    setAdresse('');
                    setlattitude('');
                    setlongtitude('');
                    setClose('');
                    setOpen('');
                    setRank('');
                    setWeekend('');
                }catch(error) {console.error(error);}
            }


    return(
        <div>
          <AdminHeader></AdminHeader>
            <h5 className='mt-5 ms-5'>Restaurant</h5>    
        <Table striped bordered hover className='mt-3 w-75 ms-5'>
         <thead> 
            <tr> 
                <th>Id</th>
                 <th>Lattitude</th> 
                 <th>Longtitude</th> 
                 <th>Adresse</th> 
                 <th>Close</th> 
                 <th>Nom</th> 
                 <th>Open</th> 
                 <th>Action</th>
                 </tr> 
                 </thead> 
                 <tbody> {Resto.map((restos, index) => ( 
                    <tr key={restos.id}> 
                        <td>{index + 1}</td> 
                        <td>{restos.lattitude}</td> 
                        <td>{restos.longtitude}</td> 
                        <td>{restos.adresse}</td> 
                        <td>{restos.close_at}</td> 
                        <td>{restos.nom}</td> 
                        <td>{restos.open_at}</td> 
                     
                        
                        <td><button  onClick={() => deleteResto(restos.id)} className='btn btn-danger'>Delete</button>
                        <button  className="btn btn-secondary ms-2">Edit</button></td>
                        
                        </tr> ))}
                  </tbody> 
    </Table> 
    <div className="mt-3 ms-5 w-75"> 
    <input type="text" placeholder='Restaurant name' className="form-control mt-3 mr-2 d-inline-block" value={nomR} onChange={(e) => setNom(e.target.value)} />
    <input type="text" placeholder='Restaurant lattitude' className="form-control mt-3 mr-2 d-inline-block" value={lattitudeR} onChange={(e) => setlattitude(e.target.value)} />
    <input type="text" placeholder='Restaurant longtitude' className="form-control mt-3 mr-2 d-inline-block" value={longtitude} onChange={(e) => setlongtitude(e.target.value)} />
    <input type="text" placeholder='Restaurant adresse' className="form-control mt-3 mr-2 d-inline-block" value={adresse} onChange={(e) => setAdresse(e.target.value)} />
    <input type="time" placeholder='Close' className="form-control mt-3 mr-2 d-inline-block" value={close} onChange={(e) => setClose(e.target.value)} />
    <input type="time" placeholder='Open' className="form-control mt-3 mr-2 d-inline-block" value={open} onChange={(e) => setOpen(e.target.value)} />
   

     

        <select id="Zone-select" className="form-control mt-3" value={zones} onChange={(e) => setZone(e.target.value)}>
            <option value="" disabled selected>-- Choose a Zone --</option>
            {zones.map((zonesD) => (
            <option key={zonesD.id} value={zonesD.id}>{zonesD.id} - {zonesD.nom} </option>
            ))}
        </select>     
  


         {RestoId ? ( <button className="btn btn-success mt-3" > Update Restaurant </button> ) : ( <button onClick={addResto} className="btn btn-primary mt-3"> Add Restaurant </button> )} 
    </div>
        </div>
    );


}

export default Restaurants;