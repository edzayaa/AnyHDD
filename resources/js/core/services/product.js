import ApiClient from './client';
import { endpoints } from './variables.js';

class ProductService extends ApiClient {
    constructor() {
        super();
        this.reviews = '';
        this.currentPage = 1;
        this.hasMore = true;
        this.selectedRating = 0;
        this.productId = document.getElementById('productId').value;
    }



}