import { animate, state, style, transition, trigger } from '@angular/animations';

export let slideUp = trigger('slideUp', [
  transition(':enter', [
    style({ transform: 'translateY(100vh)' }),
    animate('1000ms cubic-bezier(.61, .29, .07, 1.02)'),
  ]),
]);
