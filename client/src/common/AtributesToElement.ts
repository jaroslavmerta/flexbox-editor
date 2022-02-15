/**
 * Add atributes to a html element
 * @param htmlElement HtmlElement to add atributes
 * @param atributes Object with atributes as key/value pair(example: {id: "idOfElement"}) for htmlElement
 */
 const addAtributes = (htmlElement:HTMLElement, atributes:object): void =>{
    for (const [key, value] of Object.entries(atributes)){
        htmlElement.setAttribute(key, value);
    }
};

export{addAtributes};