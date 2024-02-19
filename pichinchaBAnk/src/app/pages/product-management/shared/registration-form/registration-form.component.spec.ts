import {
  ComponentFixture,
  TestBed,
  waitForAsync,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductApiService } from '../../services/product-api.service';
import { ToastrModule } from 'ngx-toastr';

import { RegistrationFormComponent } from './registration-form.component';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';

describe('RegistrationFormComponent', () => {
  let component: RegistrationFormComponent;
  let fixture: ComponentFixture<RegistrationFormComponent>;
  let productService: ProductApiService;
  let toastrService: ToastrService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        SharedModule
      ],
      declarations: [RegistrationFormComponent],
      providers: [
        ProductApiService,
        ToastrService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '123' }), // Mock ActivatedRoute to provide params
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'), // Spy on navigate method
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistrationFormComponent);
    component = fixture.componentInstance;
    productService = TestBed.inject(ProductApiService);
    toastrService = TestBed.inject(ToastrService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  /**
   * Verifica que el componente se haya creado correctamente.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifica que el formulario de registro se inicialice correctamente con los controles adecuados.
   */
  it('should initialize registrationForm with proper controls', () => {
    expect(component.registrationForm).toBeDefined();
    expect(component.registrationForm.get('id')).toBeDefined();
    expect(component.registrationForm.get('name')).toBeDefined();
    expect(component.registrationForm.get('description')).toBeDefined();
    expect(component.registrationForm.get('logo')).toBeDefined();
    expect(component.registrationForm.get('date_release')).toBeDefined();
    expect(component.registrationForm.get('date_revision')).toBeDefined();
  });

  /**
   * Verifica que el ID del producto se establezca correctamente cuando se proporciona el parámetro de ruta.
   */
  it('should set productId when route param is provided', () => {
    expect(component.productId).toEqual('123');
  });

  /**
   * Verifica que se llame a getProductDetails si se proporciona productId.
   */
  it('should call getProductDetails if productId is provided', () => {
    spyOn(component, 'getProductDetails');
    component.ngOnInit();
    expect(component.getProductDetails).toHaveBeenCalledWith('123');
  });

  /**
   * Verifica que se actualice el valor del formulario cuando se llame a getProductDetails.
   */
  it('should patch form value when getProductDetails is called', fakeAsync(() => {
    const product = {
      id: '123',
      name: 'Test Product',
      description: 'This is a test product',
      logo: 'test.png',
      date_release: new Date('2024-02-18'),
      date_revision: new Date('2025-02-18'),
    };
    spyOn(productService, 'getProducts').and.returnValue(of([product]));
    component.getProductDetails('123');
    tick();
    expect(component.registrationForm.value).toEqual(product);
  }));

  /**
   * Verifica que se muestre un error Toastr si no se encuentra el producto.
   */
  it('should show toastr error if product is not found', fakeAsync(() => {
    spyOn(productService, 'getProducts').and.returnValue(of([]));
    spyOn(toastrService, 'error');
    component.getProductDetails('123');
    tick();
    expect(toastrService.error).toHaveBeenCalledWith('Producto no encontrado');
  }));

  /**
   * Verifica que se maneje el error cuando falla getProductDetails.
   */
  it('should handle error when getProductDetails fails', fakeAsync(() => {
    spyOn(productService, 'getProducts').and.returnValue(throwError('Error'));
    spyOn(console, 'error');
    spyOn(toastrService, 'error');
    component.getProductDetails('123');
    tick();
    expect(console.error).toHaveBeenCalled();
    expect(toastrService.error).toHaveBeenCalledWith(
      'Ocurrió un error al obtener la lista de productos'
    );
  }));
});
