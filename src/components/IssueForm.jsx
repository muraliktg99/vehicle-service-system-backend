import { useState, useEffect } from "react";
import axios from "axios";

function ComponentForm() {
    const [vehicles, setVehicles] = useState([]);
    const [components, setComponents] = useState([]);
    const [vehicle, setVehicle] = useState('');
    const [description, setDescription] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [addedComponents, setAddedComponents] = useState([]);
    const [total, setTotal] = useState(0);
    const [error, setError] = useState({});
    const [issues, setIssues] = useState([]);

    const fetchComponents = () => {
        axios.get('http://localhost:8000/api/vehicles/')
            .then(response => setVehicles(response.data));
        axios.get('http://localhost:8000/api/components/')
            .then(response => { setComponents(response.data); setAddedComponents([{ component: response.data[0].id, action: 'new' }]) });
        axios.get('http://localhost:8000/api/issues/')
            .then(response => setIssues(response.data));
    }
    useEffect(() => {
        fetchComponents();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/issues/', {
            vehicle,
            issue_description: description,
            components: addedComponents,
        })
            .then(() => {
                setIsSubmitted(true);
                setAddedComponents([{ component: components[0].id, action: 'new' }]);;
                setTotal(0);
                setDescription('');
                setError({});
                setTimeout(() => setIsSubmitted(false), 5000);
            })
            .catch(error => { setError(error.response.data); console.log(error.response.data) });
    };

    const calculateTotal = (e) => {
        e.preventDefault();
        // calculate total price of all components in addedComponents
        let total = 0;
        addedComponents.forEach(c => {
            const component = components.find(comp => comp.id === c.component);
            const price = c.action === 'new' ? component.new_price : component.repair_price;
            total += parseFloat(price);
        });
        console.log(total);
        setTotal(total);
    }
    return (
        <>

            <h2>Add vehicle Issues for repair</h2>
            <form style={{ display: "flex", flexDirection: "column", gap: 10 }} onSubmit={handleSubmit}>

                {isSubmitted && <div style={{ backgroundColor: "lightgreen", padding: 10 }}>Issue submitted successfully</div>}
                {Object.keys(error).length > 0 && <div style={{ backgroundColor: "tomato", padding: 10 }}>{Object.keys(error).map((key, index) => {
                    return (<div key={index}>{key} - {error[key]}</div>)
                })}</div>}
                <label htmlFor="vehicle">Select vehicle</label>
                <select id="vehicle" onChange={e => setVehicle(e.target.value)}>
                    <option value="">Select Vehicle</option>
                    {vehicles.map(v => (
                        <option key={v.id} value={v.id}>{v.model}</option>
                    ))}
                </select>

                {addedComponents.map((_, index) => (
                    <div style={{ display: "flex", flexDirection: "row", gap: 10 }} key={index}>
                        <label htmlFor="component">Select component</label>
                        <select id="component" onChange={e => {
                            const newAddedComponents = [...addedComponents];
                            newAddedComponents[index].component = Number(e.target.value);
                            setAddedComponents(newAddedComponents);
                        }}>
                            <option value="">Select Component</option>
                            {components.map(c => (
                                <option selected={addedComponents[index].component === c.id} key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                        <label htmlFor={"action" + index}>Action</label>
                        <select id={"action" + index} onChange={e => {
                            const newAddedComponents = [...addedComponents];
                            newAddedComponents[index].action = e.target.value;
                            console.log(newAddedComponents[index].component);
                            setAddedComponents(newAddedComponents);
                        }}>
                            <option value="new">New</option>
                            <option value="repair">Repair</option>
                        </select>

                        {index === addedComponents.length - 1 && <button type="button" onClick={() => setAddedComponents([...addedComponents, { component: components[0].id, action: 'new' }])}>Add</button>}
                    </div>

                )
                )}

                <label htmlFor="issue_description">Issue Description</label>
                <textarea id="issue_description" placeholder="Issue Description" value={description} onChange={e => setDescription(e.target.value)} />

                {/* calculate button to calculate */}
                <button type="button" onClick={calculateTotal}>Calculate</button>
                {total > 0 &&
                    <>
                        <ul>
                            {addedComponents.map((c, index) => {
                                const component = components.find(comp => comp.id === c.component);
                                return <li key={index}>{component.name} - {c.action === 'new' ? 'New' : 'Repair'} - {c.action === 'new' ? component.new_price : component.repair_price}</li>
                            })}
                        </ul>
                        <h3>Total amount to be paid: {total}</h3>
                        <button type="submit" onClick={(e) => handleSubmit(e)}>Pay now</button>
                    </>
                }

            </form>

            <div>
                <h3>List of Issues</h3>
                <table id="table">
                    <thead>
                        <tr>
                            <th>Vehicle ID</th>
                            <th>Component Name</th>
                            <th>New Price</th>
                            <th>Repair Price</th>
                            <th>Issue Description</th>
                            <th>Issue Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.values(issues).map((issue) => (
                            <>
                                {
                                    issue.component_details.map((component) => (
                                        <tr key={component.id}>
                                            <td>{issue.vehicle}</td>
                                            <td>{component.name}</td>
                                            <td>{component.new_price}</td>
                                            <td>{component.repair_price}</td>
                                            <td>{issue.issue_description}</td>
                                            <td>{new Date(issue.issue_date).toLocaleString()}</td>
                                        </tr>
                                    ))
                                }
                            </>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ComponentForm;
