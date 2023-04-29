
import { useEffect, useState } from "react"
import "../styles/wheeler.css"

const BikeTypes = () => {
    const [val, setVal] = useState("")
    const [val1, setVal1] = useState("")
    const [bikeArr, setBikeArr] = useState([])
    const [b_model, setB_model] = useState()
    const mongoId = localStorage.getItem("mongoid")
    useEffect(() => {
        fetch("http://localhost:8080/types")
            .then((res) => {
                return res.json()
            }).then((data) => {
                setBikeArr(data[0].bike_types)
            })
    }, [])
    useEffect(() => {
        const formData = new FormData()
        formData.append("bike_type", val)
        formData.append("mongoId", mongoId)
        fetch("http://localhost:8080/bike_types", {
            method: "POST",
            body: formData
        }).then((res) => {
            return res.json()
        }).then((data) => {
            if (data.mod) {
                setB_model(data.mod)
            }
            // console.log(data.mod)
        })
    }, [val])

    const handlebtn = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("vehicle_name", val1)
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

                {!(val) ?
                    <>
                        <h2>Select the Bike Type Required</h2>
                        <form method="POST" onSubmit={handlebtn} className="radio-wheels">
                            {bikeArr.map((bike, i) => {
                                return (
                                    <div className="map-ele" key={i}>
                                        <input type="radio" id={i} name="bike_type" value={bike} onChange={(e) => { setVal(e.target.value) }} />
                                        <label htmlFor={i}>{bike}</label><br />
                                    </div>
                                )
                            })}
                            <button className="first-btn" disabled={!(val)}  >Next</button>
                        </form>
                    </>
                    :
                    <>
                        <h2>Select the Bike</h2>
                        <form method="POST" onSubmit={handlebtn} className="radio-wheels">
                            <input type="radio" id="model" name="model_type" value={b_model} onChange={(e) => { setVal1(e.target.value) }} />
                            <label htmlFor="model">{b_model}</label>
                            <button className="first-btn" disabled={!(val1)}>Next</button>
                        </form>
                    </>}
            </div>
        </>
    )
}

export default BikeTypes;