import { toUpperCase } from "../app/Utils";


describe("Utils test suit", () => {

    it('should return uppercase', () => {
        const result = toUpperCase('abc');
        expect(result).toBe('ABC');
    })

    // or
    test('should return uppercase (second way to test)', () => {
        const result = toUpperCase('abc');
        expect(result).toBe('ABC');
    })
})