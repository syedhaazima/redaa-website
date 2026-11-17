/* Holds the Lenis smooth-scroll instance so any component can stop/start it. */
export const scroller = { lenis: null };

export function scrollTop(immediate = false) {
  if (scroller.lenis) scroller.lenis.scrollTo(0, { immediate });
  else window.scrollTo({ top: 0, behavior: immediate ? 'auto' : 'smooth' });
}
export const stopScroll = () => scroller.lenis && scroller.lenis.stop();
export const startScroll = () => scroller.lenis && scroller.lenis.start();
