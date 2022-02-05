import { radioBttn } from '../../../../HTMLComponents/input/inputIntrfc';
import { buttonData } from './../../Menu/menuIntrfc';

export interface scndMenuBoxItemIds{
    runScndMenu:runBoxItemScndMenuIds,
    runFnc:runBoxItemFncIds
}

export interface runBoxItemScndMenuIds {
    edt:{
        box:edtBox,
        outerBox:edtBox
    }, 

    add:{
        innerBox:string,
        outerBox:string,
        inBox:addBox,
        inOuterBox:addBox
    }
};

interface edtBox{
    pstn: string,
    drctn:string,
    grow:string,
    bckgrnd: string,
}

interface addBox{
    textField: string,
  
}

export interface runBoxItemFncIds {
    edt:{
        box:edtBoxRunFunc,
        outerBox:edtBoxRunFunc
    }, 
    
    rmv:{
        box:rmvBox,
        outerBox:rmvBox
    },
    add:{
        innerBox:string,
        outerBox:string
    }
};

interface edtBoxRunFunc{
    pstn: string,
    drctn:string,
    grow:string,
    bckgrnd: {clickInput:string, runFnc:string },
}

interface rmvBox{
    bckgrnd:string,
}

//Buttons
export interface bttns{
    frstMenu: {
        theMenu:buttonData[],
        subMenuEdtOuter:buttonData[]
    },
    scndMenu: {
        bckGrnd: buttonData[],
        bckGrndOuter: buttonData[],
        grow: radioBttn[],
        addBoxItem: radioBttn[],
    }

}


