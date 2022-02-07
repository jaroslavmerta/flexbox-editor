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
        box:addInBox,
        outerBox:addInBox
    }
};

export interface edtBox{
    pstn: string,
    drctn:string,
    grow:string,
    bckgrnd: string,
    rszPixel: string
}
//This in name of property refers to box or outerBox from which it is called
export interface addInBox{
    addThis:string,
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
        rszPixel:buttonData[],
        rszPixelOuter:buttonData[]
    }

}


