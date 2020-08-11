import 'angular';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import slideDeckComponent from './slide-deck';
import slideComponent from './slide';

const ngPoint = angular.module('ngPoint', []);
ngPoint.component('slideDeck', slideDeckComponent);
ngPoint.component('slide', slideComponent);

export default ngPoint.name;
