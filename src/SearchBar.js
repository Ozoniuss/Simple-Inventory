import { useState } from "react";
import { PropTypes } from "prop-types";

function SearchBar(props) {

    const [name, setName] = useState("");
    const [maxPrice, setMaxPrice] = useState(0);
    const [type, setType] = useState("");
    const [brand, setBrand] = useState("");

    const searchButtonPressed = () => {
        props.updateSearchParams({ name: name, maxPrice: maxPrice, type: type, brand: brand });
    }

    const displayAllButtonPressed = () => {
        props.displayAllData()
    }


    return (
        <div className="container">
            <div className="row">
                <h2>Search for an item</h2>
            </div>

            <div className="row">

                <div className='col'>
                    <label htmlFor="name-field">Name:</label>
                    <input className="form-control"
                        id="name-field"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </input>
                </div>

                <div className="col">
                    <label htmlFor="price-field">Max Price:</label>
                    <input className="form-control"
                        id="price-field"
                        type="number"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.valueAsNumber)}>
                    </input>
                </div>

                <div className="col">
                    <label htmlFor="type-field">Type:</label>
                    <input className="form-control"
                        id="type-field"
                        type="text"
                        value={type}
                        onChange={(e) => setType(e.target.value)}>
                    </input>
                </div>

                <div className="col">
                    <label htmlFor="brand-field">Brand:</label>
                    <input className="form-control"
                        id="bard-field"
                        type="text"
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}>
                    </input>
                </div>

            </div>

            <div className="row mt-3">
                <div className="col-4" />
                <button type="button" className="col-4 btn btn-primary" onClick={searchButtonPressed}>Search</button>
                <div className="col-3" />
                <button type="button" className="col-1 btn btn-secondary" onClick={displayAllButtonPressed}>Display All Items</button>
            </div>
        </div>
    );
}

SearchBar.propTypes = {
    name: PropTypes.string,
    maxPrice: PropTypes.number,
    type: PropTypes.string,
    brand: PropTypes.string
}

export default SearchBar;