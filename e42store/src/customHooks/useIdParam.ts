import {useParams} from "react-router-dom"

const useIdParam = () => {
    const {id} = useParams<{ id?: string }>()
    return id ?? ''
}

export default useIdParam