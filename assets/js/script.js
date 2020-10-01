class Calculator{
    constructor(previous, current){
        this.previous=previous;
        this.current=current;
        this.clear();
    }
    clear(){
        this.currentOperand='';
        this.previousOperand='';
        this.operation='';
    }

    delete(){
        this.currentOperand=this.currentOperand.toString().slice(0,-1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand=   this.currentOperand.toString() + number.toString();
    }
    chooseOperator(operation){

        if(this.currentOperand == '') return;
        if(this.previousOperand!=='') 
        {
            this.compute();
        }
        this.operation=operation;
        this.previousOperand=this.currentOperand;
        this.currentOperand='';
    }
    compute(){
        let computation;
        const prev=parseFloat(this.previousOperand);
        const curr=parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr))return;

        switch(this.operation){
            case '+':
                computation= prev+curr;
                break;
            case '-':
                computation=prev-curr;
                break;
            case '/':
                computation=prev/curr;
                break;
            case '*':
                computation=prev*curr;
                break;
            default:
                console.log("check the program");
                return;
        }


        this.currentOperand=computation;
        this.operation=undefined;
        this.previousOperand='';
    }
    
    updateDisplay(){
        this.current.innerText=this.currentOperand;
        if(this.operation!=null){
            this.previous.innerText=this.previousOperand+ this.operation;
        }
        else{
            this.previous.innerText=this.previousOperand;
        }
        
    }

}

const numberButtons=document.querySelectorAll('[number]');
const clear=document.querySelector('[all-clear]')
const deletes=document.querySelector('[delete]');
const equals=document.querySelector('[equals]');
const operationButtons=document.querySelectorAll('[operand]');
const previous=document.querySelector('[data-previous-operand]');
const current=document.querySelector('[data-current-operand');

const calculator=new Calculator(previous, current);

numberButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click',()=>{
        calculator.chooseOperator(button.innerText)
        calculator.updateDisplay()
    });
});

equals.addEventListener('click', button =>{
    calculator.compute();
    calculator.updateDisplay();
});

clear.addEventListener('click', button =>{
    calculator.clear();
    calculator.updateDisplay();
});
deletes.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});
