import React, {FC} from "react"
import styles from "./Search.module.scss"

// Interface for Search component props
interface SearchProps {
    // Callback function to handle changes to the input field
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    value: string
}

//Search functional component that accepts onChange and value props
const Search: FC<SearchProps> = ({value, onChange}) => {

    return (
        <div className={styles.search}>
            <div className={styles["input-container"]}>
                <input
                    type="text"
                    placeholder="Search by name"
                    value={value}
                    onChange={onChange}
                />
                <span className={styles.icon}>🔍</span>
            </div>
        </div>
    )
}

export default Search