class DrawingPad extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML =
      `<canvas id="canvas"></canvas>`;

    this.canvas = this.shadowRoot.getElementById('canvas');
    this.context = this.canvas.getContext('2d');

    this.width = this.getAttribute('width') || 300;
    this.height = this.getAttribute('height') || 200;

    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.isDrawing = false;

    this.canvas.addEventListener('mousedown', this.startDrawing.bind(this));
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
    this.canvas.addEventListener('mouseup', this.stopDrawing.bind(this));
    this.canvas.addEventListener('mouseout', this.stopDrawing.bind(this));
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