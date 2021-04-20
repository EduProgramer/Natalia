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

  
  public ingredients = this.ingredientsService.getIngredients();
  constructor(
    private formBuilder: FormBuilder, 
    private sandwichServer: SandwichService,
    private ingredientsService: IngredientsService,
    ) { }

    async ngOnInit(): Promise<void>  {
    let ingredientsList = {}
    const ddd = await this.ingredients.then(value =>{
      console.log(value);
      (<Array<Object>> value).forEach(x =>{
        ingredientsList[x["name"]] = false
      })
    });
    console.log(ingredientsList);
    
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
