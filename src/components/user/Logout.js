import React from 'react'
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();
    const handleClick = () => {
        localStorage.clear();
        navigate('/login');
    }
  return (
    <>
        <button className="btn w-100 text-start ps-0 px-3" onClick={handleClick}>Đăng xuất</button>
    </>
  )
}

export default Logout