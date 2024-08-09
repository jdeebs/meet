import { Component } from "react";

// Superclass Alert component
class Alert extends Component {
  // Constructor method initializes an instance of the class
  constructor(props) {
    // Ensure the parent class "Component" gets needed props
    super(props);
    // Set default properties to null
    // Subclasses will override these properties
    this.color = null;
    this.bgColor = null;
  }

  // Method to generate inline styles based on component properties
  getStyle = () => {
    return {
      color: this.color,
      backgroundColor: this.bgColor,
      borderWidth: "2px",
      borderStyle: "solid",
      fontWeight: "bolder",
      borderRadius: "7px",
      borderColor: this.color,
      textAlign: "center",
      fontSize: "12px",
      margin: "10px 0",
      padding: "10px",
    };
  };

  // Render method to display the component
  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}

// Subclass of Alert
class InfoAlert extends Alert {
  // Initialize an instance for the subclass component
  constructor(props) {
    super(props);
    // Override default(null) superclass properties
    this.color = "rgb(0, 0, 255)"; // Blue text color
    this.bgColor = "rgb(220, 220, 255)"; // Light blue bg
  }
}

export { InfoAlert };