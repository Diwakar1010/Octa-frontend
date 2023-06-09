import { useState } from "react"
import "../styles/namePage.css"
import { useNavigate} from "react-router-dom"

const NamePage = () => {
    const his = useNavigate()
    const [fname, setFname] = useState("")
    const [lname, setLname] = useState("")
    // const [nextVal, setNextVal] = useState(true)

    const handleSubmit = (e) => {
        e.preventDefault()
        // setNextVal(false)
        const formData = new FormData()
        formData.append("first_namef", fname)
        formData.append("last_namef", lname)
        fetch("https://vehicle-renting-form.onrender.com/name_data", {
            method: "POST",
            body: formData
        }).then((res) => {
            return res.json()
        }).then((data) => {
            // console.log(data)
            if (data.status === "success") {
                localStorage.setItem("mongoid", data.user._id)
                his("/wheels")
            }
        })
    }
    return (
        <>
            <div className='first-container'>
                <h2>First, what's your name?</h2>
                <form method="POST" onSubmit={handleSubmit} >
                    <label htmlFor="fname" > First Name</label>
                    <input type="text" id="fname" placeholder="first name" vlaue={fname} onChange={(e) => { setFname(e.target.value) }} />
                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" placeholder="last name" vlaue={lname} onChange={(e) => { setLname(e.target.value) }} />
                    <button disabled={!(fname && lname)} className="first-btn"  >Next</button>
                </form >
            </div>
            {/* <Link  to="/wheels"> new linkbb cncfgnnghn</Link> */}
        </>
    )
}

export default NamePage;