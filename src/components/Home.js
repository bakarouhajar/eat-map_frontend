import Header from "../components/Header"
import Footer from "../components/Footer";
import Map from "./Map";
import HomeBody from "./HomeBody";
function Home() {
    return (
        <div class="container-fuid" className="App">
            <div class="row">
                <Header />
            </div>
            <div class="row mt-4 ">
                <div class="col align-self-end">
                    <HomeBody />
                </div>
                <div class="col align-self-end">
                    <Map />
                </div>
            </div>
            <div class="row ">
                <Footer />
            </div>
        </div>
    );
}

export default Home 
