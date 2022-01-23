interface items{
    items: item[]
};

interface item{
    id: string,
    kind: 'boxItem' | 'imageItem'| 'mainBox',
    classes:boxItemClass | imgItemClass ,
    inlStyl?:inlStyl,
    img?: string,
    subItems?:item[]
};

interface inlStyl{
    width?:string,
    height?:string
}

interface imgItemClass{
    classId:string[],
    position:string[],
    width:string[],
    height:string[],
}

interface boxItemClass{
    classId:string[],
    position:string[],
    subItPstn:string[],
    common:string[],
    flexDrctn:string[],
    grow:string[],
    width:string[],
    height:string[],
}



//export interfaces
export{ item, items, imgItemClass, boxItemClass, inlStyl};