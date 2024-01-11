import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ collection: 'res_http' })
export class ResHttp {
  @Prop()
  sns: string;

  @Prop()
  url: string;

  @Prop()
  body: string;

  @Prop()
  created_at: Date;

  @Prop()
  latest_updated_at: Date;

  @Prop()
  deleted_at: Date;
}

export const ResHttpSchema = SchemaFactory.createForClass(ResHttp);
