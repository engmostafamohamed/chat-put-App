export interface controllerInterface{
    searchInPDF(searchTerm: string): Promise<string>
    searchInWordFile(searchTerm: string): Promise<string>
}