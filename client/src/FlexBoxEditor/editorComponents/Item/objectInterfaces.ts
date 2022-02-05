import { radioBttn } from './../../../HTMLComponents/input/inputIntrfc';

//Buttons
export interface itemBttns{
    scndMenu: {
        algnSelf:radioBttn[],
        rszPercent:radioBttn[]
    }
}

//Second menu ids
export interface scndMenuItemIds {
    runScndMenu:runItemScndMenuIds,
    runFnc:runItemFncIds
}

export interface runItemScndMenuIds {
    edt:{
        item:edtItem,
        outerBoxItem:edtItem
    }, 
};

interface edtItem {
    rszPercent: string
}

export interface runItemFncIds {
    edt:{
        item:edtItem,
        outerBoxItem:edtItem
    }, 
    
};