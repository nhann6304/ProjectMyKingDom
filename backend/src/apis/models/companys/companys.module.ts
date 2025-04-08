import { Module } from '@nestjs/common';
import { CompanyController } from './companys.controller';
import { CompanyService } from './companys.service';
import { CompanyEntity } from './company.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ImagesModule } from 'src/apis/common/images/images.module';
import { AuthGuard } from 'src/guards/auth.guard';
import { RoleGuard } from 'src/guards/role.guard';
import { ImageEntity } from 'src/apis/common/images/image.entity';
import { TokenModule } from 'src/apis/common/token/token.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CompanyEntity, ImageEntity]), // ✅ đăng ký entity ở đây
    ImagesModule,
    TokenModule
  ],
  controllers: [CompanyController],
  providers: [CompanyService, AuthGuard, RoleGuard],
  exports: [CompanyService]
})
export class CompanyModule { }
