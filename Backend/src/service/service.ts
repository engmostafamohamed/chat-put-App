import { serviceInterface } from "./serviceInterface";
class ApiService implements serviceInterface {
    async getService(content:string,searchTerm:string): Promise<string> {
        const searchTermIndex = content.indexOf(searchTerm);
        if (searchTermIndex !== -1) {
            const dotIndex = content.indexOf('.', searchTermIndex);
           
            if (dotIndex !== -1) {
                const context = content.substring(searchTermIndex, dotIndex);
                
                return context;
            }
        }
        return "null"
    }
}
export default ApiService