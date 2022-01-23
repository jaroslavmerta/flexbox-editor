import styles from './styles.module.scss';
//******************************* */
const newEl = document.createElement('button');
newEl.classList.add(`${styles.test}`);
/* newEl.addEventListener('click',(e)=>{
    console.log((<HTMLButtonElement>e.target));
    if((<HTMLButtonElement>e.target).style.background !== 'red'){
    
        (<HTMLButtonElement>e.target).style.background='red';
    }
    else {
        (<HTMLButtonElement>e.target).style.background='white';
    }
 }); */

const callBack = (e:Event)=>{
    console.log((<HTMLButtonElement>e.target));
    if((<HTMLButtonElement>e.target).style.background !== 'red'){
    
        (<HTMLButtonElement>e.target).style.background='red';
    }
    else {
        (<HTMLButtonElement>e.target).style.background='white';
    }
 };

 const events: {name: string, call:any}[] = [
    {
        name:'click',
        call: callBack
    }
 ];

const testFragment = document.createDocumentFragment();
testFragment.appendChild(newEl);
const fragChildren = testFragment.children;
/* for(const element of fragChildren) {
    element.addEventListener('click',(e)=>{
        console.log((<HTMLButtonElement>e.target));
        if((<HTMLButtonElement>e.target).style.background !== 'red'){
        
            (<HTMLButtonElement>e.target).style.background='red';
        }
        else {
            (<HTMLButtonElement>e.target).style.background='white';
        }
     })
}; */
//addListenersSame(fragChildren, events);

console.log(fragChildren.length);




//console.log(testFragment.children);
//root.appendChild(testFragment);
//******************************* */
//console.log(testFragment.children);