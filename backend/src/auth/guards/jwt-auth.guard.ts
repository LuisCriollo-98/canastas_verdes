import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

@Injectable()
//
export class JwtAuthGuard extends AuthGuard('jwt') {
    //Inyecta el reflector para obtener las rutas publicas
    constructor(
        private readonly reflector: Reflector,
    ) {
        super();
    }
    //Sobreescribe el metodo canActivate para permitir el acceso a rutas publicas
    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (isPublic) {
            return true;
        }
        return super.canActivate(context);
    }
}
