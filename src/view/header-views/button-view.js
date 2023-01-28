import AbstractView from '../../framework/view/abstract-view';

const createButtonTemplate = () => '<button class="trip-main__event-add-btn  btn  btn--big  btn--yellow" type="button">New event</button>';

export default class ButtonView extends AbstractView {

  #onCreateButtonClick = null;

  constructor(onCreateButtonClick) {
    super();

    this.#onCreateButtonClick = onCreateButtonClick;

    this.element.addEventListener('click', this.#onButtonClick);
  }

  get template() {
    return createButtonTemplate();
  }

  #onButtonClick = () => {
    this.#onCreateButtonClick();
  };
}
