import { AbstractControl, ValidatorFn } from '@angular/forms';

// Esta función mira si lo que vamos a validar es un Pasaporte, un DNI, un NIE o un CIE
// y llama a la función correspondiente para que la valide.
export function verificarNif(tipo: string): ValidatorFn {
    return (c: AbstractControl) => {
        if (c.value.length === 0 || tipo === 'passport') {return null; }
        let verificado: boolean;
        const str = c.value.toString().toUpperCase();
        const nifPattern = /^[XYZ0-9][0-9]{7}[TRWAGMYFPDXBNJZSQVHLCKET]$/;
        const cifPattern = /^[A-W0-9][0-9]{7}[0-9ABCDEFGHIJ]$/;
        if (nifPattern.test(str) && c.value.length === 9) {
            verificado = verificarDniNie(str);
        } else if (cifPattern.test(str) && c.value.length === 9) {
            verificado = verificarCif(str);
        }
        if (verificado) { return null; }
        return {validNif: true};
    };
}

// Esta función valida si es un DNI o un NIE válidos
function verificarDniNie(str: string) {
    const validChars = 'TRWAGMYFPDXBNJZSQVHLCKET';
    const nifVal: string = str
        .replace(/^[X]/, '0')
        .replace(/^[Y]/, '1')
        .replace(/^[Z]/, '2');
    const letter = str.substr(-1);
    const charIndex = parseInt(nifVal.substr(0, 8), 10) % 23;
    if (validChars.charAt(charIndex) === letter) {
        return true;
    }
    return false;
}

// Esta función valida si es un CIF válido (NIF fiscal).
function verificarCif(str: string) {
    const validChars = 'ABCDEFGHIJ';
    const numberCif = str.substr(0, 8);
    const controlCif = str.substr(-1);
    let parA = 0;
    let nonB = 0;
    for (let i = 1; i < numberCif.length; i++) {
        let n = parseInt(numberCif[i], 10);
        if (i % 2 === 0) {
            parA += n;
        } else {
            n *= 2;
            nonB += n < 10 ? n : n - 9;
        }
    }
    const digit = (10 - parseInt((parA + nonB).toString().substr(-1), 10) );
    if (validChars[digit] === controlCif || digit === parseInt(controlCif, 10)) {
        return true;
    }
    return false;
}


export class MyValidator {
    static verificarIBAN(c: AbstractControl) {
        if (c.value.length === 0) {return null; }
        const IBAN = c.value.toUpperCase();
        const ibanPatter = /^[A-Z]{2}[0-9]{22}$/;
        if (ibanPatter.test(IBAN) && c.value.length === 24) {
            const letra1 = IBAN.substring(0, 1);
            const letra2 = IBAN.substring(1, 2);
            const ls_letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const num1 = ls_letras.search(letra1) + 10;
            const num2 = ls_letras.search(letra2) + 10;
            let isbanaux =  String(num1) + String(num2) + IBAN.substring(2);
            isbanaux = isbanaux.substring(6) + isbanaux.substring(0, 6);
            const parts = Math.ceil(isbanaux.length / 7);
            let remainer = '';
            for (let i = 1; i <= parts; i++) {
                remainer = String(parseFloat(remainer + isbanaux.substr((i - 1) * 7, 7)) % 97 );
            }
            const resto = parseInt(remainer, 10);
            if (resto === 1) {
                return null;
            }
        }
        return {validIban: true};
    }


    static verificarCups(c: AbstractControl) {
        if (c.value.length === 0) {return null; }
        const str = c.value.toString().toUpperCase();
        const cupsPattern = /^[ES]{2}[0-9]{16}[A-Z]{2}$/;
        if (cupsPattern.test(str) && c.value.length === 20) {
            const validChars = 'TRWAGMYFPDXBNJZSQVHLCKE';
            const numberCups = str.substring(2, 18);
            const letra1 = str.substring(18, 19);
            const letra2 = str.substring(19, 20);
            const restoAux = parseFloat(numberCups) % 529;
            const resto = restoAux % 23;
            const cociente = restoAux / 23;
            console.log(letra1);
            console.log(letra2);
            if (validChars.charAt(cociente) === letra1 && validChars.charAt(resto) === letra2) {
                return null;
            }
        }
        return {validCups: true};
    }
}
