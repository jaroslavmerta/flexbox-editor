/**
 * Add inline style to a element
 * @param htmlElement HtmlElement to style
 * @param atributes Object with style information for htmlElement
 */
 const addAtributes = (htmlElement:HTMLElement, atributes:object): void =>{
    for (const [key, value] of Object.entries(atributes)){
        htmlElement.setAttribute(key, value);
    }
};

export{addAtributes};