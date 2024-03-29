import { Input } from "../../../../HTMLComponents/input/Input";
import { radioBttn } from "../../../../HTMLComponents/input/inputIntrfc";
import { buttonData } from "../menuIntrfc";
import { ctgrId } from "../../../editorTypes";
import { checkClases } from "../FrstMenu/objectInterfaces";
import { bttnScndMenu, radioMenu, radioPstnBoxMenu, radioPstnBoxScndMenu, radioPstnImgScndMenu, radioScndMenu } from './objectInterfaces';
import styles from '../FrstMenu/frstMenu.module.scss';
import { LocStorage } from "../../../../common/localStorage/LocStorage";
import { boxItemClass, item } from "../../../../common/localStorage/storageInterfaces";
import { Menu } from '../Menu';
import { ExistInLocStorageError } from "../../../../common/error/locStorageError/ExistInLocStorageError";
import { BoxItem } from "../../Item/BoxItem/BoxItem";
import { Box } from './../../Box/Box';
import { Item } from './../../Item/Item';
import { MainBox } from './../../MainBox/MainBox';
import { ImageItem } from './../../Item/ImageItem/ImageItem';


export class ScndMenu extends Menu {
    //Dependencies
    protected input:Input;
    private boxItem: BoxItem;
    private box:Box;
    private item:Item;
    private mainBox:MainBox;
    private imgItem: ImageItem;


    //Texts for buttons affecting item position
    private fbColTextAiAs: string[];
    private fbRowTextAiAs: string[];
    private fbColTextJc: string[];
    private fbRowTextJc: string[];

    private radioScndMenus:radioScndMenu[];
    private bttnScndMenus:bttnScndMenu[];
    private radioPstnBoxScndMenus:radioPstnBoxScndMenu[];
    private radioPstnImgScndMenus:radioPstnImgScndMenu[];

    constructor(input:Input, boxItem:BoxItem, box:Box, item:Item, mainBox:MainBox, imgItem:ImageItem){
        super();

        //Dependencies 
        this.boxItem = boxItem;
        this.input = input;
        this.box = box;
        this.item = item;
        this.mainBox = mainBox;
        this.imgItem = imgItem;

        //Texts for buttons affecting item position
        this.fbRowTextAiAs = ['Top', 'Center', 'Down'];
        this.fbColTextAiAs = ['Left', 'Center', 'Right'];
        this.fbRowTextJc = ['Left', 'Center', 'Right'];
        this.fbColTextJc = ['Top','Center','Down'];
        
        //Second menu objects
        this.radioScndMenus = [
            {id: this.item.scndMenuIds.runScndMenu.edt.item.rszPercent, radioData: {buttonData: this.item.bttns.scndMenu.rszPercent, formId:'boxItem-preset', submitId:this.item.scndMenuIds.runFnc.edt.item.rszPercent,submitText:'Change size',checkClas:['width', 'height']}},
            {id: this.item.scndMenuIds.runScndMenu.edt.outerBoxItem.rszPercent, radioData: {buttonData: this.item.bttns.scndMenu.rszPercent, formId:'boxItem-preset', submitId: this.item.scndMenuIds.runFnc.edt.outerBoxItem.rszPercent,submitText:'Change size',checkClas:['width', 'height'], outerBox: true}},
            {id: this.boxItem.scndMenuIds.runScndMenu.edt.box.grow, radioData: {buttonData: this.boxItem.bttns.scndMenu.grow, formId:'boxItem-preset', submitId: this.boxItem.scndMenuIds.runFnc.edt.box.grow ,submitText:'Edit grow',checkClas:['grow']}},
            {id: this.boxItem.scndMenuIds.runScndMenu.edt.outerBox.grow, radioData: {buttonData: this.boxItem.bttns.scndMenu.grow, formId:'boxItem-preset', submitId: this.boxItem.scndMenuIds.runFnc.edt.outerBox.grow, submitText:'Edit grow',checkClas:['grow'], outerBox: true}},
            {id: this.boxItem.scndMenuIds.runScndMenu.edt.box.drctn, radioData: {buttonData: this.box.bttns.scndMenu.drctn, formId:'boxItem-preset', submitId: this.boxItem.scndMenuIds.runFnc.edt.box.drctn, submitText:'Edit direction',checkClas:['flexDrctn']}},
            {id: this.boxItem.scndMenuIds.runScndMenu.edt.outerBox.drctn, radioData: {buttonData: this.box.bttns.scndMenu.drctn, formId:'boxItem-preset', submitId: this.boxItem.scndMenuIds.runFnc.edt.outerBox.drctn, submitText:'Edit direction',checkClas:['flexDrctn'], outerBox: true}},
            {id: this.mainBox.scndMenuIds.runScndMenu.edt.box.drctn, radioData: {buttonData: this.box.bttns.scndMenu.drctn, formId:'boxItem-preset', submitId:this.mainBox.scndMenuIds.runFnc.edt.box.drctn,submitText:'Edit direction',checkClas:['flexDrctn']}},
            {id: this.mainBox.scndMenuIds.runScndMenu.edt.outerBox.drctn, radioData: {buttonData: this.box.bttns.scndMenu.drctn, formId:'boxItem-preset', submitId:this.mainBox.scndMenuIds.runFnc.edt.outerBox.drctn,submitText:'Edit direction',checkClas:['flexDrctn'], outerBox: true}},
            {id:this.boxItem.scndMenuIds.runScndMenu.add.outerBox.addThis, radioData: {buttonData: this.boxItem.bttns.scndMenu.addBoxItem, formId:'boxItem-preset', submitId:this.boxItem.scndMenuIds.runFnc.add.outerBox,submitText:'Create box'}},
            {id:this.boxItem.scndMenuIds.runScndMenu.add.box.addThis, radioData: {buttonData: this.boxItem.bttns.scndMenu.addBoxItem, formId:'boxItem-preset', submitId:this.boxItem.scndMenuIds.runFnc.add.innerBox,submitText:'Create box'}},
        ];
       
        this.bttnScndMenus = [
            {id: this.boxItem.scndMenuIds.runScndMenu.edt.box.bckgrnd, bttnData: this.boxItem.bttns.scndMenu.bckGrnd},
            //{id: 'add-mainBox-bckgrnd-scndMenu-bttn', bttnData: this.boxBckGrndBttns},
            {id: this.boxItem.scndMenuIds.runScndMenu.edt.outerBox.bckgrnd, bttnData: this.boxItem.bttns.scndMenu.bckGrndOuter},
            {id: this.boxItem.scndMenuIds.runScndMenu.edt.box.rszPixel, bttnData: this.boxItem.bttns.scndMenu.rszPixel},
            {id: this.boxItem.scndMenuIds.runScndMenu.edt.outerBox.rszPixel, bttnData: this.boxItem.bttns.scndMenu.rszPixelOuter},
        ]

        this.radioPstnBoxScndMenus = [
            {id: this.boxItem.scndMenuIds.runScndMenu.edt.box.pstn, radioPstnData: {aiBttns: this.box.bttns.scndMenu.algnItms, jcBttns:this.box.bttns.scndMenu.jstfItms, submitId: this.boxItem.scndMenuIds.runFnc.edt.box.pstn, asBttns: this.item.bttns.scndMenu.algnSelf,} },
            {id: this.boxItem.scndMenuIds.runScndMenu.edt.outerBox.pstn, radioPstnData: {aiBttns: this.box.bttns.scndMenu.algnItms, jcBttns:this.box.bttns.scndMenu.jstfItms, submitId: this.boxItem.scndMenuIds.runFnc.edt.outerBox.pstn, asBttns: this.item.bttns.scndMenu.algnSelf, outerBox: true} },
            {id: this.mainBox.scndMenuIds.runScndMenu.edt.box.pstn, radioPstnData: {aiBttns: this.box.bttns.scndMenu.algnItms, jcBttns:this.box.bttns.scndMenu.jstfItms, submitId:this.mainBox.scndMenuIds.runFnc.edt.box.pstn} },
            {id: this.mainBox.scndMenuIds.runScndMenu.edt.outerBox.pstn, radioPstnData: {aiBttns: this.box.bttns.scndMenu.algnItms, jcBttns:this.box.bttns.scndMenu.jstfItms, submitId:this.mainBox.scndMenuIds.runFnc.edt.outerBox.pstn, asBttns:undefined, outerBox:true } },
        ];

        this.radioPstnImgScndMenus = [
            {
                id: this.imgItem.scndMenuIds.runScndMenu.edt.pstn, radioPstnData: this.item.bttns.scndMenu.algnSelf            
            }
        ];
    }
    

    public crtScndMenu(e:Event, evTrgtId:string) {
        let evTrgtIdCut = evTrgtId.split('-');
        let scndMenu: HTMLDivElement | null = null;
        if (evTrgtIdCut[evTrgtIdCut.length -1] === 'radio') {
            let scndMenuObj = this.radioScndMenus.find(obj => obj.id === evTrgtId)
            if (scndMenuObj) {
                const radioData = this.radioObjToArray(scndMenuObj.radioData);
                scndMenu = this.crtRadioMenu(e, ...radioData);
            }
        }
        if (evTrgtIdCut[evTrgtIdCut.length -1] === 'bttn') {
            let scndMenuObj = this.bttnScndMenus.find(obj => obj.id === evTrgtId)
            if (scndMenuObj) {
                const radioData = scndMenuObj.bttnData;
                scndMenu = this.crtBttnMenu(e, radioData);
            }
        }
        if (evTrgtIdCut[evTrgtIdCut.length -1] === 'radioPstnBox') {
            let scndMenuObj = this.radioPstnBoxScndMenus.find(obj => obj.id === evTrgtId)
            if (scndMenuObj) {
                const radioData = this.radioPstnObjToArray(scndMenuObj.radioPstnData);
                scndMenu = this.crtBoxPstnMenu(e, ...radioData);
            }
        }
        if (evTrgtIdCut[evTrgtIdCut.length -1] === 'radioPstnImg') {
            let scndMenuObj = this.radioPstnImgScndMenus.find(obj => obj.id === evTrgtId)
            if (scndMenuObj) {
                const radioData = scndMenuObj.radioPstnData;
                scndMenu = this.crtImgPstnMenu(e, radioData);
            }
        }
        return scndMenu;
    }

    private radioObjToArray(scndMenuObj: radioMenu) {
        return  <[radioBttn[], string, string, string, checkClases[]?, boolean?]>Object.values(scndMenuObj);
    }

    private radioPstnObjToArray(scndMenuObj: radioPstnBoxMenu) {
        return  <[radioBttn[], radioBttn[], string, radioBttn[]?, boolean?]>Object.values(scndMenuObj);
    }

    protected crtBttnMenu(e:Event, rszItmBtns:buttonData[]){
        let menu = this.crtMenuBI(rszItmBtns, this.navData);
        this.placeMenu(e, menu, styles.itemMenu);
        return menu;

    }

    /**
     * Creates radio menu for new elements, with checked value in button or not
     * @param e 
     * @param itemId ukládá id itemu, na kterém bylo vyvoláno mainMenu
     * @returns 
     */
     protected crtRadioMenu(e:Event, buttonData:radioBttn[],formId:string, submitId:string, submitText:string, checkClas?:checkClases[], outerBox?:boolean){
        if(checkClas){
            let triggerId;
            if (outerBox) {
                triggerId = localStorage.getItem('trggrPrntId');
            }
            else{
                triggerId = localStorage.getItem('triggerid');
            }
            if (triggerId) {
                const trigger = document.getElementById(triggerId);
                if (trigger) {
                    const trggrCtgr = trigger.getAttribute('data-category');
                    if (trggrCtgr) {
                        this.setInptChecked(trigger, <ctgrId>trggrCtgr, buttonData, checkClas);
                    }
                }
            }
        }
       
        const form = this.input.crtBoxItemForm(buttonData, formId ,submitId , submitText, 'doNotClose');
        const divElm = document.createElement('div');
        divElm.setAttribute('id', 'itemMenu');
        divElm.append(form);
        this.placeMenu(e, divElm, styles.itemMenu);
        let itemId = localStorage.getItem('triggerid');

        if(itemId){
            divElm.setAttribute('data-triggerid', itemId);
        }
        divElm.classList.add(styles.itemMenu);
        
        return divElm;
        
    }

    protected setInptChecked(affctdItm:HTMLElement, affctdItmCategory:ctgrId, buttonData:radioBttn[], checkClas:checkClases[]){
        const items = LocStorage.getItems('items');
        let ctgrData:item | null = null;
        try {
            ctgrData = LocStorage.getCtgr(items, affctdItmCategory);
            
        } catch (error:unknown) {
            if (error instanceof ExistInLocStorageError) {
                console.log(error.message, error.property)
            }
        }
        if (ctgrData) {
            //odstran predesle checked hodnoty  
            buttonData.forEach(button =>{
                if (button.hasOwnProperty('checked')) {
                    delete button.checked;
                }
            })
            //nastav checked hodnoty podle posledních hodnot v paměti
            let triggerData:item|null;
            if (affctdItm.id === 'frstMainBox' || affctdItm.id === 'scndMainBox') {
                triggerData = ctgrData;
            }
            else{
                triggerData = LocStorage.findItem(ctgrData.subItems, affctdItm.id);
            }
            if (triggerData) {
                checkClas.forEach(clas => {
                    (<boxItemClass>triggerData!.classes)[clas].forEach(classs => {
                        buttonData.forEach(button => {
                            if (classs === button.value) {
                                button.checked = 'checked';
                            }
                        });
                    });
                });
            }
        }
    }

    /**
     * 
     * @param e 
     * @param boxPstnBttnsDataAi Buttons data for align-items
     * @param boxPstnBttnsDataJc Buttons data for justify-content
     * @param affctdItmId Affected box id 
     * @param itemPstnBttnsData Buttons data for align-self, if affected box is also item
     * @returns 
     */
     protected crtBoxPstnMenu(e:Event, boxPstnBttnsDataAi:radioBttn[],boxPstnBttnsDataJc:radioBttn[], submitId:string, itemPstnBttnsData?:radioBttn[], outerBox?:boolean){
        let affctdItmId;
        if (outerBox) {
            affctdItmId = localStorage.getItem('trggrPrntId');
        }
        else{
            affctdItmId = localStorage.getItem('triggerid');
        }
        let docFrgAll = document.createDocumentFragment();
        let form:HTMLFormElement = <HTMLFormElement>{};
        let affctdItm: null | HTMLElement = null;
        if (affctdItmId) {
            affctdItm = document.getElementById(affctdItmId);
            
        }
        if (affctdItm) {
            
            const affctdItmCategory = <ctgrId>affctdItm.getAttribute('data-category');
            
            let docFrgGroup = document.createDocumentFragment();
            let boxPstnBttnsAi = this.crtPstnOpt(affctdItm, affctdItmCategory, boxPstnBttnsDataAi, this.fbRowTextAiAs, this.fbColTextAiAs);
            let div = document.createElement('div');
            div.append(boxPstnBttnsAi);
            let boxPstnBttnsJc = this.crtPstnOpt(affctdItm, affctdItmCategory, boxPstnBttnsDataJc, this.fbRowTextJc, this.fbColTextJc);
            div.append(boxPstnBttnsJc);
            div.classList.add(styles.titleBoxRow);

            docFrgGroup.append(div);
            let boxPstnBttnsAiTitled = this.giveBttnsTitle(docFrgGroup, 'Position of internal items'); //tadyy
            docFrgAll.append(boxPstnBttnsAiTitled);
            //if box is also item
            if (itemPstnBttnsData) {
                let affctdItmPrnt = affctdItm.parentElement;
                if (affctdItmPrnt) {
                    let itemPstnBttns= this.crtPstnOpt(affctdItm, affctdItmCategory, itemPstnBttnsData, this.fbRowTextAiAs, this.fbColTextAiAs, affctdItmPrnt);  
                    let itemPstnBttnsTitled = this.giveBttnsTitle(itemPstnBttns, 'Item position');
                    docFrgAll.append(itemPstnBttnsTitled);
                    form = this.input.crtForm('edt-box-preset',submitId , 'Edit boxItem', docFrgAll);
                }
            }
            //if box is kind main box that can not be position
            else{
                form = this.input.crtForm('edt-box-preset',submitId , 'Edit main box', docFrgAll);
            }
        }
        //asi to bude chtít ještě jeden div, aby byli moznosti pozicovani vedle sebe

        const divElm = document.createElement('div');
        divElm.setAttribute('id', 'itemMenu');
        
        divElm.append(form);
        this.placeMenu(e, divElm, styles.itemMenu);

        if(affctdItmId){
            divElm.setAttribute('data-triggerid', affctdItmId);
        }
        
        return divElm;
    }

        /**
     * Sets text to radio buttons acording to flex direction fo trigger or parrent, sets chcecked values acording to memory and creates radio buttons menu
     * @param affctdItm 
     * @param affctdItmCategory 
     * @param boxPstnBttnsData 
     * @param fbRowText 
     * @param fbColText 
     * @param affctdItmPrn 
     * @returns 
     */
         private crtPstnOpt(affctdItm:HTMLElement, affctdItmCategory:ctgrId, boxPstnBttnsData:radioBttn[], fbRowText:string[], fbColText:string[], affctdItmPrn?:HTMLElement) {
            if (affctdItmPrn) {
                this.setTxtToFbBttns(affctdItmPrn, boxPstnBttnsData,fbRowText, fbColText );
            }
            else{
                this.setTxtToFbBttns(affctdItm, boxPstnBttnsData,fbRowText, fbColText );
            }
            this.setInptChecked(affctdItm, affctdItmCategory, boxPstnBttnsData, ['position']);
            const boxPstnBttns = this.input.crtRadioBttn(boxPstnBttnsData, 'doNotClose');
            
            const div = document.createElement('div');
            div.classList.add(styles.titleBoxCol);
            div.append(boxPstnBttns);
            const docFrg = document.createDocumentFragment();
            docFrg.append(div);
            return docFrg ;
        }

        private setTxtToFbBttns(affctdItm:HTMLElement, buttonData:radioBttn[], fbRowText:string[], fbColText:string[]){

            //pokud je triggerPrnt flexBox direction colmn, jinak nemen pro direction row
            if (affctdItm.classList.contains('vertical')) {
                console.log('spoustim vertical edit')
                fbColText.forEach( (text, i) => {
                    buttonData[i].text  = text;
                });
            }
            else if (affctdItm.classList.contains('horizontal')) {
                console.log('spoustim horizontal edit')
                fbRowText.forEach( (text, i) => {
                    buttonData[i].text  = text;
                });
            }
        }

            /**
     * Creates item menu
     * @param e 
     * @param itemId ukládá id itemu, na kterém bylo vyvoláno menu
     * @returns 
     */
    protected crtImgPstnMenu(e:Event, buttonData:radioBttn[] ){
        let triggerId = localStorage.getItem('triggerid');
        let docFrg = document.createDocumentFragment();
        if(triggerId){
           const trigger = document.getElementById(triggerId);
           if (trigger) {
                let trggrPrnt = trigger.parentElement;
                if (trggrPrnt) {
                    const triggerCategory = <ctgrId>trigger.getAttribute('data-category');
                    let buttons = this.crtPstnOpt(trigger,triggerCategory, buttonData, this.fbRowTextAiAs, this.fbColTextAiAs, trggrPrnt)
                    let buttonsTitled = this.giveBttnsTitle(buttons, 'Item position');
                    docFrg.append(buttonsTitled);
                }
            }
        }
         
        let form = this.input.crtForm('imgItem-preset','edt-img-pstn' , 'Edit image', docFrg, 'doNotClose');
       
        const divElm = document.createElement('div');
        divElm.setAttribute('id', 'itemMenu');
        divElm.append(form);
        this.placeMenu(e, divElm, styles.itemMenu);

        if(triggerId){
            divElm.setAttribute('data-triggerid', triggerId);
        }
        divElm.classList.add(styles.itemMenu);
        
        return divElm;
        
    }
    
}