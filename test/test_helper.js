import { JSDOM } from 'jsdom';

const { window } = new JSDOM(`
<!DOCTYPE html>
  <section id="root">
    <section id="list"></section>
    <section id="nav" style="text-align: center;"></section>
  </section>
`);
global.document = window.document;
