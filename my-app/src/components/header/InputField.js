import {useState} from 'react'

const InputField = ({type, content}) => {

    return <textarea className={type} rows="20" cols="70">{content}</textarea>



}

export default InputField