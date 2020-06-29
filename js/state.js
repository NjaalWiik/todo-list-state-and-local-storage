function setDate() {
  const date = new Date();
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();
  return `${day} ${monthNames[monthIndex]} ${year}`;
}

function initiateState(Store) {
  class State {
    constructor(name) {
      this.itemId = 1;
      this.date = setDate();
      this.form = {
        focus: false,
        valid: false,
      };
      this.items = [];
      this.store = new Store(name);
      if (this.store.isSupported) {
        this.items = this.store.load();
      }
      if (this.items.length) {
        this.items.forEach((item) => {
          if (item.id >= this.itemId) {
            this.itemId = item.id + 1;
          }
        });
      }
      this.orderItems();
    }

    saveItems() {
      if (this.store.isSupported) {
        this.store.save(this.items);
      }
    }

    addItem(item, item2) {
      this.items.unshift({
        id: this.itemId += 1,
        status: 0,
        value: item,
        value2: item2,
      });
      this.saveItems();
    }

    orderItems() {
      const todo = this.items.filter((item) => item.status === 0);
      const done = this.items.filter((item) => item.status === 1);
      this.items = todo.concat(done);
    }

    findItemIndex(id) {
      return this.items.findIndex((item) => item.id === id);
    }

    deleteItem(id) {
      const itemIndex = this.findItemIndex(id);
      this.items.splice(itemIndex, 1);
      this.saveItems();
    }

    toggleItemStatus(id) {
      const itemIndex = this.findItemIndex(id);
      this.items[itemIndex].status = this.items[itemIndex].status ? 0 : 1;
      this.orderItems();
      this.saveItems();
    }
  }

  window.State = State;
}

initiateState(window.Store);
