import { React, useState } from 'react'
import EditAds from './EditAds'
import AddAds from './AddAds'
import ListAds from './ListAds'

function Advertisement() {
  const [isEdit, setIsEdit] = useState(false)
  const [idEdit, setIdEdit] = useState()
  return (
    <>

      <ListAds setIsEdit={setIsEdit} setIdEdit={setIdEdit} />
      {isEdit === false && <AddAds />}
      {isEdit === true && <EditAds setIsEdit={setIsEdit} idEdit={idEdit} />}
    </>
  )
}

export default Advertisement