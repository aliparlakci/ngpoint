import angular from '../lib/angular';
import 'bootstrap';
import './slide-deck';
import './slide';
import './app.css';

angular.module('app', ['slideDeck', 'slide']);
