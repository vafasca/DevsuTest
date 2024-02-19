import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ProductApiService } from './product-api.service';
import { Product } from '../interfaces/product.interface';
import { SharedModule } from 'src/app/shared/shared-module/shared.module';


describe('ProductApiService', () => {
  let service: ProductApiService;
  let httpTestingController: HttpTestingController;
  let toastrService: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule, ToastrModule.forRoot(), SharedModule],
      providers: [ProductApiService, ToastrService]
    });

    service = TestBed.inject(ProductApiService);
    httpTestingController = TestBed.inject(HttpTestingController);
    toastrService = TestBed.inject(ToastrService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch products', () => {
    // Test for getProducts method
  });

  it('should add a new product', () => {
    const newProduct: Product = {
      id: 'new-product-id',
      name: 'New Product',
      description: 'New product description',
      logo: 'https://example.com/new-product-logo.png',
      date_release: new Date(),
      date_revision: new Date()
    };

    service.postProduct(newProduct).subscribe(product => {
      expect(product).toEqual(newProduct);
    });

    const req = httpTestingController.expectOne(service['apiURL']);
    expect(req.request.method).toEqual('POST');
    req.flush(newProduct);
  });

  it('should update an existing product', () => {
    const updatedProduct: Product = {
      id: 'existing-product-id',
      name: 'Updated Product',
      description: 'Updated product description',
      logo: 'https://example.com/updated-product-logo.png',
      date_release: new Date(),
      date_revision: new Date()
    };

    service.updateProduct(updatedProduct).subscribe(product => {
      expect(product).toEqual(updatedProduct);
    });

    const req = httpTestingController.expectOne(service['apiURL']);
    expect(req.request.method).toEqual('PUT');
    req.flush(updatedProduct);
  });

  it('should delete an existing product', () => {
    const productIdToDelete = 'existing-product-id';
  
    service.deleteProduct(productIdToDelete).subscribe(response => {
      expect(response.message).toEqual('Product eliminado correctamente');
    });
  
    const req = httpTestingController.expectOne(`${service['apiURL']}?id=${productIdToDelete}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({ message: 'Product eliminado correctamente' });
});



  it('should verify an existing product', () => {
    const productIdToVerify = 'existing-product-id';
    const verifiedProduct: Product = {
      id: productIdToVerify,
      name: 'Verified Product',
      description: 'Verified product description',
      logo: 'https://example.com/verified-product-logo.png',
      date_release: new Date(),
      date_revision: new Date()
    };

    service.verify(productIdToVerify).subscribe(product => {
      expect(product).toEqual(verifiedProduct);
    });

    const req = httpTestingController.expectOne(`${service['apiURL']}/verification?id=${productIdToVerify}`);
    expect(req.request.method).toEqual('GET');
    req.flush(verifiedProduct);
  });
});
