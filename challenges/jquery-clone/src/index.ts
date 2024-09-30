import fetch from "node-fetch";

class SelectorResult {
  #elements

  constructor(elements: NodeListOf<Element>) {
    this.#elements = elements;
  }

  html(contents: string) {
    // iterate over everything we found
    this.#elements.forEach(element => {
      // set contents equal to the string we are given
      element.innerHTML = contents
    })
  }

  show() {
    this.#elements.forEach(element => {
      // would want a type guard to check whether something is 
      // an HTMLElement vs Element
      const htmlElement = element as HTMLElement
      htmlElement.style.visibility = 'visible'
    })
  }

  hide() {
    this.#elements.forEach(element => {
      // would want a type guard to check whether something is 
      // an HTMLElement vs Element
      const htmlElement = element as HTMLElement
      htmlElement.style.visibility = 'hidden'
    })
  }

  on<K extends keyof HTMLElementEventMap>(eventName: K, 
    callback: (event: HTMLElementEventMap[K]) => void) {
      this.#elements.forEach(element => {
        // would want a type guard to check whether something is 
        // an HTMLElement vs Element
        const htmlElement = element as HTMLElement
        htmlElement.addEventListener(eventName, callback)
      })
  }

  ajax(){

  }
}

function $(selector: string) {
  return new SelectorResult(
    document.querySelectorAll(selector)
  )
}

namespace $ {
  export function ajax({url, successCallback }: {url: string, successCallback: (data: any) => void}): any {
    return fetch(url).then(resp => resp.json()).then(successCallback)
  }
}

export default $;


// /**
//  * Get the <button> element with the class 'continue'
//  * and change its HTML to 'Next Step...'
//  */
// $("button.continue").html("Next Step...")
 
// /**
//  * Show the #banner-message element that is hidden with visibility:"hidden" in
//  * its CSS when any button in #button-container is clicked.
//  */
// const hiddenBox = $("#banner-message")
// $("#button-container button").on("click", (event) => {
//   hiddenBox.show()
// })
 
// /**
//  * Make an API call and fill a <div id="post-info">
//  * with the response data
//  */
// $.ajax({
//   url: "https://jsonplaceholder.typicode.com/posts/33",
//   success: (result) => {
//     $("#post-info").html(
//       "<strong>" + result.title + "</strong>" + result.body
//     )
//   },
// })