import React from "react";

const SurveyField = ({ input, label, type, meta }) => {
	return (
		<div className="input-field" style={{ margin: "40px 0" }}>
			<label
				className="active"
				style={{ fontSize: "1.2rem", color: "black", fontWeight: "500" }}
			>
				{label}
			</label>

			<input {...input} type={type} autoComplete="off" />
			{meta.touched && meta.error && (
				<span className="helper-text red-text">{meta.error}</span>
			)}
		</div>
	);
};

export default SurveyField;
