import { Field, InputType, Int, PartialType } from '@nestjs/graphql';
import {
  YellowPagesAddress,
  District,
  Province,
  YellowPagesPhoneNumber,
  YellowPages,
  YellowPagesCatgory,
} from '../entities/yellow-pages.entity';
import { CreateYellowPagesInput } from './create-yellow-pages.input';

@InputType()
export class UpdateYellowPagesInput {
  @Field({ description: 'Yellow Pages name' , nullable:true})
  name?: string;

  @Field(() => Int, {
    description: 'Yellow Pages category',
    nullable: true,
  })
  category?: number;
}

@InputType()
export class UpdateYellowPagesAddressInput {
  @Field(() => Int, { description: 'District Type', nullable: true })
  district?: number;

  @Field(() => Int, { description: 'Province Type', nullable: true })
  province?: number;

  @Field(() => Int, { description: 'Yellow pages id', nullable: true })
  yellowpages?: number;
}

@InputType()
export class UpdateYellowPagesPhoneNumberInput {
  @Field({ description: 'Phone number', nullable: true })
  phone_number?: number;

  @Field({ description: '', nullable: true })
  is_emergency?: boolean;

  @Field(() => Int, { description: 'Yellow pages id', nullable: true })
  yellowpages?: number;
}

@InputType()
export class UpdateYellowPagesCategoryInput {
  @Field({ description: 'Yellow Pages name' })
  name?: string;
}
