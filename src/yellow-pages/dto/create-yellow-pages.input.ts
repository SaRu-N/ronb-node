import { Field, InputType, Int } from '@nestjs/graphql';
import {
  YellowPagesAddress,
  District,
  Province,
  YellowPagesPhoneNumber,
  YellowPages,
  YellowPagesCatgory,
} from '../entities/yellow-pages.entity';
import { State as YellowPagesState } from '../../common/enum/state.enum'

@InputType()
export class CreateYellowPagesCategoryInput {
  @Field({ description: 'Yellow Pages name' })
  name: string;

  @Field({ description: 'Yellow Pages Category description', nullable: true })
  description?:string;
}

@InputType()
export class CreateYellowPagesInput {
  @Field({ description: 'Yellow Pages name' })
  name: string;

  @Field({ description: 'Yellow Pages description', nullable: true })
  description?:string;

  @Field(() => Int, {
    description: 'Yellow Pages category',
    nullable: true,
  })
  category?: number;

  @Field(()=> YellowPagesState, { description: 'Yellow Pages State', nullable: true })
  state?: YellowPagesState
}

@InputType()
export class CreateYellowPagesAddressInput {
  @Field(() => Int, { description: 'District Type' })
  district: number;

  @Field(() => Int, { description: 'Province Type' })
  province: number;

  @Field(() => Int, { description: 'Yellow pages id' })
  yellowpages?: number;
}

@InputType()
export class CreateYellowPagesPhoneNumberInput {
  @Field({ description: 'Phone number' })
  phone_number: number;

  @Field({ description: '' })
  is_emergency: boolean;

  @Field(() => Int, { description: 'Yellow pages id' })
  yellowpages?: number;
}
