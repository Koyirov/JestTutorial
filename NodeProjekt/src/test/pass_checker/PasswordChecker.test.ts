import { CheckResult, PasswordChecker, PasswordErrors } from "../../app/pass_checker/PasswordChecker";


describe('Password Checker test suits', () => {

    let sut: PasswordChecker;

    beforeEach(() => {
        sut = new PasswordChecker();
    })

    it('Password with less than 8 chars is invalid', () => {
        let actual: CheckResult = sut.checkPassword('123456');
        expect(actual.valid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.SHORT);
    })

    it('Password with more than 8 chars is okay', () => {
        let actual: CheckResult = sut.checkPassword('12345678Aa');
        expect(actual.valid).toBe(true);
        expect(actual.reasons).toHaveLength(0);
    })

    it('Password with no upper case letter is invalid', () => {
        let actual: CheckResult = sut.checkPassword('abcd');
        expect(actual.valid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.NO_UPPER_CASE);
    })

    it('Password with upper case letter is invalid', () => {
        let actual = sut.checkPassword('1234abcdA');
        expect(actual.reasons).not.toContain(PasswordErrors.NO_UPPER_CASE);
    })

    it('Password with no lower case letter is invalid', () => {
        let actual = sut.checkPassword('1234ABCD');
        expect(actual.valid).toBe(false);
        expect(actual.reasons).toContain(PasswordErrors.NO_LOWER_CASE);
    })

    it('Password with lower case letter is invalid', () => {
        let actual = sut.checkPassword('1234ABCDa');
        expect(actual.reasons).not.toContain(PasswordErrors.NO_LOWER_CASE);
    })

    it('Complex password is valid', () => {
        let actual = sut.checkPassword('1234ABCDdgdsgsd');
        expect(actual.reasons).toHaveLength(0);
        expect(actual.valid).toBe(true);
    })

    it('Admin password with no number is invalid', () => {
        let actual = sut.checkAdminPassword('ABCDdgdsgsd');
        expect(actual.reasons).toContain(PasswordErrors.NO_NUMBER);
        expect(actual.valid).toBe(false);
    })

    it('Admin password with number is invalid', () => {
        let actual = sut.checkAdminPassword('ABCDdgdsgsd7');
        expect(actual.reasons).not.toContain(PasswordErrors.NO_NUMBER);
    })
})