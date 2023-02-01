import AbstractView from '../../framework/view/abstract-view';

function createLoadingElement() {
  return '<p class="trip-events__msg">Loading...</p>';
}

export default class LoadingPresenter extends AbstractView {
  get template() {
    return createLoadingElement();
  }
}
