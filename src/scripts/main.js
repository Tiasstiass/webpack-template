// Import 3rd party libraries from node_modules
// ex.: import React from 'react';

// Global namespace
window.theme = window.theme || {};
window.Shopify = window.Shopify || {};

import { createApp } from 'vue';
import VueSplide from '@splidejs/vue-splide';
import components from './vue/components/index';
import '../styles/main.css';

// /* Vue Bundler build feature flags */
// if (process.env.NODE_ENV === 'development') {
//   globalThis.__VUE_OPTIONS_API__ = true;
//   globalThis.__VUE_PROD_DEVTOOLS__ = true;
// } else {
//   globalThis.__VUE_OPTIONS_API__ = false;
//   globalThis.__VUE_PROD_DEVTOOLS__ = false;
// }

/* Create Vue instance function */
const createVueApp = () => {
  const app = createApp({});

  // register components
  Object.entries(components.components).forEach((component) => {
    const [name, module] = component;
    app.component(name, module);
  });

  // register plugins
  app.use(VueSplide);

  // change delimiters to use Vue inside liquid files
  app.config.compilerOptions.delimiters = ['{$', '$}'];

  app.config.errorHandler = (err, instance, info) => {
    console.log('err:', err);
    console.log('instance:', instance);
    console.log('info:', info);
  };
  return app;
};

/* create and mount Vue instance(s) */
const appElement = document.querySelector('#page-container');

if (appElement) {
  createVueApp().mount(appElement);
} else {
  const vueElements = document.querySelectorAll('[vue]');
  if (vueElements) {
    window.vueComponents = [];
    vueElements.forEach((el) => {
      let name = el.children[0]?.tagName.toLocaleLowerCase();
      let instance = createVueApp();
      let component = instance.mount(el);
      window.vueComponents[name] = component;
      console.log('Vue mounted', name);
    });
  }
}

/* properly render vue components on user insert in the theme editor */
if (Shopify.designMode) {
  document.addEventListener('shopify:section:load', (event) => {
    if (event.target.classList.value.includes('vue')) {
      createVueApp().mount(event.target);
    }
  });
} else if (!Shopify.designMode && process.env.NODE_ENV === 'development') {
  /* reload the current page to rerender async inserted sections with vue components */
  new MutationObserver((mutationsList) => {
    mutationsList.forEach((record) => {
      const vue = Array.from(record.addedNodes).find(
        (node) => node.classList && node.classList.value.includes('vue')
      );
      if (vue) window.location.reload();
    });
  }).observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// Import as function from module exports
// ex.: use import from to init manually the module
import labBranding from './modules/lab_branding';

import cart from './modules/cart.js';
theme.cart = cart;

import wishlist from './modules/wishlist';
theme.wishlist = wishlist;

import item from './modules/item';
theme.item = item;

import currency from './modules/currency.js';
theme.Currency = currency;

import modals from './modules/modal-popup.js';
theme.modalPopup = modals;

import utils from './modules/utils.js';
theme.utils = utils;

import LazyLoad from 'vanilla-lazyload';
window.LazyLoad = LazyLoad;

import video from './modules/video.js';

// Init Main Javascript
theme.initMain = () => {
  // lab branding
  labBranding();
};

/*************************************************************************************/
/********************************* DO NOT EDIT BELOW *********************************/
/*************************************************************************************/
/**
 * Custom DOMready function
 * @param {*} callback
 */
theme.DOMready = (callback) => {
  if (document.readyState !== 'loading') callback();
  else document.addEventListener('DOMContentLoaded', callback);
};

/**
 * Use this event listener to run your JS after the DOM is ready
 */
theme.DOMready(() => {
  // Init Main JS
  theme.initMain();
  // dispatch customEvent
  document.dispatchEvent(new CustomEvent('page:loaded'));
});
