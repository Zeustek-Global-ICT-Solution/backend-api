import { ResponsesService } from './../../responses/services/responses.service';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { OpenAIService } from '@app/shared/openai/services/openai.service';
import { AppException } from '@app/shared';
import { BaseService } from '@app/shared/base/base.service';
import { ConversationsRepository } from '../repositories/converstion.repository';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PromptsService } from 'src/prompts/services/prompts.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import * as fs from 'fs';

@Injectable()
export class ConversationsService extends BaseService {
  constructor(
    private readonly openAIService: OpenAIService,
    private readonly promptsService: PromptsService,
    private readonly responsesService: ResponsesService,
    private readonly repository: ConversationsRepository,
    private readonly eventEmitter: EventEmitter2,
    private readonly httpService: HttpService,
  ) {
    super();
  }

  public async create(payload: any) {
    console.log(payload);
    try {
      return await this.repository.create(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async findAll(payload: any = {}) {
    try {
      return await this.repository.findAllAndPopulate(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async findOne(id: string, payload: any = {}) {
    try {
      return await this.repository.findById(id);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async findConversationPrompts(id: string, payload: any = {}) {
    try {
      return await this.promptsService.findAll({ conversation: id });
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async update(id: string, payload: any) {
    try {
      return await this.repository.updateOne({ _id: id }, payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async remove(id: string) {
    try {
      return await this.repository.remove({ _id: id });
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async completions(payload: any) {
    try {
      // TODO: Refine the hausa language our custom model
      // payload.content = await this.customMModelService.refine(payload.content)

      // TODO: Call openai api
      const result = await this.openAIService.chatCompletion(payload);

      if (payload?.conversation === '' || !payload.conversation) {
        const newConversation = await this.repository.create({
          title: payload.content,
          user: payload.user,
          type: payload.type,
        });
        payload.conversation = newConversation.id;
        console.log(payload, newConversation.id);
      }

      // TODO: Create prompt
      const prompt = await this.promptsService.create({
        conversation: payload.conversation,
        content: payload.content,
        audio: payload?.audio,
        type: payload.type,
        user: payload.user,
      });

      // TODO: Create response of the result from openai
      await this.responsesService.create({
        conversation: payload.conversation,
        user: payload.user,
        content: result.choices[0].message.content,
        prompt: prompt.id,
        type: payload.type,
      });

      // TODO: Update the conversation title if default to 'New conversation'
      const conversation = await this.repository.findById(payload.conversation);

      if (conversation?.title === 'New Conversation') {
        conversation.title = payload.content;
        await conversation.save();
      }

      // TODO: Get and return the update prompt
      return await this.promptsService.findOneByIdAndPopulate(prompt.id);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  // Generate 4 images of different variation
  public async imageGenerator(payload: any) {
    try {
      const result = await this.openAIService.imageGenerator(payload);
      // const response$ = this.httpService.post(
      //   'https://gee4x5fyi4v5t7r1.us-east-1.aws.endpoints.huggingface.cloud',
      //   {
      //     inputs: payload.content,
      //     parameters: {
      //       width: 512,
      //       height: 512,
      //       num_inference_steps: 25,
      //       guidance_scale: 7.5,
      //       // num_images: 4, // na for here you go specify the number of images
      //       negative_prompt: 'Blurry, undefined features, low detail',
      //     },
      //   },
      //   {
      //     headers: {
      //       Accept: 'image/png',
      //       'Content-Type': 'application/json',
      //     },
      //   },
      // );

      // const res = await firstValueFrom(response$);

      // // const result = await res.data.arrayBuffer();
      // // console.log(result);
      // // const img = Buffer.from(result).toString('base64');
      // // console.log(typeof );
      // const { error } = res.data;

      if (!result?.data) {
        throw new AppException(404, 'Error generating image');
      }

      if (payload?.conversation === '') {
        const newConversation = await this.repository.create({
          title: payload.content,
          user: payload.user,
          type: payload.type,
        });
        payload.conversation = newConversation.id;
      }
      // // TODO: Create prompt
      const prompt = await this.promptsService.create({
        conversation: payload.conversation,
        content: payload.content,
        type: payload.type,
        user: payload.user,
      });

      // // TODO: Create response of the result from openai
      await this.responsesService.create({
        conversation: payload.conversation,
        user: payload.user,
        images: result.data.map((image) => image.url),
        prompt: prompt.id,
        type: payload.type,
      });

      // // TODO: Update the conversation title if default to 'New conversation'
      const conversation = await this.repository.findById(payload.conversation);
      // // TODO: Update the conversation title if default to 'New conversation'
      if (conversation.title === 'New Conversation') {
        conversation.title = payload.content;
        await conversation.save();
      }

      return await this.promptsService.findOneByIdAndPopulate(prompt.id);
      // return res.data;
    } catch (error) {
      throw new AppException(error.code, error.message);
    }
  }

  // Generate image variance
  public async imageGeneratorVariance(payload: any) {
    try {
      const result = await this.openAIService.imageGeneratorVariace(payload);
      // TODO: Create prompt
      const prompt = await this.promptsService.create({
        conversation: payload.conversation,
        content: payload.content,
        image: payload.image,
        type: payload.type,
        user: payload.user,
      });
      // TODO: Create response of the result from openai
      await this.responsesService.create({
        conversation: payload.conversation,
        user: payload.user,
        images: result,
        prompt: prompt.id,
        type: payload.type,
      });
      return await this.promptsService.findOneByIdAndPopulate(prompt.id);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async speechToText(payload: any) {
    try {
      return await this.openAIService.speechToText(payload);
    } catch (error) {
      throw new AppException(400, error.message);
    }
  }

  public async audioTranscript(file: Express.Multer.File) {
    try {
      // const data = fs.readFileSync(file.path, { encoding: 'utf-8' });

      const response$ = this.httpService.post(
        'https://api-inference.huggingface.co/models/DrishtiSharma/whisper-large-v2-hausa',
        file.buffer,
        {
          headers: {
            Authorization: 'Bearer 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',
            Accept: 'application/json',
            'Content-Type': 'audio/flac',
          },
        },
      );

      const res = await firstValueFrom(response$);
      console.log(res.data);
      const { text, error } = res.data;

      if (error) {
        throw new AppException(400, error);
      }

      return text;
      // return data;
    } catch (error) {
      console.log(error);

      throw new AppException(400, error.message);
    }
  }

  public async textAudio(content: string) {
    try {
      // const data = fs.readFileSync(file.path, { encoding: 'utf-8' });

      const response$ = this.httpService.post(
        'https://api-inference.huggingface.co/models/zeustek/jummai-hausa-tts',
        content,
        {
          headers: {
            Authorization: 'Bearer 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',
            'Content-Type': 'audio/flac',
          },
        },
      );

      const res = await firstValueFrom(response$);
      console.log(res.data);
      const { error } = res.data;

      if (error) {
        throw new AppException(400, error);
      }
      const byteNumbers = [];
      const byteCharacters = atob(res.data);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      return byteNumbers;
      // return data;
    } catch (error) {
      console.log(error);

      throw new AppException(400, error.message);
    }
  }
}
