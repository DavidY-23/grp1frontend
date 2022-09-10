import { useLocation } from 'react-router-dom'

export default function Profile() {
    const location = useLocation();
    return (
        <p>Hello, {location.state?.name}  {location.state?.age}  {location.state?.gender}  {location.state?.weight}  {location.state?.height}</p>
    )
}
