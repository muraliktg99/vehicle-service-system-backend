import { useState, useEffect } from "react";
import axios from "axios";

function ComponentForm() {
    const [licensePlate, setLicensePlate] = useState("");
    const [model, setModel] = useState("");
    const [owner, setOwner] = useState("");

    const [components, setComponents] = useState([]);
    const fetchComponents = () => {
        axios
            .get("http://localhost:8000/api/vehicles")
            .then((response) => setComponents(response.data))
            .catch((error) => console.error(error));
    }
    useEffect(() => {
        fetchComponents();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post("http://localhost:8000/api/vehicles/", {
                license_plate: licensePlate,
                model: model,
                owner: owner
            })
            .then(fetchComponents)
            .catch((error) => console.error(error));
    };

    return (
        <>
            <h2>Add vehicle for repair details</h2>
            <form
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
                onSubmit={handleSubmit}
            >
                <label htmlFor="licensePlate">License plate</label>
                <input
                    type="text"
                    id="licensePlate"
                    placeholder="License plate"
                    value={licensePlate}
                    onChange={(e) => setLicensePlate(e.target.value)}
                />

                <label htmlFor="model">Model name</label>
                <input
                    type="text"
                    id="model"
                    placeholder="Model name"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                />

                <label htmlFor="owner">Owner</label>
                <input
                    type="text"
                    id="owner"
                    placeholder="Owner"
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                />

                <button type="submit">Add vehicle details</button>
            </form>

            <div>
                <h3>List of vehicles</h3>
                <table id="table">
                    <thead>
                        <tr>
                            <th>Model name</th>
                            <th>Company</th>
                        </tr>
                    </thead>
                    <tbody>
                        {components.map((component) => (
                            <tr key={component.id}>
                                <td>{component.model}</td>
                                <td>{component.company}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ComponentForm;
