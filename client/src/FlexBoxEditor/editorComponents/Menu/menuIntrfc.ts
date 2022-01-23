export interface anchData{
    id:string,
    text:string
}
/* export interface onlyButtonData{
    id:string,
    type:string,
    text:string
} */

export interface buttonData{
    id:string,
    type:string,
    text:string,
    notClose?:string,
    input?:inputFile,
    subMenu?:buttonData[]
}

export interface inputFile {
    id:string,
    type:string,
    accept:string
}