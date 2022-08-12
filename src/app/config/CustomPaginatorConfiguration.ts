import { MatPaginatorIntl } from '@angular/material/paginator';
// Class to change tooltips for paginator
// Used on the tables
// It needs a provider on app.module.ts
export function CustomPaginator() {

    const customPaginatorIntl = new MatPaginatorIntl(); 
    
    customPaginatorIntl.itemsPerPageLabel = 'Elementos por página:';
    customPaginatorIntl.nextPageLabel = 'Página siguiente';
    customPaginatorIntl.previousPageLabel = 'Página anterior';
    customPaginatorIntl.firstPageLabel = 'Primera página';
    customPaginatorIntl.lastPageLabel = 'Última página';

    return customPaginatorIntl;
}