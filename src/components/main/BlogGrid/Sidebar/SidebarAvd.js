import React from "react";

function SidebarAvd({ item }) {
  return (
    <div className="flex-c-s p-b-50">
      <a href="#">
        <img src={item?.img_advertise?.replace('uploads', 'http://localhost:5000')} alt="IMG" style={{ width: '100%' }} />
      </a>
    </div>
  )
}

export default SidebarAvd   
