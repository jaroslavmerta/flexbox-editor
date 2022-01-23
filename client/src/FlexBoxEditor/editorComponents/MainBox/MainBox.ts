import { addAtributes } from "../../../common/AtributesToElement";
import { InputGetter } from "../../../common/inputGetter/InputGetter";
import { LocStorage } from "../../../common/localStorage/LocStorage";
import { boxItemClass, item, items } from "../../../common/localStorage/storageInterfaces";
import { addInlineStyle } from "../../../common/StyleToElement";
import { ctgrId } from "../../editorTypes";
import { BoxItem } from "../Item/BoxItem/BoxItem";
import { ImageItem } from "../Item/ImageItem/ImageItem";
import { Flex } from '../../../HTMLComponents/flexBox/Flex';

let debug = true;

export class MainBox{
    
    private boxItem:BoxItem;
    private imageItem: ImageItem;

    constructor(boxItem:BoxItem, imageItem:ImageItem){

        this.imageItem = imageItem;
        this.boxItem = boxItem;
        }

   protected getItems(ctgrItems:item[], ctgrId:ctgrId,boxItem:BoxItem, imageItem:ImageItem, styles?: object, atributes?:object ){
        const docFrag = document.createDocumentFragment();
      
        let i:number = 0;
        ctgrItems.forEach( item  => {
            let newItem:HTMLElement = <HTMLElement>{};

            if (item.kind === 'imageItem') {
                 newItem = imageItem.crtImgItem(item, ctgrId);
                 if(debug)
                 console.log('vytvářím image')
            }
            else if (item.kind === 'boxItem') {
                 newItem = boxItem.crtFlexItemBox(item, ctgrId);
                 if (item.inlStyl) {
                    addInlineStyle(newItem, item.inlStyl);
                 }
                 if(debug)
                 console.log('vytvářím boxItem')
            }
            if (item.subItems?.length) {
                let subItems = this.getItems(item.subItems, ctgrId, boxItem, imageItem, styles, atributes);
                
                newItem.appendChild(subItems);
            }
            if (styles){
                addInlineStyle(newItem,styles);
            }
            if(atributes){
                addAtributes(newItem, atributes);
            }
            ++i;
            docFrag.append(newItem);
            
           
        });
        return docFrag;
    }

    createItems(ctgrId:ctgrId, styles?: object, atributes?:object){
        
        //získej pořadí itemů
        const items = LocStorage.getItems('items');
        let docFrag:DocumentFragment = <DocumentFragment>{};
        for (const item of items.items) {
            if (item.id === ctgrId) {
                if (typeof item.subItems !== 'undefined') {
                    docFrag = this.getItems(item.subItems!, ctgrId, this.boxItem, this.imageItem, styles, atributes);            
                    
                    return docFrag;
                }
                else{
                    console.log('category.subitems = undefined in MainBox.createItems');
                    return null;
                }
                
            }
        }
                      
            
    }

    public existItems( ctgrId:ctgrId){
        return LocStorage.existCtgrSubItems('items', ctgrId);
    } 
    /**
     * Creates main box
     * @param item 
     * @param ctgrId 
     * @param flexComponent 
     * @returns 
     */
     public crtMainBox(item:item, ctgrId:ctgrId, dataKind:('mainBox'), flexComponent:Flex) {
        const boxItem = flexComponent.createFlexContainer();

        //přidej třídu do DOM
        let key: keyof typeof item.classes;
        for ( key in item.classes) {
            if (item.classes.hasOwnProperty(key)) {
                item.classes[key].forEach( classs => {
                    boxItem.classList.add(classs);
                });
            }
        }

        boxItem.setAttribute('id', item.id);
        boxItem.setAttribute('data-category',ctgrId);
        boxItem.setAttribute('data-kind',dataKind);
        return boxItem;
    }
    
    /**
     * Finds out if category is empty
     * @param items 
     * @param ctgrId 
     * @returns 
     */
    public isCtgr(items:item[], ctgrId:ctgrId  ){
        for (const item of items) {
            if (item.id === ctgrId) {
                return true;
            }
            else{
                return false;
            }
        }
    }

    /**
     * Sets default category and save it in local storage
     * @param items 
     * @param frstMainBoxDefault 
     * @param ctgrId 
     */
    public setDefaultCtgr(items:items, frstMainBoxDefault:item) {
        items.items.push(frstMainBoxDefault);
        LocStorage.setItem('items', items);
    }
     
     public edtMainBoxPstn(e:Event){
        if ((<HTMLElement>e.target).id === 'edt-mainBox-pstn' || (<HTMLElement>e.target).id === 'edt-outerMainBox-pstn' ) {
            e.preventDefault();
            console.log((<HTMLElement>e.target).id);

            let triggerId: string | null = null;
            if ((<HTMLElement>e.target).id === 'edt-mainBox-pstn') {
                triggerId = localStorage.getItem('triggerid');
            }
            else if ((<HTMLElement>e.target).id === 'edt-outerMainBox-pstn'){
                triggerId = localStorage.getItem('trggrPrntId');

            }
            if (triggerId) {
                const trigger = document.getElementById(triggerId);
                if(trigger){
                    const trggrCtgrName = <ctgrId>trigger.getAttribute('data-category');
                
                    const inputs = <NodeListOf<HTMLInputElement>>document.querySelectorAll('#edt-box-preset input');
                    let presets: string[] = [];
                    inputs.forEach((input) => {
                        if (input.checked) {
                            presets.push(input.value);
                        }
                    });
                    console.log(presets);
                    
                    let triggerData = <item[] | null>{};
                    const items = LocStorage.getItems('items');
                    
                        if (triggerData = items.items) {
                            for (const ctgrItem of triggerData) {
                                if (ctgrItem.id === trggrCtgrName) {
                                    
                                    if(presets.length){
                                        ctgrItem.classes.position.forEach(classs => {
                                            console.log('ano, obsahuji css tridu, co je v pameti')
                                        if (trigger.classList.contains(classs)) {
                                            trigger.classList.remove(classs);
                                        } 
                                        });
                                        ctgrItem.classes.position =[];
                                        presets.forEach(classs => {
                                                trigger.classList.add(classs);
                                                ctgrItem.classes.position.push(classs);
                                        });
                                    }
                                }
                            }
                        } 
                    console.log(triggerData);
                    
                    LocStorage.setItem('items', items);

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

     public edtOuterMainBox(e:Event){
        if ((<HTMLElement>e.target).id === 'edt-outer-mainBox' ) {
            e.preventDefault();
            console.log('edt-outer-mainBox');

            const triggerPrntId = localStorage.getItem('trggrPrntId');
            if (triggerPrntId) {
                const triggerPrnt = document.getElementById(triggerPrntId);
                if(triggerPrnt){
                    const trggrCtgrName = <ctgrId>triggerPrnt.getAttribute('data-category');
                
                    const inputs = <NodeListOf<HTMLInputElement>>document.querySelectorAll('#edt-box-preset input');
                    let presets: string[] = [];
                    inputs.forEach((input) => {
                        if (input.checked) {
                            presets.push(input.value);
                        }
                    });
                    console.log(presets);
                    
                    let triggerData = <item[] | null>{};
                    const items = LocStorage.getItems('items');
                    
                        if (triggerData = items.items) {
                            for (const ctgrItem of triggerData) {
                                if (ctgrItem.id === trggrCtgrName) {
                            if(presets.length){
                                ctgrItem.classes.position.forEach(classs => {
                                    console.log('ano, obsahuji css tridu, co je v pameti')
                                if (triggerPrnt.classList.contains(classs)) {
                                    triggerPrnt.classList.remove(classs);
                                } 
                                });
                                ctgrItem.classes.position =[];
                                presets.forEach(classs => {
                                    triggerPrnt.classList.add(classs);
                                    ctgrItem!.classes.position.push(classs);
                                });
                            }
                        } 
                            }
                        }
                    console.log(triggerData);
                    
                    LocStorage.setItem('items', items);

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

    public edtMainBoxDcrtn(e:Event){
        //pokud se kliklo na tlačítko add boxItem
        if ((<HTMLElement>e.target).id === 'edt-mainBox-drctn' || (<HTMLElement>e.target).id === 'edt-outerMainBox-drctn'){
            e.preventDefault();
            console.log((<HTMLElement>e.target).id);

            //získání hodnot z checked inputů
            let presets = InputGetter.getChckInpdVls('#boxItem-preset');
            console.log(presets);
            let triggerId;
            //trigger je element, na kterém se vyvolalo menu
            if ((<HTMLElement>e.target).id === 'edt-mainBox-drctn') {
                triggerId = localStorage.getItem('triggerid');
            }
            else if ((<HTMLElement>e.target).id === 'edt-outerMainBox-drctn'){
                triggerId = localStorage.getItem('trggrPrntId');
            }
            if(triggerId){
                const trigger = document.getElementById(triggerId);
                if(trigger){

                    const trggrCtgrName = <ctgrId>trigger.getAttribute('data-category');
                    let items = LocStorage.getItems('items');
                    let triggerData = items.items;

                    if (triggerData) {
                        for (const ctgrItem of triggerData) {
                            if (ctgrItem.id === trggrCtgrName) {
                        if ((<boxItemClass>ctgrItem.classes).flexDrctn[0] !== presets[0].value) {
                            let badClass = (<boxItemClass>ctgrItem.classes).flexDrctn[0];
                            trigger.classList.remove(badClass);
                            trigger.classList.add(presets[0].value);

                            (<boxItemClass>ctgrItem.classes).flexDrctn[0] = presets[0].value;
                            LocStorage.setItem('items', items);

                        }
                        else{
                            return;
                        }
                        }
                        }
                    }
                    
                }
            }
        }
    
}
}