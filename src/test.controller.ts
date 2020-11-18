import { Controller, Get, Request } from '@nestjs/common';

@Controller('test')
export class TestController {
    @Get()
    async (@Request() req) {
        console.log(req.session)
        req.session.user = { a: 123}
    }
}
