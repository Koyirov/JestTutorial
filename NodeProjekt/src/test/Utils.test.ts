import { toUpperCase } from "../app/Utils";


describe("Utils test suit", () => {

    it('should return uppercase of valid string', () => {
        // arrange
        const sut = toUpperCase;
        const expected = 'ABC';

        // act
        const actual = sut('abc');

        // assert
        expect(actual).toBe(expected);
    })

    // or
    test('should return uppercase (second way to test)', () => {
        const result = toUpperCase('abc');
        expect(result).toBe('ABC');
    })
})