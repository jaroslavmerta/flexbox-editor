export interface scndMenuBoxItem{
    runScndMenu:runBoxItemScndMenu,
    runFnc:runBoxItemFnc
}

export interface runBoxItemScndMenu {
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

export interface runBoxItemFnc {
    edt:{
        box:edtBoxRunFunc,
        outerBox:edtBoxRunFunc
    }, 
    
    rmv:{
        box:rmvBox,
        outerBox:rmvBox
    }
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
