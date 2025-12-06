/**
 * Standardized API response formatter
 * Ensures consistent response structure across all endpoints
 */

/**
 * Success response formatter
 * @param {Object} res - Express response object
 * @param {*} data - Response data
 * @param {string} message - Success message
 * @param {number} statusCode - HTTP status code (default: 200)
 * @returns {Object} Express response
 */
const successResponse = (res, data = null, message = 'Success', statusCode = 200) => {
    return res.status(statusCode).json({
        success: true,
        error: false,
        message,
        data
    });
};

/**
 * Error response formatter
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {*} errors - Additional error details (optional)
 * @returns {Object} Express response
 */
const errorResponse = (res, message = 'An error occurred', statusCode = 500, errors = null) => {
    const response = {
        success: false,
        error: true,
        message
    };

    if (errors) {
        response.errors = errors;
    }

    return res.status(statusCode).json(response);
};

/**
 * Paginated response formatter
 * @param {Object} res - Express response object
 * @param {Array} data - Array of items
 * @param {number} page - Current page number
 * @param {number} limit - Items per page
 * @param {number} totalCount - Total number of items
 * @param {string} message - Success message
 * @returns {Object} Express response
 */
const paginatedResponse = (res, data, page, limit, totalCount, message = 'Data retrieved successfully') => {
    return res.status(200).json({
        success: true,
        error: false,
        message,
        data,
        pagination: {
            page: parseInt(page),
            limit: parseInt(limit),
            totalCount,
            totalPages: Math.ceil(totalCount / limit),
            hasNextPage: page * limit < totalCount,
            hasPrevPage: page > 1
        }
    });
};

/**
 * Created resource response formatter
 * @param {Object} res - Express response object
 * @param {*} data - Created resource data
 * @param {string} message - Success message
 * @returns {Object} Express response
 */
const createdResponse = (res, data, message = 'Resource created successfully') => {
    return successResponse(res, data, message, 201);
};

/**
 * No content response formatter
 * @param {Object} res - Express response object
 * @returns {Object} Express response
 */
const noContentResponse = (res) => {
    return res.status(204).send();
};

export {
    successResponse,
    errorResponse,
    paginatedResponse,
    createdResponse,
    noContentResponse
};
