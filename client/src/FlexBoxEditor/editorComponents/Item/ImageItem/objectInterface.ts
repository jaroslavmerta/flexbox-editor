import { radioBttn } from "../../../../HTMLComponents/input/inputIntrfc";
import { buttonData } from "../../Menu/menuIntrfc";


//Buttons
export interface imgItemBttns{
    frstMenu: {
        theMenu:buttonData[],
    },
}

//Second menu ids
export interface scndMenuImgItemIds {
    runScndMenu:runImgItemScndMenuIds,
   /*  runFnc:runImgItemFncIds */
}

export interface runImgItemScndMenuIds {
    edt:{
        pstn:string,
  
    }, 
};



/* export interface runImgItemFncIds {
    edt:{
        pstn:string
      
    }, 
    
}; */