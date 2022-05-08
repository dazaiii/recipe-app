import { TestBed } from '@angular/core/testing';

import { RecipeService } from './recipe.service';

import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HttpClient } from '@angular/common/http';

describe('RecipeServiceService', () => {
  let service: RecipeService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(RecipeService);
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all recipes', () => {
    spyOn(service, 'getRecipes').and.callThrough();
    service.getRecipes();
    expect(service.getRecipes).toHaveBeenCalled();
  });
});
