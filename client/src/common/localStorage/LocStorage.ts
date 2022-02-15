import { ctgrId } from "../../FlexBoxEditor/editorTypes";
import { ExistInLocStorageError } from "../error/locStorageError/ExistInLocStorageError";
import { nameValue } from "../inputGetter/objectInterfaces";
import { boxItemClass, item, items } from "./storageInterfaces";
import { BoxItem } from "../../FlexBoxEditor/editorComponents/Item/BoxItem/BoxItem";

interface ImgData{
    img:string,
    container:string
}

let debug = false;

export class LocStorage{

    static dimensions:string[]= [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'l' 
    ];

    /**
     * Returns data object from local storage, if there is none, create one with empty categories
     * @param itemName Item name to find data object
     * @returns object Data object from local storage
     */
   static getItem( itemName:string){
        const itemDataString = localStorage.getItem(itemName);
        if (itemDataString){
            const itemDataObj = JSON.parse(itemDataString);
            return itemDataObj;
        }
        else {
            return null;
        }
    }
    /**
     * Returns data object from local storage, if there is none, create one with empty categories
     * @param itemName Item name to find data object
     * @returns object Data object from local storage
     */
   static getItems(itemName:string){
        const itemDataString = localStorage.getItem(itemName);
        if (itemDataString){
            const itemDataObj = JSON.parse(itemDataString);
            return <items>itemDataObj;
        }
        else {
            const items: items = {items: []};
            LocStorage.setItem('items', items);
            return items;
        }
    }
    
    /**
     * Returns id of html element that triggered First, Second or State MENU
     */
    static getTrggrId(){
        const trggrIdKey = 'triggerid';
        const trggrId = localStorage.getItem(trggrIdKey);
        if (trggrId) {
            return trggrId;
        }
        throw new ExistInLocStorageError("Does not exist in local storage:", trggrIdKey);
    }

    /**
     * Returns a category of items 
     * @param items Items from local storage
     * @param ctgrId Id of category (e.g. "frstMainBox", "scndMainBox")
     * @returns 
     */
    static getCtgr(items:items, ctgrId:ctgrId){
        
        for (const category of items.items) {
            if (category.id === ctgrId) {
                return category
            }
        }
        throw new ExistInLocStorageError("Does not exist in local storage:", `item.id:${ctgrId}`);
        
    }

    /**
     * Save new item into localStorage: Make from newDataObject string and save under itemName
     * @param itemName 
     * @param newDataObj 
     */
   static setItem(itemName:string, newDataObj:object):void{
        const itemDataString = JSON.stringify(newDataObj);
        localStorage.setItem(itemName, itemDataString);
    }  
    /**
     * Creates new item Id
     * @returns 
     */
    static crtNewItemId(){
        return `item_${Date.now()}`;
    }

    /**
     * Save flexbox css classes flexDrctn and width from input option
     * @param presets Input option
     * @param classes Class object of box item
     */
    static saveFbInptClasOptn(presets:nameValue[], classes:boxItemClass){
        presets.forEach(preset => {
            if (preset.name === BoxItem.flexDrctn) {
                classes.flexDrctn.push(preset.value); 
            }
            else if(preset.name === BoxItem.width){
                classes.grow.push(preset.value)
            }
        });
    }


   static updateItemObj(itemName:string, newValues:object){
        const itemDataString = localStorage.getItem(itemName);
        if (itemDataString){
            const oldDataObj = JSON.parse(itemDataString);
            const newDataObj = {...oldDataObj,...newValues};
            const newDataString = JSON.stringify(newDataObj);
            localStorage.setItem(itemName, newDataString);
        }
    }

    static existCtgrSubItems(itemName:string, ctgrId:ctgrId){

        const itemObjectString = localStorage.getItem(itemName);
        if (!itemObjectString)
            return null;
        else {
            const itemObj = JSON.parse(itemObjectString);
            for (const item of itemObj.items) {
                if (item.id === ctgrId) {
                    const category = item;
                    if (category) {
                        if (category.subItems) {
                            if(Array.isArray(category.subItems) && !category.subItems.length){
                                console.log( `category ${ctgrId}. subitems does not exist`);
                                return null;
                            }
                            else if(Array.isArray(category.subItems) && category.subItems.length){
                                console.log(`category ${ctgrId}.subItems exists`);
                                return true;
                            }
                        }
                    }
                    
                }
            }
        }
    }

    /**
     * Counts recursively number of items in a ctgrId and returns this number
     * @param items 
     * @returns 
     */
    static countSubItems(items:item[]){
        let number:number = 0;
        items.forEach( item => {
            number = number + 1;
            if (item.subItems) {
                number = number + this.countSubItems(item.subItems);
            };
        });
        return number;
    }

    /**
     * 
     * In localStorage adds new item at the end of the ctgrId
     * @param items 
     * @param categoryClass 
     * @param item 
     */
    static pushNewItem (items:item[], ctgrId:ctgrId, newItem:item ) {
        let result:boolean = false;
        if (!items) {
            console.log('items = undefined in fnc LocStorage.pushNewItem');
            return result;
        } 
        else {
            items.forEach( item => {
                if (item.id === ctgrId) {
                    if (!item.subItems) {
                        item.subItems =  [newItem];
                        result=true;
                    }
                    else{
                        item.subItems!.push(newItem);
                        result=true;
                    }
                    
                }
                
            });
        }
        return result;
    }

    /**
     * 
     * @param categoryItems items[ctgrId]
     * @param idOfSearchedItem triggerId
     */
     static pushItemInSubItems(categoryItems:item[] | undefined, idOfSearchedItem:string, newItem:item):boolean{
        let result:boolean = false;
        if (!categoryItems) {
            console.log('Item.subitems = undefined in fnc LocStorage.pushItemInSubItems');
            return result;
        } 
        else {
            //to break the loop use for...of loop
            for (let index = 0; index < categoryItems.length; index++) {
                if(categoryItems[index].id === idOfSearchedItem){
                    //ulozeni nového itemu za hledaný item
                    if(categoryItems[index].subItems){
                        categoryItems[index].subItems!.push(newItem);
                        result= true;
                    }
                    else{
                        categoryItems[index].subItems = [newItem];
                        result= true;
                    }
                    break;
                }
                else if (categoryItems[index].subItems){//pokud NEJSOU subItemy       
                   result= this.pushItemInSubItems(categoryItems[index].subItems!, idOfSearchedItem, newItem);
                }
            };
        }
        return result;
    }
    /**
     * 
     * @param categoryItems items[ctgrId]
     * @param idOfSearchedItem triggerId
     */
     static placeItemBhndItem(categoryItems:item[] | undefined, idOfSearchedItem:string, newItem:item):boolean{
        let result:boolean = false;
        if (!categoryItems) {
            console.log('Item.subitems = undefined in fnc LocStorage.placeItemBhndItem');
            return result;
        } 
        else {
            //to break the loop use for...of loop
            for (let index = 0; index < categoryItems.length; index++) {
                if(categoryItems[index].id === idOfSearchedItem){
                    //ulozeni nového itemu za hledaný item
                    categoryItems.splice(index+1, 0, newItem)
                    result = true;
                    break;
                }
                else if (categoryItems[index].subItems){//pokud NEJSOU subItemy       
                    result = this.placeItemBhndItem(categoryItems[index].subItems!, idOfSearchedItem, newItem);
                }
                else{
                    console.log('Item.subitems = undefined in fnc LocStorage.placeItemBhndItem');
                }
            };
        }
        return result;
    }
    /**
     * Removes triggerData
     * @param categoryItems items[ctgrId]
     * @param idOfSearchedItem triggerId
     */
     static rmvItem(categoryItems:item[] | undefined, idOfSearchedItem:string):boolean{
        let result:boolean = false;
        if (!categoryItems) {
            console.log('Item.subitems = undefined in fnc LocStorage.rmvItem');
            return result;
        } 
        else {
            //to break the loop use for...of loop
            for (let index = 0; index < categoryItems.length; index++) {
                if(categoryItems[index].id === idOfSearchedItem){
                    //ulozeni objektu hledaneho itemu
                    categoryItems.splice(index,1);
                    result = true;
                    break;
                }
                else if (categoryItems[index].subItems){//pokud NEJSOU subItemy 
                    let subItems = categoryItems[index].subItems as item[];      
                    result =  this.rmvItem(subItems, idOfSearchedItem);
                }
                else{
                    console.log('Item.subitems = undefined in fnc LocStorage.rmvItem');
                }
            };
        }
        return result;
    }

    /**
     * Returns triggerData
     * @param categoryItems items[ctgrId]
     * @param idOfSearchedItem triggerId
     */
     static findItem(categoryItems:item[] | undefined, idOfSearchedItem:string){
        let searchedItem:item | null = <item | null>{};
         if (!categoryItems) {
            console.log('Item.subitems = undefined in fnc LocStorage.findItem')
            return searchedItem = null;
         }
         else{
            
            //to break the loop use for...of loop
            for (const item of categoryItems) {
                if(item.id === idOfSearchedItem){
                    //ulozeni objektu hledaneho itemu
                    searchedItem = item;
                    break;
                }
                else if (item.subItems){//pokud NEJSOU subItemy       
                    searchedItem = this.findItem(item.subItems, idOfSearchedItem);
                }
            };
            return searchedItem;
        }
    }

    /**
     * Replaces trigger with trigger subitems when parent is item
     * @param categoryItems items[ctgrId]
     * @param idOfSearchedItem triggerId
     */
     static rplcTrggrWTrggrSubItems(categoryItems:item[] | undefined,searchedItemPrntId:string, searchedItemId:string):boolean{
        let result:boolean = false;
        if (!categoryItems) {
            console.log('Item.subitems = undefined in fnc LocStorage.rplcTrggrWTrggrSubItems');
            return result = false;
        } 
        else {
            //to break the loop use for...of loop
            for (const item of categoryItems) {
                //hledani rodice triggeru
                if(item.id === searchedItemPrntId){
                    //ulozeni objektu hledaneho itemu
                    let parrent =  item;
                    let searchedItemSubItems:item[] = [] ;
                    if (parrent.subItems) {
                        for (let i = 0; i < parrent.subItems.length; i++) {
                            //nalezeni pozice hledaneho itemu v rodici
                            if (parrent.subItems[i].id === searchedItemId) {
                                // pokud je hledany item nalezen v rodici a ma nejake subItemy, uloz subItemy hledaneho itemu,vloz je do subItemu rodice a odstran hledany subItem
                                if (parrent.subItems[i].subItems) {
                                    searchedItemSubItems = parrent.subItems[i].subItems!;
                                    console.log('asi odstraneno')
                                    parrent.subItems.splice(i, 1, ...searchedItemSubItems)
                                    return result = true;
                    
                                }
                                else{
                                    parrent.subItems.splice(i, 1);
                                    return result = true;
                                }
                            }
                        }
                    }
                    
                }
                else if (item.subItems){//pokud JSOU subItemy       
                    result = this.rplcTrggrWTrggrSubItems(item.subItems, searchedItemPrntId, searchedItemId);
                }
                else{
                    console.log('Item.subitems = undefined in fnc LocStorage.rplcTrggrWTrggrSubItems');
                    result = false;
                }
            };
        }
        return result;
    }

     /**
     * Replaces trigger with trigger subitems when parent is main container 
     * @param categoryItems items[ctgrId]
     * @param idOfSearchedItem triggerId
     */
      static rplcTrggrWTrggrSubItemsInMain(categoryItems:item[] | undefined, searchedItemId:string){
        let result:boolean = false;
        if (!categoryItems) {
            console.log('Item.subitems = undefined in fnc LocStorage.rmvItem');
            return result = false;
        } 
        else {
            //to break the loop use for...of loop
            for (let i = 0; i < categoryItems.length; i++) {
                if(categoryItems[i].id === searchedItemId){
                    //ulozeni objektu hledaneho itemu
                    let searchedItem =  categoryItems[i];
                    if (searchedItem.subItems) {
                        categoryItems.splice(i, 1,...searchedItem.subItems)
                        return result = true;
                    }
                    else{
                        categoryItems.splice(i, 1);
                        return result = true;
                    }
                    
                }
                
            };
        }
        return result;
    }

    /**
     * Finds trigger item in category and and push newItem in its subItems
     * @param itemsInCtgr 
     * @param triggerId 
     * @param newItem 
     */
     static pasteItemInSubAccordingId(itemsInCtgr:item[] | undefined, triggerId:string, newItem:item){
        let result:boolean = false;
        if (!itemsInCtgr) {
            console.log('Item.subitems = undefined in fnc ImageItem.pasteItemInSubAccordingId');
            return result;
        } 
        else {
            itemsInCtgr.forEach( (item, index, arrayItself) => {
                if (item.id === triggerId) {
                    if (!arrayItself[index].subItems) {
                        arrayItself[index].subItems = [newItem];
                        result = true;
                    }
                    else{
                        arrayItself[index].subItems!.push(newItem);
                        result = true;
                    }
                    return;
                }
                else if(item.subItems){
                   result = this.pasteItemInSubAccordingId(item.subItems, triggerId, newItem)
                    
                }
                else{
                    console.log('Item.subitems = undefined in fnc ImageItem.pasteItemInSubAccordingId');
                }
            });
        }
        return result;
    }
    /**
     * Saves width in property inlStyle of item
     * @param item 
     * @param width 
     */
    static saveInlStylWidth(item:item, width:string|number) {
        if (item.inlStyl) {
            item.inlStyl.width = width.toString();
        }
        else{
            item.inlStyl = {width:width.toString()};
        }
    }
/**
 * Saves height in property inlStyle of item
 * @param item 
 * @param height 
 */
 static saveInlStylHeight(item:item, height:string|number) {
        if (item.inlStyl) {
            item.inlStyl.height = height.toString();
        }
        else {
            item.inlStyl = {height:height.toString()};
        }
    }

    static upgrItem(categoryItems:item[] | undefined, idOfSearchedItem:string, upgradedItem:item):boolean{
        let result:boolean = false;
         if (!categoryItems) {
            console.log('Item.subitems = undefined in fnc LocStorage.upgrItem')
            return result = false;
         }
         else{
            //to break the loop use for...of loop
            for (let item of categoryItems) {
                if(item.id === idOfSearchedItem){
                    //ulozeni objektu hledaneho itemu
                    item = upgradedItem;
                    result = true
                    break;
                }
                else if (item.subItems){//pokud NEJSOU subItemy       
                    result = this.upgrItem(item.subItems, idOfSearchedItem, upgradedItem);
                }
                else{
                    result = false;
                }
            };
            return result;
        }
    }


    /**
     * Returns dimension changed down relative to the trigger dimension
     * e.g. if trigger dimension is a, returns b. If b, returns c, etc.
     * @param triggerData 
     * @returns 
     */
     /* static dimensionDown(triggerData: item){
        let rightIndex:number = 0;
        for (let index = 0; index < LocStorage.dimensions.length; index++) {
            if(LocStorage.dimensions[index] === triggerData.dimension){
                rightIndex = index;
            }
        }
        return LocStorage.dimensions[rightIndex+1];
    } */

    /**
     * Returns dimension changed down relative to the trigger dimension
     * e.g. if trigger dimension is a, returns b. If b, returns c, etc.
     * @param triggerData 
     * @returns 
     */
    /*  static dimensionDownRecursively(categoryItems:item[] ,triggerId:string){
        for (const item of categoryItems) {
            if (item.id === triggerId) {  
                console.log('fucking'); 
                if (item.subItems) {
                    this.testingRecursively(item.subItems);
                    console.log('dogging');
                }
            }
            else if(item.subItems){
                this.dimensionDownRecursively(item.subItems, triggerId);
            }
        }
    }

    static testingRecursively(subItems:item[]){

        for (const item of subItems) {
           item.dimension = this.dimensionDown(item);
           if (item.subItems) {
               this.testingRecursively(item.subItems);
               console.log('working');
           }
        }

    } */

}