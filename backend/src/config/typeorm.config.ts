import { ConfigService } from '@nestjs/config'
import type { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { join } from 'path'

export const typeOrmConfig = (configService: ConfigService): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: configService.get('DATABASE_HOST'),
    port: configService.get('DATABASE_PORT'),
    username: configService.get('DATABASE_USER'),
    password: configService.get('DATABASE_PASS'),
    database: configService.get('DATABASE_NAME'),
    //ssl:true,
    logging: true,

    //Ruta donde buscar los archivos de la entidades
    entities: [join(__dirname, '..', '**', '*.entity.{js,ts}')],
    synchronize: true //para sincronizar las tablas o entidades
})

