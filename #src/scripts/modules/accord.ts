import { isNullOrWhiteSpaces } from "./general.js";

export default class Accordion {
  private accordButtons: NodeListOf<HTMLElement>
  private accordContentElements: Element[]
  private animationDuration: number
  private isToggling: boolean = false

  /**
   * Provides functionality for an accordion.
   * 
   * @param btnsSelector
   * Selector for buttons that open some accordion content element.
   * Must contain data-toggle-elem-number="numberOfContentElement" 
   * (note, the count starts from zero)
   * @param contentBlockSelector
   * Selector of a block that contains the content-elements of the accordion.
   * @param animationDuration
   * If you use transition, it set animation duration in ms. Can be 0.
   * @param addActiveForFirstElements
   * Sets the first element of buttons and content-block the class active. The default is true.
   * 
   * @example 
   * Example of accordion:
   * ```html
   * <div class="accordion__container">
   *   <button class="accordion__btn"
   *    data-toggle-elem-number="0">1</button>
   *   <button class="accordion__btn" 
   *    data-toggle-elem-number="2">2</button>
   *   <div class="accordion__items">
   *     <div class="accordion__item">1</div>
   *     <div class="accordion__item">2</div>
   *   </div>
   * </div>
   * ```
   * @throws Some selector is null or white spaces - 
   * This error will be printed to the console if some input argument are null or white spaces.
   * @throws The count of buttons != the count content-elements.
   */
  constructor(btnsSelector: string, contentBlocksSelector: string, animationDuration: number,
    addActiveForFirstElements: boolean = true) {
    if (isNullOrWhiteSpaces(btnsSelector, contentBlocksSelector) || animationDuration < 0) {
      throw '[ACCORDION] Incorrect arguments!'
    }

    this.accordButtons = document.querySelectorAll(btnsSelector);
    this.accordContentElements = Array.from(document.querySelectorAll(contentBlocksSelector).values())
    this.animationDuration = animationDuration + 100;

    if (this.accordButtons.length != this.accordContentElements.length) {
      throw '[ACCORDION] The count of buttons and content-elements must be more than zero.'
    }

    if (addActiveForFirstElements) {
      this.accordButtons[0].classList.add('active');
      this.accordContentElements[0].classList.add('active');
    }

    for (let accordButton of this.accordButtons) {
      accordButton.addEventListener('click', () => {
        this.toggleActiveElements(accordButton);
      });
    }
    for (const accordContentElem of this.accordContentElements) {
      if (accordContentElem.classList.contains('active') == false) {
        accordContentElem.setAttribute('hidden', '');
      }
    }
  }


  private toggleActiveElements(activeAccordButton: HTMLElement) {
    if (activeAccordButton.classList.contains('active') || this.isToggling) {
      return
    } else {
      this.isToggling = true;
    }
    for (let accordBtn of this.accordButtons) {
      accordBtn.classList.remove('active');
    }
    activeAccordButton.classList.add('active');


    let activeContentElement: HTMLElement;
    activeContentElement = this.accordContentElements[activeAccordButton.dataset.toggleElemNumber];

    for (const contentElement of this.accordContentElements) {
      contentElement.classList.remove('active');

      setTimeout(() => {
        if (contentElement != activeContentElement) {
          contentElement.setAttribute('hidden', '');
        } else {
          activeContentElement.removeAttribute('hidden');
        }
        setTimeout(() => {
          activeContentElement.classList.add('active');
        }, 10);

        this.togglingToFalseWithAwait(this)
      }, this.animationDuration);
    }
  };
  private async togglingToFalseWithAwait(thisAccordion: Accordion) {
    await new Promise(r => setTimeout(() => {
      thisAccordion.isToggling = false;
    }, thisAccordion.animationDuration));
  }
}