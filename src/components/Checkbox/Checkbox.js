import React from "react";
import "./Checkbox.css";

function Checkbox({ label, checked, onChange }) {
    return (
        <label className="custom-checkbox">
            <input type="checkbox" checked={checked} onChange={onChange} />
            <span className="checkbox-box"></span>
            <p style={checked ? { textDecoration: "line-through" } : null}>
                {label}
            </p>
        </label>
    );
}

export default Checkbox;
