import PropTypes from 'prop-types';

const MultiComponents = ({ components, addedComponents, setAddedComponents }) => {
    return (
        <div>
            {addedComponents.map((component, index) => (
                <div style={{ display: "flex", flexDirection: "row", gap: 10 }} key={index}>
                    <label htmlFor="component">Select component</label>
                    <select id="component" onChange={e => {
                        const newAddedComponents = [...addedComponents];
                        newAddedComponents[index].component = e.target.value;
                        setAddedComponents(newAddedComponents);
                    }}>
                        <option value="">Select Component</option>
                        {components.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    <label htmlFor="action">Action</label>
                    <select id="action" onChange={e => {
                        const newAddedComponents = [...addedComponents];
                        newAddedComponents[index].action = e.target.value;
                        setAddedComponents(newAddedComponents);
                    }}>
                        <option value="new">New</option>
                        <option value="repair">Repair</option>
                    </select>

                    <button type="button" onClick={() => setAddedComponents([...addedComponents, { component: components[0].id, action: 'new' }])}>Add</button>
                </div>
            ))}
        </div>
    );
};

MultiComponents.propTypes = {
    components: PropTypes.array.isRequired,
    addedComponents: PropTypes.array.isRequired,
    setAddedComponents: PropTypes.func.isRequired
};

export default MultiComponents;