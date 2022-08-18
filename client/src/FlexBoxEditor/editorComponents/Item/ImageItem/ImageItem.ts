import { LocStorage } from "../../../../common/localStorage/LocStorage";
import { item } from "../../../../common/localStorage/storageInterfaces";
import { ctgrId } from "../../../editorTypes";
import stylFlexBI from "../BoxItem/boxItem.module.scss"
import { ExistInLocStorageError } from "../../../../common/error/locStorageError/ExistInLocStorageError";
import { buttonData } from "../../Menu/menuIntrfc";
import { imgItemBttns, scndMenuImgItemIds } from "./objectInterface";
import { Item } from './../Item';
import { BoxItem } from './../BoxItem/BoxItem';
import { Box } from './../../Box/Box';

let debug = false;
export class ImageItem {

    //Dependencies
    private item:Item;
    private boxItem:BoxItem;

    //Buttons
    public bttns:imgItemBttns;

    public scndMenuIds: scndMenuImgItemIds;

    constructor(item:Item, boxItem:BoxItem) {
        //Dependencies
        this.item = item;
        this.boxItem = boxItem;
        
        this.scndMenuIds = {
            runScndMenu:{
                edt:{
                    pstn:'edt-imgItem-pstn-scndMenu-radioPstnImg'
                }
            },

        }

        this.bttns = {
            frstMenu:{
                theMenu: [
                    {id: 'edt', type:'button', text :'Edit image',notClose:'doNotClose', subMenu:[
                        {id: this.item.scndMenuIds.runScndMenu.edt.item.rszPercent, type:'button', text :'Percent resize'},
                        {id: this.scndMenuIds.runScndMenu.edt.pstn, type:'button', text :'Edit position'},
                    ]},
                    {id: 'edt-outerBox', type:'button', text :'Edit outer BOX',notClose:'doNotClose', subMenu:[]},
                    {id: this.boxItem.scndMenuIds.runScndMenu.add.outerBox.addThis, type:'button', text :'Add outer box'},
                    {id: 'move-item', type:'button', text :'Move image'},
                    {id: 'rmv-imageItem', type:'button', text :'Remove image'}
                ]
            }
        }

      
    }


    public addImgItem(e:Event){
        if ((<HTMLElement>e.target).id === 'add-imageItem') {
            
            //funkce vyvolává click na input button, které je nezobrazené a tím spouští funkci this.fileReader()
            document.getElementById('image_input')?.click();
            if(debug)
            console.log('addImgItem ser spustil')
            /**
             * IMG lze vložit do hlavního kontejneru a do boxItemu
             * Dědění: 
             *  - do hlavního kontejneru: ne
             *  - do boxItem: ne
             */
        }
    }

    /**
     * Event handler, save img base64 into local storage
     * coder: I used wrapper function for first time to pass a dependence to event callback
     * @param e 
     */
    public fileReader(imageItem:this){
        return (e:Event)=>{  
            if(debug)   
            console.log('file reader se spustil:');
            if ( (<HTMLElement>e.target).id === 'image_input' ) {
                const reader = new FileReader();
                
                reader.addEventListener('load', (ev) => {
                    //img as base64
                    let uploaded_image = reader.result;
                    
                    const itemMenu = document.getElementById('itemMenu');
                    const triggerId = itemMenu?.getAttribute('data-triggerid');
                    if(triggerId){
                        const trigger = document.getElementById(triggerId);
                        if(trigger){
                            const trggrCtgrName = <ctgrId>trigger.getAttribute('data-category');
                            const items = LocStorage.getItems('items');
                            let ctgrData:item | null = null;
                            try {
                                ctgrData = LocStorage.getCtgr(items, trggrCtgrName);
                                
                            } catch (error:unknown) {
                                if (error instanceof ExistInLocStorageError) {
                                    console.log(error.message, error.property)
                                }
                            }
                            if (ctgrData) {
                                const newItemId = `item_${Date.now()}`;
                                let newItem:item;
                                
                                //position
                                let position = 'fi-none';
                                if (triggerId === trggrCtgrName) {
                                
                                    newItem = {
                                        id:newItemId,
                                        kind:'imageItem',
                                        classes: {
                                            classId:['item'],
                                            position:[ position],
                                            width:['x0'],
                                            height:['y0'],
                                        }, 
                                        img:`${uploaded_image}`,
                                    }
                                    let saved = LocStorage.pushNewItem(items.items, trggrCtgrName, newItem);
                                    if (saved) {
                                        LocStorage.setItem('items', items);
                                        let newImageItemElm = imageItem.crtImgItem(newItem, trggrCtgrName);
                                        trigger.append(newImageItemElm);
                                    }
                                }
                                else{
                                    const triggerData = LocStorage.findItem(ctgrData.subItems,triggerId);

                                    if (triggerData) {
                                        newItem = {
                                            id:newItemId,
                                            kind:'imageItem',
                                            classes:{
                                                classId:['item'],
                                                position:[position],
                                                width:['x0'],
                                                height:['y0'],
                                            },
                                            img:`${uploaded_image}`,
                                        }
                                        /**
                                         * obrázek lze vložit jen do "containeru/boxu"
                                         * najdi trigger "box" vlož obrázek do jeho subItemů
                                         * 
                                         */
                                        
                                        let saved = LocStorage.pasteItemInSubAccordingId(ctgrData.subItems, triggerId, newItem);
                                        if (saved) {
                                            LocStorage.setItem('items', items);
                                            let newImageItemElm = imageItem.crtImgItem(newItem, trggrCtgrName);
                                            trigger.append(newImageItemElm);
                                        }
                                    }
                                }
                                //pokud je trigger boxItem a pokud má class empty, odstran empty class z databáze a z DOM
                                /* imageItem.rmvEmptyClassesFBItem(items[triggerCategory], triggerId);
                                if (trigger.classList.contains(stylFlexBI.BIEmpty)) {
                                    trigger.classList.remove(stylFlexBI.BIEmpty);
                                } */

                            
                            
                            } 
                        }//
                    }
                });
                reader.readAsDataURL((<HTMLInputElement>e.target).files![0])
            }
        }
    } 
    

    

    /**
     * Removes empty class in boxItem in category array of objects, when a item is injected
     * @param item 
     */
    private rmvEmptyClassesFBItem(itemsInCtgr:item[], triggerId:string){
        itemsInCtgr.forEach( (item) => {
            if (item.id === triggerId) {
                if (item.kind === 'boxItem') {
                    let key: keyof typeof item.classes;
                    for ( key in item.classes) {
                        if (item.classes.hasOwnProperty(key)) {
                            item.classes[key]!.forEach( (classs, index, arraySelf) => {
                                if (classs === stylFlexBI.BIEmpty) {
                                    arraySelf.splice(index,1);
                                }
                            });
                        }
                    }
                    return;
                }
            }
            else if(item.subItems){
                this.rmvEmptyClassesFBItem(item.subItems, triggerId)
            }
        });
        
    }

    public crtImgItem(item:item, ctgrId:ctgrId){
        const newImage = document.createElement('img');
        if(item.img){
            newImage.setAttribute('src',item.img);
        } 
        //přidej třídu do DOM
        let key: keyof typeof item.classes;
        for ( key in item.classes) {
            if (item.classes.hasOwnProperty(key)) {
                item.classes[key]!.forEach( classs => {
                    newImage.classList.add(classs);
                });
            }
        }
        
        newImage.setAttribute('id',item.id);
        newImage.setAttribute('data-category',ctgrId);
        newImage.setAttribute('data-kind','imageItem');

        return newImage;
    }

    public rmvImgItem(e:Event){
        if ((<HTMLElement>e.target).id === 'rmv-imageItem') {
            console.log('rmvImgItem');
            const itemMenu = (<HTMLElement>e.target).closest('#itemMenu');
            const triggerId = itemMenu?.getAttribute('data-triggerid');
            if (triggerId) {
                const trigger = document.getElementById(triggerId);
                if(trigger){
                    const trggrCtgrName = <ctgrId>trigger.getAttribute('data-category');

                    //Local Storage part
                    const items = LocStorage.getItems('items');
                    let ctgrData:item | null = null;
                    try {
                        ctgrData = LocStorage.getCtgr(items, trggrCtgrName);
                        
                    } catch (error:unknown) {
                        if (error instanceof ExistInLocStorageError) {
                            console.log(error.message, error.property)
                        }
                    }
                    if (ctgrData) {
                        let removed = LocStorage.rmvItem(ctgrData.subItems,triggerId);
                        if (removed) {
                            LocStorage.setItem('items', items);
                            //DOM part
                            trigger.remove();
                        }
                    }
                }
            }
        }
    }

    public edtImgPstn(e:Event){
        if ((<HTMLElement>e.target).id === 'edt-img-pstn') {
            e.preventDefault();
            console.log('edt-img-pstn');

            const itemMenu = (<HTMLElement>e.target).closest('#itemMenu');
            const triggerId = itemMenu?.getAttribute('data-triggerid');
            if (triggerId) {
                const trigger = document.getElementById(triggerId);
                if(trigger){
                    const trggrCtgrName = <ctgrId>trigger.getAttribute('data-category');
                    const inputs = <NodeListOf<HTMLInputElement>>document.querySelectorAll('#imgItem-preset input');
                    let presets: string[] = [];
                    inputs.forEach((input) => {
                        if (input.checked) {
                            presets.push(input.value);
                        }
                    });
                    console.log(presets);

                    const items = LocStorage.getItems('items');
                    let ctgrData:item | null = null;
                    try {
                        ctgrData = LocStorage.getCtgr(items, trggrCtgrName);
                        
                    } catch (error:unknown) {
                        if (error instanceof ExistInLocStorageError) {
                            console.log(error.message, error.property)
                        }
                    }
                    if (ctgrData) {
                        const triggerData = LocStorage.findItem(ctgrData.subItems, triggerId);
                        if (triggerData) {
                            
                            if(presets.length){
                                triggerData.classes.position.forEach(classs => {
                                    
                                    if (trigger.classList.contains(classs)) {
                                        trigger.classList.remove(classs);
                                    } 
                                });
                                triggerData.classes.position =[];
                                presets.forEach(classs => {
                                    trigger.classList.add(classs);
                                    triggerData.classes.position.push(classs);
                                });
                            }
                            LocStorage.setItem('items', items);
                        }


                        

                        /*
                        //Local Storage part
                        const items = LocStorage.getItems('items');
                        LocStorage.rmvItem(items[triggerCategory],triggerId);
                        LocStorage.setItem('items', items);
                        //DOM part
                        trigger.remove();  */
                    }
                }
            }
        }
    }
      



}