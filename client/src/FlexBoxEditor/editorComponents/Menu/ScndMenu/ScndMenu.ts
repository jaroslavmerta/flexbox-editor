import { Input } from "../../../../HTMLComponents/input/Input";
import { radioBttn } from "../../../../HTMLComponents/input/inputIntrfc";
import { buttonData } from "../menuIntrfc";
import { ctgrId } from "../../../editorTypes";
import { FrstMenu } from "../FrstMenu/FrstMenu";
import { checkClases } from "../FrstMenu/objectInterfaces";
import { bttnScndMenu, radioMenu, radioPstnBoxMenu, radioPstnBoxScndMenu, radioPstnImgScndMenu, radioScndMenu } from './objectInterfaces';
import styles from '../FrstMenu/frstMenu.module.scss';
import { LocStorage } from "../../../../common/localStorage/LocStorage";
import { boxItemClass, item } from "../../../../common/localStorage/storageInterfaces";
import { Menu } from '../Menu';
import { ExistInLocStorageError } from "../../../../common/error/locStorageError/ExistInLocStorageError";
import { BoxItem } from "../../Item/BoxItem/BoxItem";


export class ScndMenu extends Menu {
    //Dependencies
    protected input:Input;
    private boxItem: BoxItem;

    //Buttons
    private rszItmBtns:  buttonData[];
    
    private rszOuterBoxBtns: buttonData[];
    protected boxBckGrndBttns: buttonData[];

    //Texts for Buttons
    private fbColTextAiAs: string[];
    private fbRowTextAiAs: string[];
    private fbColTextJc: string[];
    private fbRowTextJc: string[];

    //Inputs radio
    private addBoxMenu: radioBttn[];
    protected edtItem: radioBttn[];
    protected edtBoxItemsAi: radioBttn[];
    protected edtBoxItemsJc: radioBttn[];
    private boxDrctnBttns: radioBttn[];
    private addGrowBttns: radioBttn[];
    protected rszItmPercentBtns: radioBttn[];
    private outerBoxBckGrndBttns: buttonData[];

    private radioScndMenus:radioScndMenu[];
    private bttnScndMenus:bttnScndMenu[];
    private radioPstnBoxScndMenus:radioPstnBoxScndMenu[];
    private radioPstnImgScndMenus:radioPstnImgScndMenu[];

    constructor(input:Input, boxItem:BoxItem){
        super();

        this.boxItem = boxItem;
        this.input = input;

        this.boxBckGrndBttns = [
            {id: this.boxItem.scndMenuIds.runFnc.edt.box.bckgrnd.clickInput, type:'button', text:'Add background image',
                input:{
                    id: this.boxItem.scndMenuIds.runFnc.edt.box.bckgrnd.runFnc,
                    type:'file',
                    accept:"image/jpeg, image,/png"
                }
            },
            {id: this.boxItem.scndMenuIds.runFnc.rmv.box.bckgrnd, type:'button', text:'Remove background image'},
        ]
        this.outerBoxBckGrndBttns = [
            {id: this.boxItem.scndMenuIds.runFnc.edt.outerBox.bckgrnd.clickInput, type:'button', text:'Add background image',
                input:{
                    id: this.boxItem.scndMenuIds.runFnc.edt.outerBox.bckgrnd.runFnc,
                    type:'file',
                    accept:"image/jpeg, image,/png"
                }
            },
            {id: this.boxItem.scndMenuIds.runFnc.rmv.outerBox.bckgrnd, type:'button', text:'Remove background image'},
        ]
        this.boxDrctnBttns = [
            {id: 'horizontal', type:'radio', name :'drtn', value:'horizontal', text:'Horizontal'},
            {id: 'vertical', type:'radio', name :'drtn', value:'vertical', text:'Vertical'},
        ]
        this.addGrowBttns = [
            {id: 'grow', type:'radio', name :'grow', value:'grow', text:'Grow'},
            {id: 'noGrow', type:'radio', name :'grow', value:'noGrow', text:'No grow'},
        ]

        this.addBoxMenu = [
            {id: 'horizontal', type:'radio', name : FrstMenu.flexDrctn, value:'horizontal', text:'Horizontal'},
            {id: 'vertical', type:'radio', name : FrstMenu.flexDrctn, value:'vertical', text:'Vertical', checked:'checked'},
            {id: 'grow', type:'radio', name : FrstMenu.width, value:'grow', text:'Grow', checked:'checked'},
            {id: 'noGrow', type:'radio', name :FrstMenu.width, value:'noGrow', text:'Fit content'},
        ];
        
        this.edtItem = [
            {id: 'start', type:'radio', name :'ornt', value:'fi-start', text:'Start'},
            {id: 'center', type:'radio', name :'ornt', value:'fi-center', text:'Center'},
            {id: 'end', type:'radio', name :'ornt', value:'fi-end', text:'End'},
            {id: 'stretch', type:'radio', name :'ornt', value:'fi-stretch', text:'Stretch'},
            {id: 'none-as', type:'radio', name :'ornt', value:'fi-none', text:'None'},
        ];
        this.edtBoxItemsAi = [
            {id: 'start-ai', type:'radio', name :'fb-ai', value:'fb-ai-start', text:'Start'},
            {id: 'center-ai', type:'radio', name :'fb-ai', value:'fb-ai-center', text:'Center'},
            {id: 'end-ai', type:'radio', name :'fb-ai', value:'fb-ai-end', text:'End'},
            {id: 'stretch-ai', type:'radio', name :'fb-ai', value:'fb-ai-stretch', text:'Stretch'},
           
        ];
        this.edtBoxItemsJc = [
            {id: 'start-jc', type:'radio', name :'fb-jc', value:'fb-jc-start', text:'Start'},
            {id: 'center-jc', type:'radio', name :'fb-jc', value:'fb-jc-center', text:'Center'},
            {id: 'end-jc', type:'radio', name :'fb-jc', value:'fb-jc-end', text:'End'},
            {id: 'sBetween', type:'radio', name :'fb-jc', value:'fb-jc-s_between', text:'Space between'},
            {id: 'sAround', type:'radio', name :'fb-jc', value:'fb-jc-s_around', text:'Space around'},
            {id: 'sEvenly', type:'radio', name :'fb-jc', value:'fb-jc-s_evenly', text:'Space evenly'},
        ];

        this.fbRowTextAiAs = ['Top', 'Center', 'Down'];
        this.fbColTextAiAs = ['Left', 'Center', 'Right'];
        this.fbRowTextJc = ['Left', 'Center', 'Right'];
        this.fbColTextJc = ['Top','Center','Down'];

        this.rszItmBtns = [
            {id: 'rsz-box-width', type:'button', text:'Resize width'},
            {id: 'rsz-box-height', type:'button', text:'Resize height'},
            {id: 'rsz-box-both', type:'button', text:'Resize both'},
            {id: 'rsz-box-pxl', type:'button', text:'Resize with pixels'}
        ];
        this.rszOuterBoxBtns = [
            {id: 'rsz-outerBox-width', type:'button', text:'Resize width'},
            {id: 'rsz-outerBox-height', type:'button', text:'Resize height'},
            {id: 'rsz-outerBox-both', type:'button', text:'Resize both'},
            {id: 'rsz-outerBox-pxl', type:'button', text:'Resize with pixels'}
        ];

        this.rszItmPercentBtns = [
            {id: 'x100', type:'radio', name :'width', value:'x100', text:'Width 100%'},
            {id: 'x0', type:'radio', name :'width', value:'x0', text:'No % width'},
            {id: 'y100', type:'radio', name :'height', value:'y100', text:'Height 100%'},
            {id: 'y0', type:'radio', name :'height', value:'y0', text:'No % height'},
        ];
        
        //Second menu objects
        this.radioScndMenus = [
            {id:'rsz-item-percent-scndMenu-radio', radioData: {buttonData: this.rszItmPercentBtns, formId:'boxItem-preset', submitId:'rsz-item-percent',submitText:'Change size',checkClas:['width', 'height']}},
            {id:'rsz-outerBox-percent-scndMenu-radio', radioData: {buttonData: this.rszItmPercentBtns, formId:'boxItem-preset', submitId:'rsz-outerBox-percent',submitText:'Change size',checkClas:['width', 'height'], outerBox: true}},
            {id:this.boxItem.scndMenuIds.runScndMenu.edt.box.grow, radioData: {buttonData: this.addGrowBttns, formId:'boxItem-preset', submitId: this.boxItem.scndMenuIds.runFnc.edt.box.grow ,submitText:'Edit grow',checkClas:['grow']}},
            {id:this.boxItem.scndMenuIds.runScndMenu.edt.outerBox.grow, radioData: {buttonData: this.addGrowBttns, formId:'boxItem-preset', submitId: this.boxItem.scndMenuIds.runFnc.edt.outerBox.grow, submitText:'Edit grow',checkClas:['grow'], outerBox: true}},
            {id:this.boxItem.scndMenuIds.runScndMenu.edt.box.drctn, radioData: {buttonData: this.boxDrctnBttns, formId:'boxItem-preset', submitId: this.boxItem.scndMenuIds.runFnc.edt.box.drctn, submitText:'Edit direction',checkClas:['flexDrctn']}},
            {id:this.boxItem.scndMenuIds.runScndMenu.edt.outerBox.drctn, radioData: {buttonData: this.boxDrctnBttns, formId:'boxItem-preset', submitId: this.boxItem.scndMenuIds.runFnc.edt.outerBox.drctn, submitText:'Edit direction',checkClas:['flexDrctn'], outerBox: true}},
            {id:'edt-mainBox-drctn-scndMenu-radio', radioData: {buttonData: this.boxDrctnBttns, formId:'boxItem-preset', submitId:'edt-mainBox-drctn',submitText:'Edit direction',checkClas:['flexDrctn']}},
            {id:'edt-outerMainBox-drctn-scndMenu-radio', radioData: {buttonData: this.boxDrctnBttns, formId:'boxItem-preset', submitId:'edt-outerMainBox-drctn',submitText:'Edit direction',checkClas:['flexDrctn'], outerBox: true}},
            {id:'add-outerBox-scndMenu-radio', radioData: {buttonData: this.addBoxMenu, formId:'boxItem-preset', submitId:'add-outerBoxItem',submitText:'Create box'}},
            {id:this.boxItem.scndMenuIds.runScndMenu.add.innerBox, radioData: {buttonData: this.addBoxMenu, formId:'boxItem-preset', submitId:this.boxItem.scndMenuIds.runFnc.add.innerBox,submitText:'Create box'}},
        ];
       
        this.bttnScndMenus = [
            {id: this.boxItem.scndMenuIds.runScndMenu.edt.box.bckgrnd, bttnData: this.boxBckGrndBttns},
            {id: 'add-mainBox-bckgrnd-scndMenu-bttn', bttnData: this.boxBckGrndBttns},
            {id: this.boxItem.scndMenuIds.runScndMenu.edt.outerBox.bckgrnd, bttnData: this.outerBoxBckGrndBttns},
            {id: 'rsz-item-pixel-scndMenu-bttn', bttnData: this.rszItmBtns},
            {id: 'rsz-outerBox-pixel-scndMenu-bttn', bttnData: this.rszOuterBoxBtns},

        ]

        this.radioPstnBoxScndMenus = [
            {id:this.boxItem.scndMenuIds.runScndMenu.edt.box.pstn, radioPstnData: {aiBttns: this.edtBoxItemsAi, jcBttns:this.edtBoxItemsJc, submitId: this.boxItem.scndMenuIds.runFnc.edt.box.pstn, asBttns: this.edtItem,} },
            {id:this.boxItem.scndMenuIds.runScndMenu.edt.box.pstn, radioPstnData: {aiBttns: this.edtBoxItemsAi, jcBttns:this.edtBoxItemsJc, submitId: this.boxItem.scndMenuIds.runFnc.edt.outerBox.pstn, asBttns: this.edtItem, outerBox: true} },
            {id:'edt-mainBox-pstn-scndMenu-radioPstnBox', radioPstnData: {aiBttns: this.edtBoxItemsAi, jcBttns:this.edtBoxItemsJc, submitId:'edt-mainBox-pstn'} },
            {id:'edt-outerMainBox-pstn-scndMenu-radioPstnBox', radioPstnData: {aiBttns: this.edtBoxItemsAi, jcBttns:this.edtBoxItemsJc, submitId:'edt-outerMainBox-pstn', asBttns:undefined, outerBox:true } },
        ];

        this.radioPstnImgScndMenus = [
            {
                id:'edt-img-pstn-scndMenu-radioPstnImg', radioPstnData: this.edtItem            
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