import { BaseModel } from "./base-model";

export class NuovoAllegato extends BaseModel {
    base64Content: string;
    description: string;
    fileName: string;
}
