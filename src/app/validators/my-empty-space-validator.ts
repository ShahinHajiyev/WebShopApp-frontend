import { FormControl, ValidationErrors } from "@angular/forms";

export class MyEmptySpaceValidator {

    static compensateWhiteSpace(control: FormControl) : ValidationErrors{


        //check if the parameter coonsists of only whitespace 
        if((control.value != null) && (control.value.trim().length === 0)) {

            //if does not pass, return the error object
            // 'compensateWhiteSpace' is a key to be used as a reference in html template
            return {'compensateWhiteSpace' : true};
        }
        else {
            //if passes, return null
            return null;

        }
    }
}
