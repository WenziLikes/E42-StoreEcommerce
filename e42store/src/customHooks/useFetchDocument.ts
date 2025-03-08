import {toast} from "react-toastify"
import {useEffect, useState, useCallback} from "react"
import {doc, getDoc} from "firebase/firestore"
import {db} from "../firebase/config"

interface FetchDocumentProps {
    collectionName: string
    documentID: string
}

const useFetchDocument = <T, >({collectionName, documentID}: FetchDocumentProps) => {
    const [document, setDocument] = useState<T | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    // ✅ We use usCallback so that GetDocument is not relaxed on every render
    const getDocument = useCallback(async () => {
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
                    // ✅ We are convinced that the ID is not rewritten if it is already in the object
                    setDocument({...data, id: documentID} as T)
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
    }, [collectionName, documentID]) // ✅ We memorize GetDocument

    useEffect(() => {
        getDocument()
    }, [getDocument]) // ✅ Now UseEFFECT is not restarted endlessly

    return {document, loading, error}
}

export default useFetchDocument