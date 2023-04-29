import { DateRangePicker } from 'react-date-range';
// import { addDays } from 'date-fns';
import { useState } from 'react';
import Swal from 'sweetalert2'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import "../styles/datRange.css"


const DateRange = () => {
    const [start_Date, setStartDate] = useState(new Date())
    const [end_Date, setEndDate] = useState(new Date())
    const[btn ,setBtn] = useState(true)
    const mongoId = localStorage.getItem("mongoid")
    const handleSelect = (date) => {
        setBtn(false)
        setStartDate(date.selection.startDate)
        setEndDate(date.selection.endDate)
        // console.log(date.selection.startDate)
        // console.log(date.selection.endDate)
    }
    const selectionRange = {
        startDate: start_Date,
        endDate: end_Date,
        key: 'selection',
    }
    const handlebtn = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("date_rangef", `${start_Date} to ${end_Date}`)
        formData.append("mongoId", mongoId)
        await fetch("http://localhost:8080/date", {
            method: "POST",
            body: formData
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            if (data.status === "success") {
                Swal.fire({
                    title: 'Submitted',
                    text: 'Form Submitted successfully',
                    icon: 'success',
                    confirmButtonText: 'Cool'
                  }).then(()=>{
                    localStorage.removeItem("mongoid")
                    window.location = "/"
                  })
            }
        })
    }
    return (
        <>
            <div className='first-container'>
                <h2>Select the date range for booking!!!</h2>
                <DateRangePicker
                    minDate={new Date()}
                    ranges={[selectionRange]}
                    onChange={handleSelect}
                />
                <button className="first-btn" disabled={(btn)} onClick={handlebtn} >Next</button>
            </div>

        </>

    )
}

export default DateRange;