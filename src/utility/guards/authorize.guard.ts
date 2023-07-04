import { CanActivate, ExecutionContext,UnauthorizedException, mixin } from "@nestjs/common";

export const AuthorizeGuard=(allowedRoles:string[])=>{
    class RoleGuardMixin implements CanActivate{
        canActivate(context:ExecutionContext){
            const request=context.switchToHttp().getRequest();
            const result:boolean=request?.currentUser?.roles.map((role:string)=>allowedRoles.includes(role)).find((val:boolean)=>val===true);
            if(result) return true;
            throw new UnauthorizedException('Sorry, you are not authorised.');
        }
    }

    const guard =mixin(RoleGuardMixin);
    return guard;
}