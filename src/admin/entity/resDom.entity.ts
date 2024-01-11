import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'res_dom' })
export class ResDom {
  @Prop()
  sns: string;

  @Prop()
  action_type: string;

  @Prop()
  element_id: string;

  @Prop()
  element_name: string;

  @Prop()
  element_value: string;

  @Prop()
  element_inner_text: string;

  @Prop()
  created_at: Date;

  @Prop()
  latest_updated_at: Date;

  @Prop()
  deleted_at: Date;
}

export const ResDomSchema = SchemaFactory.createForClass(ResDom);
