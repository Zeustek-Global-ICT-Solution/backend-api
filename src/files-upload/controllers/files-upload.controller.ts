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
  Get,
  Query,
  Header,
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
      const url = await this.filesUploadService.uploadFile(file);
      const response = await this.filesUploadService.getResponse({
        code: 201,
        value: {
          url,
        },
        message: 'File upload was successful',
      });
      return res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  @Get('/read-image')
  @HttpCode(HttpStatus.OK)
  @Header('Content-Type', 'image/jpeg')
  async readImage(
    @Query('fileName') fileName: string,
    @Req() req,
    @Res() res,
    @Next() next: NextFunction,
  ) {
    try {
      const file = await this.filesUploadService.getFile(fileName);
      return file.pipe(res);
    } catch (error) {
      next(error);
    }
  }
}
