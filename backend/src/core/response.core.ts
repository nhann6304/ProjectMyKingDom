import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { availableMemory } from "process";
import { IBaseResponse } from "src/interfaces/core/IBaseResponse.interface";


export abstract class RESPONSE<T = any> {
    message: string;
    metadata: T | undefined;
    abstract statusCode: number;
    abstract reasonStatusCode: string;

    constructor({ message, metadata }: IBaseResponse<T>) {
        this.message = message;
        this.metadata = metadata;
    }
}


export class OK<T = any> extends RESPONSE {
    statusCode: number = StatusCodes.OK;
    reasonStatusCode: string = ReasonPhrases.OK;
    constructor({ message, metadata }: IBaseResponse<T>) {
        super({ message, metadata })
    }
}

export class CREATE<T = any> extends RESPONSE {
    statusCode: number = StatusCodes.CREATED;
    reasonStatusCode: string = ReasonPhrases.CREATED;
    constructor({ message, metadata }: IBaseResponse<T>) {
        super({
            message,
            metadata,
        });
    }
}
