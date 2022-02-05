import { radioBttn } from "../../../HTMLComponents/input/inputIntrfc";
import { buttonData } from "../Menu/menuIntrfc";

//Buttons
export interface boxBttns{
   /*  frstMenu: {
        theMenu:buttonData[],
        subMenuEdtOuter:buttonData[]
    }, */
    scndMenu: {
        drctn: radioBttn[],
        
        algnItms: radioBttn[],
        jstfItms: radioBttn[],

    }

}