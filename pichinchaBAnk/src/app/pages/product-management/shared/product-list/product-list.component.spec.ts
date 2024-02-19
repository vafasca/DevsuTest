import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductListComponent } from './product-list.component';
import { ProductApiService } from '../../services/product-api.service';
import { of } from 'rxjs';
import { Product } from '../../interfaces/product.interface';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';
import { HttpClientModule } from '@angular/common/http';

/**
 * Pruebas unitarias para el componente ProductListComponent.
 */
describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let productApiService: ProductApiService;

  /**
   * Configuración antes de cada prueba.
   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [ProductApiService],
      imports: [SharedModule, HttpClientModule]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    productApiService = TestBed.inject(ProductApiService); // Inyecta el servicio
    fixture.detectChanges();
  });

  /**
   * Prueba: El componente debe crearse correctamente.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Prueba: El componente debe inicializar la lista de productos correctamente.
   */
  it('should initialize products', () => {
    const productsMock: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: 'url_del_logo',
        date_release: new Date(),
        date_revision: new Date(),
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description 2',
        logo: 'url_del_logo',
        date_release: new Date(),
        date_revision: new Date(),
      },
    ];

    spyOn(productApiService, 'getProducts').and.returnValue(of(productsMock));

    component.ngOnInit();

    expect(component.products).toEqual(productsMock);
  });

  /**
   * Prueba: El componente debe actualizar los productos mostrados correctamente cuando cambia el valor seleccionado.
   */
  it('should update displayed products when value changes', () => {
    const productsMock: Product[] = [
      {
        id: '1',
        name: 'Product 1',
        description: 'Description 1',
        logo: 'url_del_logo',
        date_release: new Date(),
        date_revision: new Date(),
      },
      {
        id: '2',
        name: 'Product 2',
        description: 'Description 2',
        logo: 'url_del_logo',
        date_release: new Date(),
        date_revision: new Date(),
      },
    ];

    spyOn(productApiService, 'getProducts').and.returnValue(of(productsMock));

    component.selectedValue = 2; // Cambia el valor seleccionado
    component.currentIndex = 1; // Supongamos que el índice actual es 1
    component.ngOnInit();

    expect(component.displayedProducts.length).toEqual(2); // Se espera que los productos mostrados se actualicen según el valor seleccionado
  });

  /**
   * Prueba: El componente debe navegar a la página de registro de productos cuando se llama a editProduct.
   */
  it('should navigate to product registration page when editProduct is called', () => {
    const productMock = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'url_del_logo',
      date_release: new Date(),
      date_revision: new Date(),
    };
    const navigateSpy = spyOn((<any>component).router, 'navigate');

    component.editProduct(productMock);

    expect(navigateSpy).toHaveBeenCalledWith([
      'products',
      'registration',
      productMock.id,
    ]);
  });

  /**
   * Prueba: El componente debe abrir y cerrar el modal correctamente.
   */
  it('should open and close modal', () => {
    const productMock = {
      id: '1',
      name: 'Product 1',
      description: 'Description 1',
      logo: 'url_del_logo',
      date_release: new Date(),
      date_revision: new Date(),
    };

    component.openModal(productMock);
    expect(component.isModalOpen).toBeTrue();

    component.closeModal();
    expect(component.isModalOpen).toBeFalse();
  });

});
