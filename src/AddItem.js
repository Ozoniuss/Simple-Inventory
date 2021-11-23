import { useState } from "react";
import {PropTypes} from "prop-types";

function AddItem(props){

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [type, setType] = useState("");
    const [brand, setBrand] = useState("");

    const addItemButtonPressed = () =>{
        props.addItem({name, price, type, brand});
        setName("");
        setPrice(0);
        setType("");
        setBrand("");
    }


    return(
        <div className="container">
            <div className="row">
                <h2>Add an item</h2>
            </div>

            <div className="row">
                <label htmlFor="name-field">Name:</label>
                <input className="form-control"
                    id="name-field" 
                    type="text" 
                    value={name} 
                    onChange={ (e) => setName(e.target.value)}>
                </input>

                <label htmlFor="price-field">Max Price:</label>
                <input className="form-control"
                    id="price-field" 
                    type="number" 
                    value={price} 
                    onChange={ (e) => setPrice(e.target.value)}>
                </input>
                
                <label htmlFor="type-field">Type:</label>
                <input className="form-control"
                    id="type-field" 
                    type="text" 
                    value={type} 
                    onChange={(e) => setType(e.target.value)}>
                </input>

                <label htmlFor="brand-field">Brand:</label>
                <input className="form-control"
                    id="bard-field" 
                    type="text" 
                    value={brand} 
                    onChange={(e) => setBrand(e.target.value)}>
                </input>

            </div>
            
            <div className="row mt-3">
                <button
                type="button" 
                className="btn btn-primary" 
                onClick={addItemButtonPressed}
                >
                    Add Item
                </button>
            </div>

        </div>
    );
}

AddItem.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    type: PropTypes.string,
    brand: PropTypes.string
}

export default AddItem;