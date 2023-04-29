



import { useEffect, useState } from "react"
import "../styles/wheeler.css"

const VehicleList = () => {
    const [val, setVal] = useState("")
    const [vehicle_name, setVehicle_name] = useState("")
    let obj = {}
    const mongoId = localStorage.getItem("mongoid")
    useEffect(  () => {
         fetch("http://localhost:8080/types")
            .then((res) => {
             return res.json()
            }).then((data) => {
                // console.log(data[0].model)
                obj = data[0].model
            })
    }, [])
    useEffect(()=>{
        const formData = new FormData()
        formData.append("mongoId", mongoId)
         fetch("http://localhost:8080/final_data", {
            method: "POST",
            body: formData 
        })  
        .then((res) => {
            return res.json()
        }).then( (data) => {
            let name = data.user[0].vehicle_type
            setVehicle_name(obj[name])
        })  
    },[vehicle_name])
    const handlebtn = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("vehicle_name", val)
        formData.append("mongoId", mongoId)
        await fetch("http://localhost:8080/vehicle_model", {
            method: "POST",
            body: formData
        }).then((res) => {
            return res.json()
        }).then((data) => {
            // console.log(data)
            if (data.status === "success") {
                window.location = "/date"
            }
        })
    }
    return (
        <>
            <div className='first-container'>
                <h2>Select the Car Type Required</h2>
                <form method="POST" onSubmit={handlebtn} className="radio-wheels">
                    <input type="radio" id="model" name="car_type" value={vehicle_name} onChange={(e) => { setVal(e.target.value) }} />
                    <label htmlFor="model">{vehicle_name}</label>
                    <button className="first-btn"  >Next</button>
                </form>
            </div>
        </>
    )
}

export default VehicleList;