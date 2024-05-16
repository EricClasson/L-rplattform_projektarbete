import { useLocation } from "react-router-dom"


const Dashboard = () => {
    const location = useLocation()
    const { role } = location.state || { role: "guest" }
  return (
    <div>
        <h1>Dashboard</h1>
        <h2>Welcome as {role}</h2>
    </div>
  )
}

export default Dashboard