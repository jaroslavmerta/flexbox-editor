import { addAtributes } from "../../common/AtributesToElement";
import { eventAndCall } from "../../common/EventListeners";
import { addInlineStyle } from "../../common/StyleToElement";
import { Item } from '../../FlexBoxEditor/editorComponents/Item/Item';
import { LocStorage } from '../../common/localStorage/LocStorage';
//interface
import { item, items } from "../../common/localStorage/storageInterfaces";
import { radioBttn } from "./inputIntrfc";

export class Input{

    private atributes: { [key: string]: string; };
    private styles: { [key: string]: string; };
  

    constructor() {
    

        this.atributes = {
            type:'file',
            id:'image_input',
            accept: 'image/jpeg, image/png'
        };

        this.styles = {
            display:'block'
        };


    }

    /* public addInput():HTMLInputElement{
        const input = this.createInputElem(this.styles, this.atributes);

        return input;
    } */


    public crtBoxItemForm( inputObj:radioBttn[], formId:string, submitId:string, submitText:string, commonClass?:string ) {
        const formElm = document.createElement('form');
        formElm.setAttribute('id', formId);
        if(commonClass){
            formElm.classList.add(commonClass)
        }
        const radioBttns = this.crtRadioBttn(inputObj, commonClass);
        let div = document.createElement('div')
        div.append(radioBttns)//tady
        formElm.append(div);

        const submit = document.createElement('input');
        submit.setAttribute('id', submitId);

        submit.setAttribute('type', 'submit');
        submit.setAttribute('value', submitText);
        formElm.append(submit);

        return formElm;
    }

    public crtForm( formId:string, submitId:string, submitText:string, radioBttns:DocumentFragment, commonClass?:string ) {
        const formElm = document.createElement('form');
        formElm.setAttribute('id', formId);
        if(commonClass){
            formElm.classList.add(commonClass)
        }
        let div = document.createElement('div');
        
        div.append(radioBttns);
        formElm.append(div);

        const submit = document.createElement('input');
        submit.setAttribute('id', submitId);

        submit.setAttribute('type', 'submit');
        submit.setAttribute('value', submitText);
        formElm.append(submit);

        return formElm;
    }

    public crtRadioBttn(inputObj:radioBttn[], commonClass?:string ) {
        const docFragment = document.createDocumentFragment();
        inputObj.forEach( input => {
            const inputElm = document.createElement('input');
            inputElm.setAttribute('id', input.id);
            inputElm.setAttribute('type', input.type);
            inputElm.setAttribute('name', input.name);
            inputElm.setAttribute('value', input.value);
            if (input.checked) {
                inputElm.setAttribute('checked', input.checked);
            }
            
            const labelElm = document.createElement('label');
            labelElm.setAttribute('for', input.id);
            labelElm.innerText = input.text;

            const div = document.createElement('div');

            if (commonClass) {
                inputElm.classList.add(commonClass);
                labelElm.classList.add(commonClass);
                div.classList.add(commonClass);
            }

            //div.classList.add();
            div.append(inputElm);
            div.append(labelElm);
            docFragment.append(div);
        });
        
        
        return docFragment;
    }

}

/* 
        let newImage = document.createElement('img');
                newImage.setAttribute('src',`${uploaded_image}`);
                let newDiv = document.createElement('div');
                let number = Math.random();
                console.log(number)
                newImage.setAttribute('id',number.toString());
                //newDiv.appendChild(newImage);
                newImage.classList.add('item');
                let item = document.getElementsByClassName('material');
                item[0].appendChild(newImage);
                 */
