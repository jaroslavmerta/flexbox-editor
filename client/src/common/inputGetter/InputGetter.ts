import { nameValue } from "./objectInterfaces";

export class InputGetter {
    /**
     * Gets input name and value from checked inputs
     * @param formId 
     * @returns 
     */
    static getChckInpdVls(formId:string ){
        const inputs = <NodeListOf<HTMLInputElement>>document.querySelectorAll(`${formId} input`);
        let presets: nameValue[] = [];
        inputs.forEach((input) => {
            if (input.checked) {
                presets.push({name : input.name, value : input.value});
            }
        });

        return presets;
    }
}