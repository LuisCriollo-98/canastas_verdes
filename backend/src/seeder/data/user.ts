import { UserRole } from "../../users/entities/user.entity";

export const users = [
    {
        name: 'admin',
        email: 'admin@correo.com',
        phone: '310000000',
        address: 'Cra 24 #12 - 25',
        role: UserRole.ADMIN,
    }
]