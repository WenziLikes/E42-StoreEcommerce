import React from "react"
import styles from "./AddressForm.module.scss"
import {CountryDropdown} from "react-country-region-selector"
import {ShippingAddressState} from "../../../product.type"

interface AddressFormProps {
    address: ShippingAddressState
    setAddress: React.Dispatch<React.SetStateAction<ShippingAddressState>>
    handleChange: (e: {
        target: { name: string, value: string }
    }, setAddress: React.Dispatch<React.SetStateAction<ShippingAddressState>>) => void
}

const AddressForm: React.FC<AddressFormProps> = ({address, setAddress, handleChange}) => {
    return (
        <div className={styles["address-form"]}>
            <label>Recipient Name:</label>
            <input type="text"
                   placeholder="Recipient Name"
                   required
                   name="name"
                   value={address.name}
                   onChange={(e) => handleChange(e, setAddress)}
            />

            <label>Address Line 1:</label>
            <input type="text"
                   placeholder="Address Line 1"
                   required
                   name="line1"
                   value={address.line1}
                   onChange={(e) => handleChange(e, setAddress)}
            />

            <label>Address Line 2:</label>
            <input type="text"
                   placeholder="Address Line 2"
                   name="line2"
                   value={address.line2}
                   onChange={(e) => handleChange(e, setAddress)}
            />

            <label>City:</label>
            <input type="text"
                   placeholder="City"
                   required
                   name="city"
                   value={address.city}
                   onChange={(e) => handleChange(e, setAddress)}
            />

            <label>State:</label>
            <input type="text"
                   placeholder="State"
                   required
                   name="state"
                   value={address.state}
                   onChange={(e) => handleChange(e, setAddress)}
            />

            <label>Postal Code:</label>
            <input type="text"
                   placeholder="Postal Code"
                   required
                   name="postal_code"
                   value={address.postal_code}
                   onChange={(e) => handleChange(e, setAddress)}
            />

            <label>Country:</label>
            <CountryDropdown
                valueType={"short"}
                value={address.country}
                onChange={(val) => handleChange({
                    target: {
                        name: "country",
                        value: val
                    }
                }, setAddress)}
            />

            <label>Phone:</label>
            <input type="text"
                   placeholder="Phone"
                   required
                   name="phone"
                   value={address.phone}
                   onChange={(e) => handleChange(e, setAddress)}
            />
        </div>
    )
}

export default AddressForm