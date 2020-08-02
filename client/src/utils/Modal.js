import React from "react";
import ReactDOM from "react-dom";

class Modal extends React.Component {
	render() {
		return ReactDOM.createPortal(
			<div
				className="card hoverable"
				style={{
					position: "fixed",
					top: "50%",
					left: "50%",
					width: "500px",
					height: "auto",
					minWidth: "300px",
					minHeight: "200px",
					borderRadius: "20px",
					transform: "translate(-50%, -50%)",
				}}
			>
				<div className="card-content">
					<span className="card-title">{this.props.title}</span>
					<p>{this.props.content}</p>
				</div>
				<div className="card-action right">{this.props.actions}</div>
			</div>,
			document.querySelector("#modal")
		);
	}
}

export default Modal;
