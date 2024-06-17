import {toast} from "react-toastify"
import {useEffect, useState} from "react"
import { doc, getDoc } from "firebase/firestore"
import { db } from "../firebase/config"

interface FetchDocumentProps {
    collectionName: string
    documentID: string
}

const useFetchDocument = <T, >({collectionName, documentID}: FetchDocumentProps) => {
   
    const [document, setDocument] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const getDocument = async () => {
        try {
            if (!documentID) {
                toast.error(`Invalid Document ID ${documentID}`)
                return
            }
            const docRef = doc(db, collectionName, documentID)
            const docSnap = await getDoc(docRef)

            if (docSnap.exists()) {
                const data = docSnap.data() as T
                if (data) {
                    // Make sure the "id" field is not overwritten if it is already in data
                    const obj: T = {...data, id: documentID}
                    setDocument(obj as T)
                }
            } else {
                setError("Document does not exist")
                toast.error("Document not found")
            }
        } catch (error) {
            console.error("Error when receiving document:", error)
            setError("Failed to fetch document")
            toast.error("Error when receiving document")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await getDocument()
        }

        fetchData().catch(error => {
            console.error("Error during fetchData:", error)
        })
    }, [collectionName, documentID])

    return {document, loading, error}
}

export default useFetchDocument