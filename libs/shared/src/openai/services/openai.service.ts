/* eslint-disable @typescript-eslint/no-unused-vars */
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OPENAI_TOKEN } from '@app/shared/constant';
import OpenAI from 'openai';
import fs from 'fs';

@Injectable()
export class OpenAIService {
  constructor(
    @Inject(OPENAI_TOKEN) private readonly openClient: OpenAI,
    protected config: ConfigService,
  ) {}

  /* Chat Completion
   *
   */
  public async chatCompletion(payload: any) {
    try {
      const completion = await this.openClient.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: 'You are Jummai a Hausa helpfull assistant.',
          },
          { role: 'user', content: payload.content },
        ],
        model: 'gpt-3.5-turbo',
      });
      return completion;
    } catch (error) {
      console.error(error.message);
    }
  }

  /* Image Generator
   *
   */
  public async imageGenerator(payload: any) {
    try {
      const image = await this.openClient.images.generate({
        model: 'dall-e-3',
        prompt: payload.prompt,
      });
      return image;
    } catch (error) {
      console.error(error.message);
    }
  }

  /* Create personal assistant
   *
   */
  public async textAndImageGeneration(payload: any) {
    try {
      const response = await this.openClient.chat.completions.create({
        model: 'gpt-4-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              { type: 'text', text: 'What’s in this image?' },
              {
                type: 'image_url',

                image_url: {
                  url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg',
                },
              },
            ],
          },
        ],
      });
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  /* Create personal assistant
   *
   */
  public async createAssistant(payload: any) {
    try {
      const assistant = await this.openClient.beta.assistants.create({
        instructions: payload.instructions,
        name: payload.name,
        tools: [{ type: 'retrieval' }],
        model: 'gpt-4',
      });

      return assistant;
    } catch (error) {
      console.error(error.message);
    }
  }

  /* the speech to text
   *
   */
  public async speechToText(payload: any) {
    try {
      const response = await this.openClient.audio.transcriptions.create({
        file: fs.createReadStream(payload.audio),
        model: 'whisper-1',
      });

      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  /* Upload Assistants file
   *
   */
  public async uploadFile(payload: any) {
    try {
      const response = await this.openClient.files.create({
        file: fs.createReadStream(payload.file),
        purpose: 'assistants',
      });

      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  /* Attach Assistants file
   *
   */
  public async attachAssistantFile(payload: any) {
    try {
      const response = await this.openClient.beta.assistants.files.create(
        payload.assistantId,
        {
          file_id: payload.fileId,
        },
      );
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  /* Create thread
   *
   */
  public async createThread() {
    try {
      const response = await this.openClient.beta.threads.create();
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  /* create thread and run
   *
   */
  public async createThreadAndRun(payload) {
    try {
      const response = await this.openClient.beta.threads.createAndRun({
        assistant_id: payload.assistantId,
        thread: {
          messages: [{ role: 'user', content: payload.content }],
        },
      });
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  /* Create thread message
   *
   */
  public async createThreadMessage(payload: any) {
    try {
      const response = await this.openClient.beta.threads.messages.create(
        payload.threadId,
        {
          role: 'user',
          content: payload.content,
        },
      );
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  /* Create run
   *
   */
  public async createRun(payload: any) {
    try {
      const response = await this.openClient.beta.threads.runs.create(
        payload.threadId,
        { assistant_id: payload.assistantId },
      );
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  /* Retrieve run
   *
   */
  public async retrieveRun(payload: any) {
    try {
      const response = await this.openClient.beta.threads.runs.retrieve(
        payload.threadId,
        payload.runId,
      );
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }

  /* Cancel run
   *
   */
  public async cancelRun(payload: any) {
    try {
      const response = await this.openClient.beta.threads.runs.cancel(
        payload.threadId,
        payload.runId,
      );
      return response;
    } catch (error) {
      console.error(error.message);
    }
  }
}
