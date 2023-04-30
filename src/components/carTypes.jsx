
import { useEffect, useState } from "react"
import "../styles/wheeler.css"

const CarTypes = () => {
    const [val, setVal] = useState("")
    const [val1, setVal1] = useState("")
    const [carArr, setCarArr] = useState([])
    const [c_model, setC_model] = useState()
    const mongoId = localStorage.getItem("mongoid")
    useEffect(() => {
        fetch("https://vehicle-renting-form.onrender.com/types")
            .then((res) => {
                return res.json()
            }).then((data) => {
                setCarArr(data[0].car_types)
            })
    }, [])
    useEffect(() => {
        const formData = new FormData()
        formData.append("car_type", val)
        formData.append("mongoId", mongoId)
        fetch("https://vehicle-renting-form.onrender.com/car_types", {
            method: "POST",
            body: formData
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            if (data.mod) {
                setC_model(data.mod)
            }
        })
    }, [val])
    const handlebtn = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("vehicle_name", val1)
        formData.append("mongoId", mongoId)
        await fetch("https://vehicle-renting-form.onrender.com/vehicle_model", {
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
                {!(val) ?
                    <>
                        <h2>Select the Car Type Required</h2>
                        <form method="POST" onSubmit={handlebtn} className="radio-wheels">
                            {carArr.map((cars, i) => {
                                return (
                                    <div className="map-ele" key={i}>
                                        <input type="radio" id={i} name="car_type" value={cars} onChange={(e) => { setVal(e.target.value) }} />
                                        <label htmlFor={i}>{cars}</label>
                                    </div>
                                )
                            })}
                            <button className="first-btn"  >Next</button>
                        </form>
                    </>
                    :
                    <>
                        <h2>Select the Car</h2>
                        <form method="POST" onSubmit={handlebtn} className="radio-wheels">
                            <input type="radio" id="model" name="model_type" value={c_model} onChange={(e) => { setVal1(e.target.value) }} />
                            <label htmlFor="model">{c_model}</label>
                            <button className="first-btn" disabled={!(val1)}>Next</button>
                        </form>
                    </>}
            </div>
        </>
    )
}

export default CarTypes;