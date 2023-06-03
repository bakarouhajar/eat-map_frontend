import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function Footer() {
    return (
      <footer className="bg-light text-center text-lg-start">
        <div className="container p-4">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
              <h5 className="text-uppercase">Adresse</h5>
              {/* Insérez ici votre adresse */}
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase">Contact</h5>
              <ul className="list-unstyled mb-0">
                <li>
                  <a href="#!" className="text-dark">Numéro de téléphone</a>
                </li>
                <li>
                  <a href="#!" className="text-dark">Adresse e-mail</a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
              <h5 className="text-uppercase mb-0">Réseaux sociaux</h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#!" className="text-dark">Facebook</a>
                </li>
                <li>
                  <a href="#!" className="text-dark">Twitter</a>
                </li>
                <li>
                  <a href="#!" className="text-dark">Instagram</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center p-3 text-white" style={{backgroundColor: '#3d3c3c'}}>
          © {new Date().getFullYear()} EatMap - Tous droits réservés
        </div>
      </footer>
    );
  }
  export default Footer;
  