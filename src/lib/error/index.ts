import { builder } from '@/pothos/builder';
import { GraphQLError } from 'graphql';
import type { ZodFormattedError } from 'zod';

import { ErrorResponse, createError } from '@/lib/error/custom-error';

export const errorHandler = (err: unknown) => {
    if (err instanceof ErrorResponse) return err;

    if (err instanceof GraphQLError) {
        return createError.internalServerError(err.message);
    }

    if (err instanceof Error) {
        return createError.internalServerError(err.message);
    }

    return createError.internalServerError(undefined, err);
};

// Util for flattening zod errors into something easier to represent in your Schema.
export const flattenErrors = (
    error: ZodFormattedError<unknown>,
    path: string[],
): { path: string[]; message: string }[] => {
    const errors = error._errors.map((message) => ({
        path,
        message,
    }));

    const keys = Object.keys(error);
    for (const key in keys) {
        if (key !== '_errors') {
            errors.push(
                ...flattenErrors(
                    (error as Record<string, unknown>)[key] as ZodFormattedError<unknown>,
                    [...path, key],
                ),
            );
        }
    }

    return errors;
};

const ErrorMessage = builder.simpleObject('ErrorMessage', {
    fields: (t) => ({
        code: t.int(),
        name: t.string(),
        message: t.string(),
        details: t.field({ type: 'JSON', nullable: true }),
    }),
});

builder.objectType(ErrorResponse, {
    name: 'Error',
    fields: (t) => ({
        error: t.field({
            type: ErrorMessage,
            resolve: ({ code, name, message, details }) => ({ code, name, message, details }),
        }),
    }),
});
