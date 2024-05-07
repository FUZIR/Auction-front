import React from 'react'
import styles from '../styles/Modal.module.css'

function Modal({active, setActive, children}) {
  return (
    <div className={`${styles.modal} ${active ? styles.active : ''}`} onClick={()=>setActive(false)}>
      <div className={styles.modal__content} onClick={e=>e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
