import { useState, useEffect } from "react";
import axios from "axios";

function ComponentForm() {
    const [provider, setProvider] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [repairPrice, setRepairPrice] = useState(0);
    const [isRepairable, setIsRepairable] = useState(true);

    const [components, setComponents] = useState([]);
    const fetchComponents = () => {
        axios
            .get("http://localhost:8000/api/components")
            .then((response) => setComponents(response.data))
            .catch((error) => console.error(error));
    }
    useEffect(() => {
        fetchComponents();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/components/", {
                provider,
                name,
                new_price: price,
                repair_price: repairPrice,
                is_repairable: isRepairable,
            })
            .then(fetchComponents)
            .catch((error) => console.error(error));
    };

    return (
        <>
            <h2>Add Vehicle components</h2>
            <form
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
                onSubmit={handleSubmit}
            >
                <label htmlFor="provider">Provider name</label>
                <input
                    type="text"
                    id="provider"
                    placeholder="Provider name"
                    value={provider}
                    onChange={(e) => setProvider(e.target.value)}
                />

                <label htmlFor="name">Component Name</label>
                <input
                    type="text"
                    id="name"
                    placeholder="Component Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="price">Price for new one</label>
                <input
                    type="number"
                    id="price"
                    placeholder="Price for new one"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <label htmlFor="repairPrice">Price for repair</label>
                <input
                    type="number"
                    id="repairPrice"
                    placeholder="Price for repair"
                    value={repairPrice}
                    onChange={(e) => setRepairPrice(e.target.value)}
                />

                <label htmlFor="isRepairable">
                    <input
                        type="checkbox"
                        id="isRepairable"
                        checked={isRepairable}
                        onChange={(e) => setIsRepairable(e.target.checked)}
                    />
                    Is repairable?
                </label>

                <button type="submit">Add Component</button>
            </form>

            <div>
                <h3>List of vehicle Components</h3>
                <table id="table">
                    <thead>
                        <tr>
                            <th>Provider</th>
                            <th>Name</th>
                            <th>New Price</th>
                            <th>Repair Price</th>
                            <th>Is Repairable</th>
                        </tr>
                    </thead>
                    <tbody>
                        {components.map((component) => (
                            <tr key={component.id}>
                                <td>{component.provider}</td>
                                <td>{component.name}</td>
                                <td>{component.new_price}</td>
                                <td>{component.repair_price}</td>
                                <td>{component.is_repairable ? "Yes" : "No"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ComponentForm;
