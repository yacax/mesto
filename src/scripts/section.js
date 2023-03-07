class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(container);
  }

  renderer() {
    this._items.forEach(item =>
      this._renderer(item)
    );
  }

  addItem(item) {
    this._container.prepend(item)
  }
}

export { Section };