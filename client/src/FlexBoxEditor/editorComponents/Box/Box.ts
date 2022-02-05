
import { boxBttns } from './objectInterfaces';

export class Box {

    public bttns: boxBttns;

   

    constructor() {

        this.bttns = {
            scndMenu:{
                drctn:[
                    {id: 'horizontal', type:'radio', name :'drtn', value:'horizontal', text:'Horizontal'},
                    {id: 'vertical', type:'radio', name :'drtn', value:'vertical', text:'Vertical'},
                ],
               
                algnItms:[
                    {id: 'start-ai', type:'radio', name :'fb-ai', value:'fb-ai-start', text:'Start'},
                    {id: 'center-ai', type:'radio', name :'fb-ai', value:'fb-ai-center', text:'Center'},
                    {id: 'end-ai', type:'radio', name :'fb-ai', value:'fb-ai-end', text:'End'},
                    {id: 'stretch-ai', type:'radio', name :'fb-ai', value:'fb-ai-stretch', text:'Stretch'},
                   
                ],
                jstfItms:[
                    {id: 'start-jc', type:'radio', name :'fb-jc', value:'fb-jc-start', text:'Start'},
                    {id: 'center-jc', type:'radio', name :'fb-jc', value:'fb-jc-center', text:'Center'},
                    {id: 'end-jc', type:'radio', name :'fb-jc', value:'fb-jc-end', text:'End'},
                    {id: 'sBetween', type:'radio', name :'fb-jc', value:'fb-jc-s_between', text:'Space between'},
                    {id: 'sAround', type:'radio', name :'fb-jc', value:'fb-jc-s_around', text:'Space around'},
                    {id: 'sEvenly', type:'radio', name :'fb-jc', value:'fb-jc-s_evenly', text:'Space evenly'},
                ]
            }
        }
    }

}