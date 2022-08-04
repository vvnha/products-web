import React from 'react'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Toastify() {
  const notify = () => toast('Wow so easy!')

  return (
    <div>
      <button type='button' onClick={notify}>
        Notify!
      </button>
      <ToastContainer />
    </div>
  )
}

export default Toastify
