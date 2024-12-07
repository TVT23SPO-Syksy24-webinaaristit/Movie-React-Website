import "./ScreeningsPage.css"
import Navbar from "../components/Navbar";
import ScreeningResults from "../components/Screenings/ScreeningResults";

import Footer from "../components/Footer";

function ScreeningsPage(){

    return(
        <div className="ScreeningsPage">
            <Navbar />
            <div className="container">
            <ScreeningResults />
            </div>
            <Footer />
        </div>
    );
};

export default ScreeningsPage;
