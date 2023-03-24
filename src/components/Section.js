class Section {
  constructor({ items, renderItems }, container) {
    this._items = items;
    this._renderItems = renderItems;
    this._container = document.querySelector(container);
  }

  renderItems() {
    this._items.forEach(item => {
      this._renderItems(item)
    });
  }

  addItem(item) {
    this._container.prepend(item)
  }

  deleteItem(item) {
    this._container.removeChild(item);
  };
}

export { Section };