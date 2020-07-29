import component from './slide-deck.component';

const slideDeckModule = angular
    .module('slideDeck', [])
    .component('slideDeck', component);

export { slideDeckModule };
