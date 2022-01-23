import { checkClases } from '../FrstMenu/objectInterfaces';
import { radioBttn } from '../../../../HTMLComponents/input/inputIntrfc';
import { buttonData } from '../menuIntrfc';

export interface radioScndMenu {
    /* id subMenu, které je na tlačítku v mainMenu a 
    podle kterého se určí jaké subMenu vytvořit */
    id:string, 
    radioData:radioMenu
}

export interface radioMenu {
    buttonData:radioBttn[],
    formId:string,
    submitId:string,
    submitText:string,
    checkClas?:checkClases[],
    outerBox?:boolean
}

//radioPstnScndMenu
export interface radioPstnBoxScndMenu {
    /* id subMenu, které je na tlačítku v mainMenu a 
    podle kterého se určí jaké subMenu vytvořit */
    id:string, 
    radioPstnData:radioPstnBoxMenu
}

export interface radioPstnBoxMenu {
    aiBttns:radioBttn[],
    jcBttns:radioBttn[],
    submitId:string,
    asBttns?:radioBttn[],
    outerBox?:boolean
}

export interface radioPstnImgScndMenu {
    id:string, 
    radioPstnData:radioBttn[]
}

export interface bttnScndMenu {
    id:string, 
    bttnData:buttonData[]
}
