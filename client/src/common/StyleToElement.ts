/**
 * Add inline style to a element
 * @param htmlElement HtmlElement to style
 * @param styles Object with style information for htmlElement
 */
const addInlineStyle = (htmlElement:HTMLElement, styles:object): void =>{
        for (const [key, value] of Object.entries(styles)){
            htmlElement.style.setProperty(key, value);
        }
};

export{addInlineStyle};