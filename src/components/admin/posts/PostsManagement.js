import { React, useState } from 'react'
import AddPosts from './AddPosts'
import ListPosts from './ListPosts'
import EditPosts from './EditPosts'


function PostsManagement() {
  const [isEdit, setIsEdit] = useState(false)
  const [idEdit, setIdEdit] = useState()

  return (
    <>
      {/* <ListPosts />
      <AddPosts /> */}
      <ListPosts setIsEdit={setIsEdit} setIdEdit={setIdEdit} />
      {isEdit === false && <AddPosts />}
      {isEdit === true && <EditPosts setIsEdit={setIsEdit} idEdit={idEdit} />}
    </>
  )
}

export default PostsManagement