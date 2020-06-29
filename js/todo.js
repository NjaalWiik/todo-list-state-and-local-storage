function initiateApp(State) {
  class App {
    constructor(name) {
      this.name = name;
      this.state = new State(name);
      this.date = document.querySelector('h2');
      this.list = document.querySelector('ul');
      this.button = document.querySelector('button');
      this.form = document.querySelector('form');
      this.input = document.querySelector('.form__item');
      this.input2 = document.querySelector('.form__item2');
      this.bindEvents();
      this.render();
    }

    bindEvents() {
      this.list.addEventListener('click', this.handleClick.bind(this));
      this.form.addEventListener('submit', this.submitForm.bind(this));
    }

    submitForm(event) {
      event.preventDefault();
      if (!this.input.value.length || !this.input2.value.length) {
        return;
      }
      this.state.addItem(this.input.value, this.input2.value);
      this.input.value = '';
      this.input2.value = '';
      this.render();
    }

    handleClick(event) {
      const e = event;
      if (e && e.target) {
        const element = e.target.type;
        if (element === 'submit' || element === 'checkbox') {
          const id = parseInt(e.target.parentNode.getAttribute('data-id'), 10);
          if (element === 'submit') {
            this.state.deleteItem(id);
          } else {
            this.state.toggleItemStatus(id);
          }
        }
      }
      this.render();
    }

    render() {
      let listHTML = '';
      this.state.items.forEach((item) => {
        const className = item.status ? 'done' : '';
        listHTML += `<li class="${className}" data-id="${item.id}">`;
        listHTML
          += `<input type="checkbox" class="cards__checkbox"${item.status ? ' checked' : ''}>`;
        listHTML += `<p class="cards__title">${item.value}</p> <p class="cards__subtitle">${item.value2}</p><button class="cards__delete">x</button></li>`;
      });

      this.date.innerHTML = this.state.date;
      this.form.classList.toggle('focus', this.state.form.focus);
      this.form.classList.toggle('valid', this.state.form.valid);
      this.list.innerHTML = listHTML;
    }
  }

  const app = new App('todo-with-state-and-local-storage');
  return app;
}

initiateApp(window.State);
