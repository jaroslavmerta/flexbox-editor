import { radioBttn } from "../../../HTMLComponents/input/inputIntrfc";
import { buttonData } from "../Menu/menuIntrfc";

//Buttons
export interface mainBoxBttns{
    frstMenu: {
        theMenu:buttonData[],
        subMenuEdtOuter:buttonData[]
    }
}

//Second menu ids
export interface scndMenuMainBoxIds {
    runScndMenu:runMainBoxScndMenuIds,
    runFnc:runMainBoxFncIds
}

export interface runMainBoxScndMenuIds {
    edt:{
        box:edtMainBox,
        outerBox:edtMainBox
    }, 
};

interface edtMainBox {
    drctn: string,
    pstn: string,
}

export interface runMainBoxFncIds {
    edt:{
        box:edtMainBox,
        outerBox:edtMainBox
    }, 
    
};