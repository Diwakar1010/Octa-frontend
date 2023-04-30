
import { BrowserRouter, Routes, Route } from "react-router-dom"
import NamePage from "./components/namePage";
import SelectWheeler from "./components/wheeler";
import BikeTypes from "./components/bikeTypes";
import CarTypes from "./components/carTypes";
// import VehicleList from "./components/vehicleList";
import DateRange from "./components/dateRange";


const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NamePage />} />
                    <Route path="/wheels" element={<SelectWheeler/>} />
                    <Route path="/bike_types" element={<BikeTypes/>} />
                    <Route path="/car_types" element={<CarTypes/>} />
                    <Route path="/date" element={<DateRange/>} />
                    <Route path="*" element={<div>Error Page Not found</div>}/>
                </Routes>
            </BrowserRouter>
        </>
    )
}


export default App;