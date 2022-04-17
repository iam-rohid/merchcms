import { Test, TestingModule } from '@nestjs/testing';
import { SessionResolver } from './session.resolver';

describe('SessionResolver', () => {
  let resolver: SessionResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionResolver],
    }).compile();

    resolver = module.get<SessionResolver>(SessionResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
