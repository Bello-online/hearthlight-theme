if (!customElements.get('sticky-atc')) {
  customElements.define(
    'sticky-atc',
    class StickyAtc extends HTMLElement {
      connectedCallback() {
        this.button = this.querySelector('[data-sticky-submit]');
        this.label = this.querySelector('[data-sticky-label]');
        this.price = this.querySelector('[data-sticky-price]');
        this.mainForm = document.querySelector('product-form form[data-type="add-to-cart-form"], product-form form');
        this.mainButton = this.mainForm ? this.mainForm.querySelector('button[type="submit"], button[name="add"]') : null;
        if (!this.mainButton) return;

        this.button.addEventListener('click', () => this.mainButton.click());

        this.observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              const above = entry.boundingClientRect.top > 0;
              this.toggleAttribute('hidden', entry.isIntersecting || above);
            });
          },
          { threshold: 0 }
        );
        this.observer.observe(this.mainButton);

        this.mirror = new MutationObserver(() => this.sync());
        this.mirror.observe(this.mainButton, { attributes: true, childList: true, subtree: true, characterData: true });
        const priceEl = document.querySelector('.product__info-container .price');
        if (priceEl) this.mirror.observe(priceEl, { childList: true, subtree: true, characterData: true });
        this.sync();
      }

      sync() {
        const disabled = this.mainButton.hasAttribute('disabled');
        this.button.toggleAttribute('disabled', disabled);
        const span = this.mainButton.querySelector('span');
        const text = (span ? span.textContent : this.mainButton.textContent).trim();
        if (text && this.label) this.label.textContent = text;
        const priceEl = document.querySelector(
          '.product__info-container .price .price-item--sale, .product__info-container .price .price-item--regular'
        );
        if (priceEl && this.price) this.price.textContent = priceEl.textContent.trim();
      }

      disconnectedCallback() {
        if (this.observer) this.observer.disconnect();
        if (this.mirror) this.mirror.disconnect();
      }
    }
  );
}
