
import ApiService from "../service/service";
import { controllerInterface } from "./controllerInterface";

import * as fs from 'fs';
import * as pdfjs from 'pdfjs-dist';
import mammoth from 'mammoth';

class ApiController implements controllerInterface {
    async searchInPDF(searchTerm: string): Promise<string> {
        const getService = new ApiService()
        const filePath = 'C:/Users/TOSHIBA/Desktop/ChatGPT Task/Backend/pdf/task.pdf';
        const data = new Uint8Array(fs.readFileSync(filePath));
        const pdf = await pdfjs.getDocument(data).promise;
        const numPages = pdf.numPages;

        for (let i = 1; i <= numPages; i++) {
            const page = await pdf.getPage(i);
            const content = await page.getTextContent();
            const pageText = content.items.map((item: any) => item.str).join(' ');
            if (pageText.includes(searchTerm)) {
                const data = getService.getService(pageText, searchTerm)
                return data;
            }
        }
        return "Sorry I don't have any answer";
    }
    async searchInWordFile(searchTerm: string): Promise<string> {
        const getService = new ApiService()

        const filePath = 'C:/Users/TOSHIBA/Desktop/ChatGPT Task/Backend/word/task.docx';
        const fileData = fs.readFileSync(filePath);
        const result = await mammoth.extractRawText({ buffer: fileData });
        const content = result.value;
        const searchData = await getService.getService(content, searchTerm)
        if (searchData != "null") {
            return searchData
        }
        else {
            const searchData = await this.searchInPDF(searchTerm);
            if (searchData.length) {
              return searchData;
            }
        }
        return "Sorry I don't have any answer";
    }

}
export default ApiController