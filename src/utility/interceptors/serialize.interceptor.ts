import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { Observable, map } from "rxjs";
import {plainToClass} from 'class-transformer';

export function Serialize(dto:any){
    return UseInterceptors(new SeriallizeInterceptor(dto));
}

export class SeriallizeInterceptor implements NestInterceptor{
    constructor(private dto:any){}

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(
            map((data:any)=>{
                return plainToClass(this.dto,data,{excludeExtraneousValues:true});
            })
        )
    }
}