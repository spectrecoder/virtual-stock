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
  TotalInvestment:number = 0;

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

  Calculations(){
    let items  = this.stocksForm.controls["items"].value;

    let fg = this.stocksForm.get("items") as FormArray;

    if(items?.length > 0){
      this.TotalInvestment = 0;
      for(let index:number = 0 ; index < items.length; index++){
        let formData = items[index];
        if(formData?.allocationAmount && formData?.price){
          let sharesAllocated:any = Number(formData?.allocationAmount) / Number(formData?.price);
          sharesAllocated = sharesAllocated.toFixed(0);
          if(sharesAllocated){
            let costOfPurchase = Number(formData?.price) * Number(sharesAllocated);

            fg.at(index).get("sharesAllocated")?.setValue(sharesAllocated);
            fg.at(index).get("costOfPurchase")?.setValue(costOfPurchase);

            this.TotalInvestment += costOfPurchase;
          }
        }
      }
    }
  }
}
