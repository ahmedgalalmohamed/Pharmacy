import {animate, state, style, transition, trigger} from "@angular/animations";

export let fadeIn = trigger('fadeIn', [
  state('void', style(
    {
      opacity: 0,
    }
  )),
  transition('void=>*', [
    animate(1500)
  ]),
]);
export let fadeInLeftBig = trigger('fadeInLeftBig', [
  state('void', style(
    {
      opacity: 0,
      transform: 'translateX(-200%)'
    }
  )),
  transition('void=>*', [
    animate(1500)
  ]),
]);
export let fadeInRightBig = trigger('fadeInRightBig', [
  state('void', style(
    {
      opacity: 0,
      transform: 'translateX(200%)'
    }
  )),
  transition('void=>*', [
    animate(1500)
  ]),
]);
export let fadeInUpBig = trigger('fadeInUpBig', [
  state('void', style(
    {
      opacity: 0,
      transform: 'translateY(-200%)'
    }
  )),
  transition('void=>*', [
    animate(1500)
  ]),
]);
export let fadeInDownBig = trigger('fadeInDownBig', [
  state('void', style(
    {
      opacity: 0,
      transform: 'translateY(200%)'
    }
  )),
  transition('void=>*', [
    animate(1500)
  ]),
]);
