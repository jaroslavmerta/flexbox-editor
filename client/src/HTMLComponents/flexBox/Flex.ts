import { addAtributes } from "../../common/AtributesToElement";
import { addInlineStyle } from "../../common/StyleToElement";
import styles from './flexBox.module.scss'

export class Flex {
   
    /**Common flex container css */
   /*  private containerCss = {
        display:'flex',
        'flex-wrap':'wrap',
    }; */

    private containerAtr = {};

    /**
     * Nepoužito
     * @returns Grid container
     */
    public createFlex(){
        const flexContainer = this.createFlexContainer();

        return flexContainer;
    }

    /**
     * Creates flex container with cssProperty:wrap and allows to add a optional css and html atributes
     * @param styles 
     * @param atributes 
     * @returns {HTMLDivElement} flexContainer
     */
    public createFlexContainer( containerAtr?:object, inlStyl?:object):HTMLDivElement{
        const flexContainer = document.createElement('div');

        //style and atributes for every flex container(flex object)
        
        //optional style and atributes for each flex container(flex object)
        if (inlStyl){
            addInlineStyle(flexContainer,styles);
        }
        if(containerAtr){
            addAtributes(flexContainer, containerAtr);
        }
        flexContainer.classList.add(styles.flexBox);
        

        return flexContainer;
    }


}