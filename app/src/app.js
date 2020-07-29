import angular from '../lib/angular';
import 'bootstrap';
import slideDeck from './slide-deck';
import slide from './slide';
import './app.css';

angular.module('app', ['slideDeck', 'slide']);
