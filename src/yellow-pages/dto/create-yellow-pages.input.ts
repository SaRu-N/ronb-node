import { Field, InputType, Int } from '@nestjs/graphql';
import { PublishState as YellowPagesState } from '../../common/enum/publish_state.enum';

@InputType()
export class CreateYellowPagesCategoryInput {
  @Field({ description: 'Yellow Pages name' })
  name: string;

  @Field({ description: 'Yellow Pages Category description', nullable: true })
  description?: string;
}

@InputType()
export class CreateYellowPagesInput {
  @Field({ description: 'Yellow Pages name' })
  name: string;

  @Field({ description: 'Yellow Pages description', nullable: true })
  description?: string;

  @Field(() => Int, {
    description: 'Yellow Pages category',
    nullable: true,
  })
  category?: number;

  @Field(() => YellowPagesState, {
    description: 'Yellow Pages State',
    nullable: true,
  })
  state?: YellowPagesState;

  @Field(() => [CreateYellowPagesAddressInput], {
    description: 'Address for yellow page address',
  })
  address?: CreateYellowPagesAddressInput[];

  @Field(() => [CreateYellowPagesPhoneNumberInput], {
    description: 'Phone number for yellow pages',
  })
  phone_number?: CreateYellowPagesPhoneNumberInput[];
}

@InputType()
export class CreateYellowPagesAddressInput {
  @Field(() => Int, { description: 'District Type' })
  district: number;

  @Field(() => Int, { description: 'Province Type' })
  province: number;

  @Field(() => Int, { description: 'Yellow pages id', nullable: true })
  yellowpages?: number;
}

@InputType()
export class CreateProvinceInput {
  @Field()
  name: string;
}

@InputType()
export class CreateDistrictInput {
  @Field({ description: 'District name' })
  name: string;

  @Field(() => Int, { description: 'Districts Province' })
  province: number;
}

@InputType()
export class CreateYellowPagesPhoneNumberInput {
  @Field(() => Int, { description: 'Phone number' })
  phone_number: number;

  @Field({ description: '' })
  is_emergency: boolean;

  @Field(() => Int, { description: 'Yellow pages id', nullable: true })
  yellowpages?: number;
}
