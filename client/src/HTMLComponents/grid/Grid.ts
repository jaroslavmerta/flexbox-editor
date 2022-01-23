import { addAtributes } from "../../common/AtributesToElement";
import { addInlineStyle } from "../../common/StyleToElement";

export class Grid {

    private styleContainer = {
        display:'grid',
        'grid-template-columns':'repeat(auto-fit, minmax(min-content, max-content))',
        'grid-template-rows':'repeat(auto-fit, minmax(min-content, 1fr))',
        border:'1px solid black',
        'grid-gap':'15px',
        'min-height': '100px',
        'max-width':'100vw'
    };

    private atributes = {
        class: 'frstMainBox'
    };

    private events: { name:string, call:any }[];


    constructor(){
         
          //nakonec není použito
          this.events = [       
            {
                name:'dragenter',
                call:""
            },
            ] 
    }

    /**
     * 
     * @returns Grid container
     */
    public createGrid(){
        const gridContainer = this.createGridContainer(this.styleContainer, this.atributes);
        //adds Event delegation
        //const grid = evDelegation(gridContainer, this.events);
        /* let htmlElements: {} = {element: grid};
        domLoaded(htmlElements,this.events ); */
       return gridContainer;
    }

    private createGridContainer(styles?: object, atributes?:object){
        const gridContainer = document.createElement('div');
        //style for grid container
        if (styles){
            addInlineStyle(gridContainer,styles);
        }
        if(atributes){
            addAtributes(gridContainer, atributes);
        }

        return gridContainer;
    }


}