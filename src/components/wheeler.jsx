
import { useState } from "react"
import "../styles/wheeler.css"

const SelectWheeler= ()=>{
    const [val, setVal] = useState("")
    const mongoId = localStorage.getItem("mongoid")
    const handlebtn = async (e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("wheel_no", val )
        formData.append("mongoId", mongoId )
        await fetch("http://localhost:8080/wheels_no",{
            method:"POST",
            body:formData
        }).then((res)=>{
            return res.json()
        }).then((data)=>{
            console.log(data)
            if(data.status === "success" && data.user.wheeler ==="2-wheeler"){
                window.location="/bike_types"
            }
            if(data.status === "success" && data.user.wheeler ==="4-wheeler"){
                window.location="/car_types"
            }
        })
    }
    return(
        <>
            <div className='first-container'>
            <h2>Select the Type of Wheelers !!</h2>
            <form  method="POST" onSubmit={handlebtn} className="radio-wheels">
            <input type="radio" id="two" name="wheel_type" value="2-wheeler" onChange={(e)=>{setVal(e.target.value)}}   />
            <label htmlFor="two">2 - wheeler</label><br/>
            
            <input type="radio" id="four" name="wheel_type" value="4-wheeler" onChange={(e)=>{setVal(e.target.value)}}   />
            <label htmlFor="four">4 - wheeler</label>
            
            <button className="first-btn"  >Next</button>
            </form>
            </div>
        </>
    )
}

export default SelectWheeler;