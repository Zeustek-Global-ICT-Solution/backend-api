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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesUploadService } from '../services/files-upload.service';
import { NextFunction } from 'express';

@Controller('files-upload')
export class FilesUploadController {
  constructor(private readonly filesUploadService: FilesUploadService) {}

  @Post('/upload')
  @HttpCode(HttpStatus.CREATED)
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      console.log(file);
      const upload = await this.filesUploadService.uploadFile(file);
      return res.status(201).json(upload);
    } catch (error) {
      next(error);
    }
  }
}
