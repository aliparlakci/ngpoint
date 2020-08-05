import component from './slide.component';

const slideModule = angular
    .module('app.slide', [])
    .component('slide', component);

export { slideModule };
