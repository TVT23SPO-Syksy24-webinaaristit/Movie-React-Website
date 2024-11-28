import "./ScreeningsPage.css"
import Navbar from "../components/Navbar";
import ScreeningResults from "../components/Screenings/ScreeningResults";

import Footer from "../components/Footer";

function ScreeningsPage(){

    return(
        <div className="ScreeningsPage">
            <Navbar />
            <ScreeningResults />
            <Footer />
        </div>
    );
};

export default ScreeningsPage;