import React, {FC, useState} from "react"
import styles from "./Pagination.module.scss"

interface PaginationProps {
    currentPage?: number
    setCurrentPage?: (value: ((prevState: number) => number) | number) => void
    productsPerPage?: number
    totalProducts?: number
}

const Pagination: FC<PaginationProps> = ({
                                             currentPage,
                                             setCurrentPage,
                                             productsPerPage,
                                             totalProducts,
                                         }: PaginationProps) => {
    const pageNumbers: number[] = []
    const totalPages = totalProducts! / productsPerPage!
    const [pageNumberLimit] = useState<number>(5)
    const [maxPageNumberLimit, setMaxPageNumberLimit] = useState<number>(5)
    const [minPageNumberLimit, setMinPageNumberLimit] = useState<number>(0)
    // Paginate
    const paginate = (pageNumber: number) => {
        setCurrentPage!(pageNumber)
    }
    // Go to next page
    const paginateNext = () => {
        setCurrentPage!(currentPage! + 1)
        //     Show next set of page number
        if (currentPage! + 1 > maxPageNumberLimit) {
            setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit)
        }
    }
    // Go to prev page
    const paginatePrev = () => {
        setCurrentPage!(currentPage! - 1)
        //     Show prev set of page number
        if ((currentPage! - 1) % pageNumberLimit === 0) {
            setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit)
            setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit)
        }
    };
    for (let i = 1; i <= Math.ceil(totalProducts! / productsPerPage!); i++) {
        pageNumbers.push(i)
    }

    return (
        <ul className={styles.pagination}>
            <li onClick={paginatePrev}
                className=
                    {currentPage === pageNumbers[0] ? `${styles.hidden}` : ""}>
                Prev
            </li>

            {pageNumbers.map((number) => {
                    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
                        return (
                            <li key={number} className={currentPage === number ? `${styles.active}` : ""}
                                onClick={() => paginate(number)}>
                                {number}
                            </li>
                        )
                    }
                    return null; // ✅ added return null
                }
            )}
            <li onClick={paginateNext}
                className=
                    {currentPage === pageNumbers[pageNumbers.length - 1] ? `${styles.hidden}` : ""}>
                Next
            </li>
            <p className={styles.page}>
                <b>{`page ${currentPage}`}</b>
                <span>{` of `}</span>
                <b>{`${Math.ceil(totalPages)}`}</b>
            </p>
        </ul>
    )
}

export default Pagination