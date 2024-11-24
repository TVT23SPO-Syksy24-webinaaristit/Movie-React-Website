import "./Screenings.css"
import Navbar from "../components/Navbar";
import ScreeningResults from "../components/ScreeningResults";

import Footer from "../components/Footer";

function Screenings(){

    return(
        <div className="Screenings">
            <Navbar />
            <ScreeningResults />
            <Footer />
        </div>
    );
};

export default Screenings;