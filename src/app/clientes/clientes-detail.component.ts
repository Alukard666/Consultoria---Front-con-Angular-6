// Angular
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert';
// Locals
import { ClienteService } from '../services/cliente.service';
import { ClienteModel } from '../models/cliente.model';
import { MyValidator, verificarNif } from '../myValidators/myValidators';
import { PROVINCIAS } from '../constantes/provincias';

@Component({
  selector: 'app-clientes-detail',
  templateUrl: './clientes-detail.component.html',
  styleUrls: ['./clientes-detail.component.scss']
})
export class ClientesDetailComponent implements OnInit {
    clienteId: string;
    clientes: ClienteModel[];
    public form: FormGroup;
    query = '';
    private nifOption = 'nifCif';
    private nifOption_repres = 'nifCifRepres';

    constructor(private clienteService: ClienteService, private router: Router,
        private formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) {
            this.clienteId = this.activatedRoute.snapshot.params['id'];
            this.form = this.formBuilder.group({
                nifOption: 'nifCif',
                nif: ['', Validators.compose([
                    verificarNif(''), Validators.required,
                    Validators.minLength(9), Validators.maxLength(10)
                ])],
                nombre: '',
                apellidos: '',
                nifOptionRepres: 'nifCifRepres',
                dni_repres: ['', Validators.compose([
                    verificarNif(''),
                    Validators.minLength(9), Validators.maxLength(10)
                ])],
                nombre_repres: '',
                tlf1: ['', Validators.compose([
                    Validators.minLength(9), Validators.maxLength(9)
                ])],
                tlf2: ['', Validators.compose([
                    Validators.minLength(9), Validators.maxLength(9)
                ])],
                email: ['', Validators.email],
                direccion: '',
                poblacion: '',
                cp: ['', Validators.compose([
                    Validators.minLength(5), Validators.maxLength(5)
                ])],
                provincia: '',
                iban: ['', Validators.compose([
                    MyValidator.verificarIBAN,
                    Validators.minLength(24), Validators.maxLength(24)
                ])],
                id: null,
            });
        }

    ngOnInit() {
        if (this.clienteId === 'new') {
            this.clienteService.getClientes()
                .subscribe(clientes => this.clientes = clientes );
        } else if (/^([0-9])*$/.test(this.clienteId)) {
            this.clienteService.getClienteDetail(this.clienteId)
                .subscribe(cliente => this.completeForm(cliente));
        }
        this.nifOption = this.form.value.nifOption;
    }

    // Actualiza los valores de Nif o Pasaporte, y vuelve a pasar las validaciones, para aceptar pasaportes.
    actualizarValores() {
        this.nifOption = this.form.value.nifOption;
        this.nifOption_repres = this.form.value.nifOption_repres;
        this.completeForm(this.form.value);
    }

    // Método para validar que los datos del formulario son correctos antes de guardar el cliente.
    // En principio me falta comprobar que el cliente no exista en la BD.
    comprobarForm() {
        this.saveCliente();
    }

    // Método para guardar un nuevo contrato o una modificación de un contrato.
    saveCliente() {
        this.clienteService.saveCliente(this.form.value)
            .subscribe( () => {
                swal('El cliente ha sido guardado con éxito.', {icon: 'success'});
                this.router.navigate(['']);
            });
    }

    // Método para borrar un contrato de la base de datos.
    deleteClienteDetail(id) {
        swal({
            title: '¿Estás seguro?',
            text: 'Una vez borrado el cliente, no se podrá volver a recuperar.',
            icon: 'warning',
            buttons: [true, 'Borrar'],
            dangerMode: true
        }).then ( willDelete => {
            if (willDelete) {
                this.clienteService.deleteCliente(id)
                .subscribe( result => {
                    swal('El cliente ha sido eliminado.', {icon: 'success'});
                    this.router.navigate(['']);
                });
            }
        });
    }

    // Método para cargar los datos de un contrato existente en BD.
    completeForm(cliente) {
        this.form = this.formBuilder.group({
            nifOption: this.nifOption,
            nif: [cliente.nif, Validators.compose([
                verificarNif(this.nifOption), Validators.required,
                Validators.minLength(9), Validators.maxLength(10)
            ])],
            nombre: cliente.nombre,
            apellidos: cliente.apellidos,
            nifOptionRepres: 'nifCifRepres',
            dni_repres: [cliente.dni_repres, Validators.compose([
                verificarNif(this.nifOption_repres),
                Validators.minLength(9), Validators.maxLength(10)
            ])],
            nombre_repres: cliente.nombre_repres,
            tlf1: [cliente.tlf1, Validators.compose([
                Validators.minLength(9), Validators.maxLength(9)
            ])],
            tlf2: [cliente.tlf2, Validators.compose([
                Validators.minLength(9), Validators.maxLength(9)
            ])],
            email: [cliente.email, Validators.email],
            direccion: cliente.direccion,
            poblacion: cliente.poblacion,
            cp: [cliente.cp, Validators.compose([
                Validators.minLength(5), Validators.maxLength(5)
            ])],
            provincia: cliente.provincia,
            iban: [cliente.iban , Validators.compose([
                MyValidator.verificarIBAN,
                Validators.minLength(24), Validators.maxLength(24)
            ])],
            id: cliente.id,
        });
    }

    // Completa automaticamente la Provincia con los datos del Código Postal.
    buscarProvincia() {
        if (this.form.value.cp.length === 2) {
            const provincias = PROVINCIAS;
            const cp = this.form.value.cp;
            const inicCP = cp.substring(0, 2);
            this.form.controls['provincia'].setValue(provincias[inicCP]);
        }
    }
}
