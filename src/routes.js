/* eslint-disable no-unused-vars */
// Este es el punto de entrada de tu aplicacion
// eslint-disable-next-line import/no-cycle
import { home } from './lib/home.js';
import { login } from './lib/login.js';
import { novaApp } from './lib/nova.js';
import { post } from './lib/post.js';
// eslint-disable-next-line import/no-cycle
// import { makingPost } from './app.js';
import { signIn } from './lib/signIn.js';
import { signUp } from './lib/signUp.js';

let firebase = null;
export const loadDependencies = (firebaseFromApp) => {
  firebase = firebaseFromApp;
};

export const rootDiv = document.getElementById('root');

export const routes = {
  '/': novaApp,
  '/home': home,
  '/login': login,
  '/post': post,
  '/signIn': signIn,
  '/signUp': signUp,
};

const homeView = routes[window.location.pathname];
homeView(rootDiv);

export const onNavigate = (pathname) => {
  window.history.pushState(
    {},
    pathname,
    window.location.origin + pathname,
  );

  const view = routes[pathname];
  view(rootDiv);
  // homeView(rootDiv);
};

// Esta es la aplicación que itera con los los targets donde se ejecuta la acción
const addButtonEvents = () => {
  const parentContainer = document.querySelectorAll('#root');
  parentContainer.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const click = e.target.dataset.action;
      // eslint-disable-next-line no-console
      console.log(click);
      // eslint-disable-next-line no-use-before-define
      eventsController(click);
    });
  });
};

const makingPost = () => {
  const titleCard = document.getElementById('title');
  const subtitleCard = document.getElementById('subtitle');
  const bodyCard = document.getElementById('body');

  // postButton.addEventListener('click', (e) => {
  //   e.preventDefault();

  const postInfo = {
    title: titleCard.value,
    subtitle: subtitleCard.value,
    body: bodyCard.value,
    fecha: Date.now(),
  };

  if (!titleCard.value.trim() || !subtitleCard.value.trim() || !bodyCard.value.trim()) {
    // eslint-disable-next-line no-alert
    alert('Input vacío!');
    return;
  }

  firebase.savePost(post)
    .then((docRef) => {
      console.log('Document written whith ID: ', docRef.id);
      titleCard.value = '';
      subtitleCard.value = '';
      bodyCard.value = '';
    })
    .catch((error) => console.log(error));
};

// Esta es la aplicación que genera el routing
export const eventsController = (e) => {
  // eslint-disable-next-line default-case
  switch (e) {
    case 'novaApp':
      onNavigate('/');
      break;
    case 'home':
      // eslint-disable-next-line no-unused-expressions
      onNavigate('/home');
      break;
    // eslint-disable-next-line no-fallthrough
    case 'login':
      onNavigate('/login');
      break;
    // eslint-disable-next-line no-fallthrough
    case 'post':
      onNavigate('/post');
      break;
    case 'saveButton':
      makingPost();
    // eslint-disable-next-line no-fallthrough
    case 'saveButton':
      makingPost();
      break;
      // eslint-disable-next-line no-fallthrough
    case 'signIn':
      onNavigate('/signIn');
      break;
    // eslint-disable-next-line no-fallthrough
    case 'signUp':
      onNavigate('/signUp');
      break;
  }
};

addButtonEvents();