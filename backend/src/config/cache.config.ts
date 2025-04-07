import { registerAs } from '@nestjs/config';
import { register } from 'module';
import { CONST_CONF_VAL } from 'src/constants/value.contants';

export default registerAs(CONST_CONF_VAL.CACHE_CONF, () => {
    return {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
    };
});
