import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake.js";
import * as pdfFonts from 'pdfmake/build/vfs_fonts.js';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor() { }
}
