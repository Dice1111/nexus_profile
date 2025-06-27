export interface IUploadthingService {
    uploadImage(files: File): Promise<string>
    deleteImage(url: string): Promise<void>

}