import { CurrencyLocalizedPipe } from './currency-localized.pipe';

describe('CurrencyLocalizedPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyLocalizedPipe();
    expect(pipe).toBeTruthy();
  });
});
