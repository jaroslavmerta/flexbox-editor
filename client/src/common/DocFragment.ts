interface Component{
    name:string;
    node:Node;
}

export class DocFragment{
    static components:Component[] = [];

    static elForHtmlColection:Component[] = [];
    
    static createDocFrag(): DocumentFragment{
        const htmlFrag = document.createDocumentFragment();
        DocFragment.components.forEach( (component: Component) => {
            htmlFrag.appendChild(component.node);

        
        });
        return htmlFrag;
    }

    static addComponent(component:Component){
        DocFragment.components.push(component);
    }

    static createHtmlColl(): DocumentFragment{
        const htmlFrag = document.createDocumentFragment();
        DocFragment.elForHtmlColection.forEach( (component: Component) => {
            htmlFrag.appendChild(component.node);

        
        });
        return htmlFrag;
    }

    static addNode(component:Component){
        DocFragment.elForHtmlColection.push(component);
    }
    

}