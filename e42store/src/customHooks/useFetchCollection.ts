import {collection, onSnapshot, orderBy, query} from "firebase/firestore"
import {useCallback, useEffect, useState} from "react"
import {toast} from "react-toastify"
import {db} from "../firebase/config"

const useFetchCollection = (collectionName: string) => {

    const [data, setData] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const getCollection = useCallback(() => {
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
    }, [collectionName]) // `usCallback` now tracks only` CollectionName`

    useEffect(() => {
        getCollection()
    }, [getCollection])

    return {data, isLoading}
}

export default useFetchCollection