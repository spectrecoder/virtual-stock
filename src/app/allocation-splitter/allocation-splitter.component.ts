import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-allocation-splitter',
  templateUrl: './allocation-splitter.component.html',
  styleUrls: ['./allocation-splitter.component.css']
})
export class AllocationSplitterComponent {
  stocksForm! : FormGroup;
  stocks!:FormArray;

  constructor(private fb:FormBuilder){
    this.stocksForm = this.fb.group({
      NoOfStocks : [],
      TotalAmount: [],
      items:new FormArray([])
    });
  }

  ngOnInit(){

  }

  getControls(){
    return (this.stocksForm.get('items') as FormArray).controls;
  }

  createItem(AllocationAmount:number): FormGroup {  
    return this.fb.group({  
      name: '',  
      price: '',  
      allocationAmount: AllocationAmount,  
      sharesAllocated:'',
      costOfPurchase:''
    });  
  }

  BuildForm(){
    debugger
    let count = Number(this.stocksForm.value.NoOfStocks);

    let perStockCost = Number((Number(this.stocksForm.value.TotalAmount) / count).toFixed(3));
    for(let i = 0;i < count; i++){
      this.stocks = this.stocksForm.get('items') as FormArray;
      this.stocks.push(this.createItem(perStockCost));
    }
  }
}
