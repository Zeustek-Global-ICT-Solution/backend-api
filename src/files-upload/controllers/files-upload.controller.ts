import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Next,
  Req,
  Res,
  HttpCode,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesUploadService } from '../services/files-upload.service';
import { NextFunction } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('files-upload')
export class FilesUploadController {
  constructor(private readonly filesUploadService: FilesUploadService) {}

  @Post('/upload')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      const value = await this.filesUploadService.uploadFile(file);
      const response = await this.filesUploadService.getResponse({
        code: 201,
        value,
        message: 'File upload was successful',
      });
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }
}
