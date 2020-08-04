import component from './slide-deck.component';

import './slide-deck.css';

const slideDeckModule = angular
    .module('app.slideDeck', [])
    .component('slideDeck', component);

export { slideDeckModule };
