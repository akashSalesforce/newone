import { LightningElement, wire,api } from 'lwc';
import getUser from '@salesforce/apex/fetchUserDetails.getUser'
//import { getRecord,getFieldValue} from 'lightning/uiRecordApi';
//import {getSObjectValue} from '@salesforce/apex'
import {getSObjectValue} from '@salesforce/apex'
// import { getListUi } from 'lightning/uiListApi';
// import USER_OBJECT from '@salesforce/schema/UserDetail__c';
//import { getSObjectValue } from '@salesforce/apex';
//import { getFieldValue } from 'lightning/uiRecordApi';
import USER_ID from '@salesforce/schema/UserDetail__c.UserID__c'
import PASS  from '@salesforce/schema/UserDetail__c.Password__c'
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
import{NavigationMixin} from 'lightning/navigation'
const fields=[USER_ID,PASS]
export default class NewComponent extends NavigationMixin(LightningElement)  {
    uName=''
    pword=''
    userName=''
    password=''
    // @api usercollection
    userHandler(event){
        this.userName=event.target.value
            }
            passHandler(event){
        this.password=event.target.value
        }
       
        @wire(getUser,{uName:"$userName"}) UserDetail__c
      
//     @api recordId;
// @api userpassCol
//     @wire(getRecord, { recordId: '$recordId', fields })
//     Usercol({data,error}){
// if(data){
//     this.userpassCol=data
//      this.uName=getFieldValue(data,USER_ID)
//       this.pword=getFieldValue(data,PASS)
// }
// else if(error){
//     console.log(error)
// }
//     }
  
   



        //     get checkP(){
        //         return getFieldValue(this.UserDetail__c.data,USER_ID)
        //     }
        
        submitHandler(){
        
        this.uName = getSObjectValue(this.UserDetail__c.data,USER_ID)
      
        this.pword = getSObjectValue(this.UserDetail__c.data,PASS) 
      
           if( this.userName===this.uName && this.password===this.pword){
            const showMsg= new ShowToastEvent({
                title:'Successfull',
                message:'Successfully Login',
                variant:'success',
                mode:'dismissable' 
            
            })

            this.dispatchEvent(showMsg)
            this[NavigationMixin.Navigate]({
                type:'standard__webPage',
                attributes:{
                    "url": "https://c36010-dev-ed.lightning.force.com/lightning/n/Electronics"
                }
               
            
            })
           }
           
               
            else{
                const showMsg1= new ShowToastEvent({
                    title:'error',
                    message:'Login details are Wrong',
                    variant:'error',
                    mode:'dismissable'
                
                })
                this.dispatchEvent(showMsg1)
            }


        }
        resetHandler(){
          
            this.userName=''
            this.password=''
        }
        registerHandler(event){
            this[NavigationMixin.Navigate]({
                type: 'standard__objectPage',
                attributes: {
                    objectApiName: 'UserDetail__c',
                    actionName: 'new'
            }
        })
        
        }
    }