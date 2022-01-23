import { FlexBoxEditor } from './FlexBoxEditor/FlexBoxEditor';

const root = document.getElementById('root');
if (root) {
    const flexBoxEditor = new FlexBoxEditor();
    const flexBoxEditorElm = flexBoxEditor.crtEditor();
    
    //Add event delegation to root element
    flexBoxEditor.eventListeners.evDelegation(root);
    
    //Append flexBox editor to root element
    root.appendChild(flexBoxEditorElm);
    
 
}
else{
    window.alert('Application is not working');
    console.log('root element not found');
}