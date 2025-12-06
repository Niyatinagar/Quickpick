/**
 * UNIT TEST EXAMPLE
 * Tests individual functions in isolation
 * Standard: Test one function at a time with mocked dependencies
 */

describe('Unit Tests - Error Handler Utils', () => {

    test('should create error with status code', () => {
        const error = new Error('Test error');
        error.statusCode = 404;
        error.status = 'fail';

        expect(error.message).toBe('Test error');
        expect(error.statusCode).toBe(404);
        expect(error.status).toBe('fail');
    });

    test('should categorize 4xx as client errors', () => {
        const getErrorType = (code) => String(code).startsWith('4') ? 'client' : 'server';

        expect(getErrorType(400)).toBe('client');
        expect(getErrorType(404)).toBe('client');
        expect(getErrorType(500)).toBe('server');
    });
});

describe('Unit Tests - Response Formatter', () => {

    test('should format success response', () => {
        const formatSuccess = (data, message) => ({
            success: true,
            error: false,
            message,
            data
        });

        const result = formatSuccess({ id: 1 }, 'Success');

        expect(result.success).toBe(true);
        expect(result.error).toBe(false);
        expect(result.message).toBe('Success');
        expect(result.data).toEqual({ id: 1 });
    });
});
