import { collection, onSnapshot, orderBy, query } from "firebase/firestore"
import {useEffect, useState} from "react"
import {toast} from "react-toastify"
import { db } from "../firebase/config"

const useFetchCollection = (collectionName: string) => {

    // Todo fix Any type
    const [data, setData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const getCollection = () => {
        setIsLoading(true)

        try {
            const docRef = collection(db, collectionName)
            const q = query(docRef, orderBy("createdAt", "desc"))

            onSnapshot(q, (snapshot) => {
                const allData = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setData(allData)
                setIsLoading(false)
            })
        } catch (error: any) {
            setIsLoading(false)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getCollection()
    }, [])

    return {
        data,
        isLoading
    }
}

export default useFetchCollection