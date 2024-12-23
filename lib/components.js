export class ProgressBar extends HTMLElement {
  constructor() {
    super();

    // Attach a shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // Create container
    const container = document.createElement("div");
    container.setAttribute("class", "progress-container");

    // Create progress bar
    const bar = document.createElement("div");
    bar.setAttribute("class", "progress-bar");
    container.appendChild(bar);

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
            .progress-container {
                width: 100%;
                background-color: #f3f3f3;
                border-radius: 10px;
                overflow: hidden;
                box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            }
            .progress-bar {
                height: 20px;
                width: 0%;
                background-color: #4caf50;
                text-align: center;
                line-height: 20px;
                color: white;
                transition: width 0.3s ease;
            }
        `;

    // Append to shadow DOM
    shadow.appendChild(style);
    shadow.appendChild(container);

    this.bar = bar;
  }

  // Observed attributes
  static get observedAttributes() {
    return ["value", "max"];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value" || name === "max") {
      this.update();
    }
  }

  // Update the progress bar based on attributes
  update() {
    const value = Number(this.getAttribute("value")) || 0;
    const max = Number(this.getAttribute("max")) || 100;
    const percentage = Math.min((value / max) * 100, 100);

    this.bar.style.width = `${percentage}%`;
    this.bar.textContent = `${Math.round(percentage)}%`;
  }

  // Increment progress
  increment(amount) {
    const value = Number(this.getAttribute("value")) || 0;
    const max = Number(this.getAttribute("max")) || 100;
    this.setAttribute("value", Math.min(value + amount, max));
  }

  // Reset progress
  reset() {
    this.setAttribute("value", 0);
  }
}

export class CircularProgressBar extends HTMLElement {
  constructor() {
    super();

    // Attach a shadow DOM
    const shadow = this.attachShadow({ mode: "open" });

    // Create container
    const container = document.createElement("div");
    container.setAttribute("class", "circle-container");

    // Create inner circle for progress
    const circle = document.createElement("div");
    circle.setAttribute("class", "circle");

    // Create a label for the percentage
    // const label = document.createElement("div");
    // label.setAttribute("class", "label");
    // label.textContent = "0%";

    // Add styles
    const style = document.createElement("style");
    style.textContent = `
            .circle-container {
                position: relative;
                width: 1em;
                height: 1em;
                border: 1px solid #f3f3f3;
                border-radius: 50%;
                overflow: hidden;
            }
            .circle {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                background: linear-gradient(to top, black, darkred, orange, yellow);
                width: 100%;
                height: 0; /* Start at 0% */
                transition: height 0.3s ease;
            }
            .label {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                font-size: 16px;
                font-weight: bold;
                color: #333;
            }
        `;

    // Append to shadow DOM
    shadow.appendChild(style);
    container.appendChild(circle);
    // container.appendChild(label);
    shadow.appendChild(container);

    this.circle = circle;
    // this.label = label;
  }

  // Observed attributes
  static get observedAttributes() {
    return ["value", "max"];
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "value" || name === "max") {
      this.update();
    }
  }

  // Update the progress bar based on attributes
  update() {
    const value = Number(this.getAttribute("value")) || 0;
    const max = Number(this.getAttribute("max")) || 100;
    const percentage = Math.min((value / max) * 100, 100);

    // Update circle height
    this.circle.style.height = `${percentage}%`;

    // Update label text
    // this.label.textContent = `${Math.round(percentage)}%`;
  }

  // Increment progress
  increment(amount) {
    const value = Number(this.getAttribute("value")) || 0;
    const max = Number(this.getAttribute("max")) || 100;
    this.setAttribute("value", Math.min(value + amount, max));
  }

  // Reset progress
  reset() {
    this.setAttribute("value", 0);
  }
}
