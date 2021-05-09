import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngredientsService } from '../ingredients.service';
import { Ingredient, Sauce } from '../sandiwch'
import { SandwichService } from '../sandwich.service';
@Component({
  selector: 'wsb-sandwich-form',
  templateUrl: './sandwich-form.component.html',
  styleUrls: ['./sandwich-form.component.css']
})
export class SandwichFormComponent implements OnInit {
  public sandwichForm: FormGroup;
  public showErrors: boolean = false;
  public sauses = [
    { label: 'Bbq sauce', value: Sauce.Bbq },
    { label: 'Mayo sauce', value: Sauce.Mayo },
    { label: 'Mustard sauce', value: Sauce.Mustard },
    { label: 'None sauce', value: Sauce.None },
  ];
  
  ingredients;
  

  constructor(
    private formBuilder: FormBuilder, 
    private sandwichServer: SandwichService,
    private ingredientsService: IngredientsService,
    ) { }

    async ngOnInit(): Promise<void>  {
    
    let ingredientsList = [];
    await this.ingredientsService.getIngredients().then(value =>{
      this.ingredients = value;
    });

    this.ingredients.forEach(x =>{
      ingredientsList[x["name"]] = false
    })

    this.sandwichForm = this.formBuilder.group({
      name: ['', [Validators.minLength(5), Validators.maxLength(20)]],
      ingredients: this.formBuilder.group(ingredientsList),
      sauce: Sauce.Bbq,
      vege: false,
      price: [0, Validators.max(20)]
    })
  }
  public mapIngredients(ingredients: object) {
    return Object.entries(ingredients)
      .filter(ingredient => ingredient[1])
      .map(ingredient => ingredient[0])
  }

  updatePrice(ingridient): void{
    let addToPrice: Boolean = this.sandwichForm.controls['ingredients'].get(ingridient).value;

    // TODO: trzeba zmienić strukture jsona na bardziej wydajną 
    let ingridientObject = this.ingredients.filter(x => x.name == ingridient)[0];
    
    // TODO: Price nie może być zmiennoprzecinkowy (nie może być float)
    let currentPrice = this.sandwichForm.controls['price'].value;

    if(addToPrice){
      this.sandwichForm.controls['price'].setValue(currentPrice + ingridientObject.price);
      
    }else{
      this.sandwichForm.controls['price'].setValue(currentPrice - ingridientObject.price);
    }
  }

  public save(): void {
    this.showErrors = true;
    if(this.sandwichForm.valid){
    const formValue = this.sandwichForm.getRawValue();
    const checkedIngredients = this.mapIngredients(formValue.ingredients);
    const sandwich = {
      ...formValue,
      ingredients: checkedIngredients
    };
    // console.log(checkedIngredients);
    this.sandwichServer.postSandwich(sandwich)
      .then(()=> console.log('Kanapka została zapisana'))
      .catch(()=>console.error("Wystapił błąd"));
    }

    
  }
}
