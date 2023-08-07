export interface serviceInterface{
    getService(content:string,searchTerm:string): Promise<string>
}