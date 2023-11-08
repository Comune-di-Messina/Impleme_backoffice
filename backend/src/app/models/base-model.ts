export class BaseModel {

    fromJson(json): any {
        for (var propName in json)
            this[propName] = json[propName];
        return this;
    }

    static fromJsonArray(jsonArray): any[] {
        var dataOut = [];
        for (var k in jsonArray) {
            var json = jsonArray[k];
            var newModel = Object.create(this.prototype);

            dataOut.push(newModel.fromJson(json));
        }

        return dataOut;
    }

    constructor() {
    }
}
