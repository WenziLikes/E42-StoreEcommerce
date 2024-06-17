import React, {FC, useState} from "react"
import {ContactForm, FloatingButton} from "../../index"

const ContactWidget: FC = () => {
    const [isFormVisible, setFormVisible] = useState<boolean>(false)

    const handleButtonClick = () => {
        setFormVisible(!isFormVisible)
    }

    const handleCloseForm = () => {
        setFormVisible(false)
    }

    return (
        <>
            <FloatingButton onClick={handleButtonClick}/>
            {isFormVisible && <ContactForm onClose={handleCloseForm}/>}
        </>
    )
}

export default ContactWidget