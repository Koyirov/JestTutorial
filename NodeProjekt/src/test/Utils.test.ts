import { getStringInfo, stringInfo, toUpperCase } from "../app/Utils";


describe("Utils test suit", () => {

    test('should return uppercase (second way to test)', () => {
        const result = toUpperCase('abc');
        expect(result).toBe('ABC');
    })

    // or most popular
    it('should return uppercase of valid string', () => {
        // arrange
        const sut = toUpperCase;
        const expected = 'ABC';

        // act
        const actual = sut('abc');

        // assert
        expect(actual).toBe(expected);
    })

    describe('getStringInfo for argument My-String should', () => {

        let actual: stringInfo;
        beforeEach(() => {
            actual = getStringInfo('My-String');
        })

        it('return right length', () => {
            expect(actual.characters).toHaveLength(9);
            expect(actual.characters.length).toBe(9);
        })

        it('return right lower case', () => {
            expect(actual.lowerCase).toBe('my-string');
        })

        it('return right upper case', () => {
            expect(actual.upperCase).toBe('MY-STRING');
        })

        it('return defined right characters', () => {
            expect(actual.extraInfo).toBeDefined();
        })

        it('return right extra info case', () => {
            expect(actual.extraInfo).toEqual({});
            expect(actual.extraInfo).not.toBe(undefined);
            expect(actual.extraInfo).not.toBeUndefined();
            expect(actual.extraInfo).toBeTruthy();
        })
    })
})