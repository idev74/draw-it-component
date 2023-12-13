class DrawingPad extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML =
      `<canvas id="canvas"></canvas>
      <div>
        <input type="color" id="color" name="color" value="#000" />
        <label for="color">Color</label>
        <input type="number" id="stroke-width" name="stroke-width" min="1" max="100" value="1" />
        <label for="stroke-width">Stroke Width</label>
      <div>`;

    this.canvas = this.shadowRoot.getElementById('canvas');
    this.context = this.canvas.getContext('2d');

    this.width = this.getAttribute('width') || 300;
    this.height = this.getAttribute('height') || 200;
    this.colorPicker = this.shadowRoot.getElementById('color');

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.isDrawing = false;

    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
    this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
    this.colorPicker.addEventListener('input', (event) => {
      this.context.strokeStyle = event.target.value;
    });
    this.strokeWidthPicker = this.shadowRoot.getElementById('stroke-width');
    this.strokeWidthPicker.addEventListener('input', (event) => {
      this.context.lineWidth = event.target.value;
    });
  }

  startDrawing(e) {
    this.isDrawing = true;
    this.context.beginPath();
    this.context.moveTo(
      e.clientX - this.canvas.getBoundingClientRect().left,
      e.clientY - this.canvas.getBoundingClientRect().top
    );
  }

  draw(e) {
    if (!this.isDrawing) return;
    this.context.lineTo(
      e.clientX - this.canvas.getBoundingClientRect().left,
      e.clientY - this.canvas.getBoundingClientRect().top
    );
    this.context.stroke();
  }

  stopDrawing() {
    this.isDrawing = false;
  }
}

customElements.define('drawing-pad', DrawingPad);