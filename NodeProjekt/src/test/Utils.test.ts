import {getStringInfo, stringInfo, StringUtils, toUpperCase} from "../app/Utils";


describe("Utils test suit", () => {

    describe.only("StringUtils tests", () => {

        let sut: StringUtils;
        beforeEach(() => {
            sut = new StringUtils();
        })

        it('should return correct upperCase', () => {
            const actual = sut.toUpperCase('abc');
            expect(actual).toEqual('ABC');
            console.log('Actual test');
        })

        it('should throw error oninvalid argument - arrow function', () => {
            expect(() => {
                sut.toUpperCase('');
            }).toThrow('Invalid argument!');
        })

        it('should throw error oninvalid argument - try catch block', (done) => {
            try {
                sut.toUpperCase('abc');
                done('GetStringInfo should throw error for invalid arg!');
            }catch (error) {
                expect(error).toBeInstanceOf(Error);
                expect(error).toHaveProperty('message', 'Invalid argument!');
                expect(error.message).toEqual('Invalid argument!');
            }
        })
    })





    // old method
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

    describe('ToUpperCase examples', () => {
        it.each([
            { input: 'abc', expected: 'ABC' },
            { input: 'My-String', expected: 'MY-STRING' },
            { input: 'def', expected: 'DEF' },
        ])('$input toUpperCase should be $expected', ({input, expected}) => {
            const actual = toUpperCase(input);
            expect(actual).toBe(expected);
        });
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