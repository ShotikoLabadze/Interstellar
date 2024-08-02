import { Test, TestingModule } from '@nestjs/testing';
import { ListenerService } from './listeners.service';

describe('ListenersService', () => {
  let service: ListenerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListenerService],
    }).compile();

    service = module.get<ListenerService>(ListenerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
