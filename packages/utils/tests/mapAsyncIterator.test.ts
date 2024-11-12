import { mapAsyncIterator } from '../src/mapAsyncIterator.js';

describe('mapAsyncIterator', () => {
  it('should invoke onNext callback, for each value, replace results and invoke onEnd only once', async () => {
    const onNext = jest.fn(() => 'replacer');
    const onEnd = jest.fn();
    const iter = mapAsyncIterator(
      (async function* () {
        yield 1;
        yield 2;
        yield 3;
      })(),
      onNext,
      () => {
        // noop onError
      },
      onEnd,
    );
    const onNextResults = [];
    for await (const result of iter) {
      onNextResults.push(result);
    }
    expect(onNext).toHaveBeenCalledTimes(3);
    expect(onNextResults).toEqual(['replacer', 'replacer', 'replacer']);
    expect(onEnd).toHaveBeenCalledTimes(1);
  });
});
