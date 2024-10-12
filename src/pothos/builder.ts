import SchemaBuilder from '@pothos/core';
import ErrorPlugin from '@pothos/plugin-errors';
import SimpleObjectsPlugin from '@pothos/plugin-simple-objects';
import TracingPlugin, { isRootField, wrapResolver } from '@pothos/plugin-tracing';
import ValidationPlugin from '@pothos/plugin-zod';

import { ErrorResponse, createError } from '@/lib/error/custom-error';
import type { SchemaType } from '@/lib/types';
import { roundUp } from '@/lib/utils';

export const builder = new SchemaBuilder<SchemaType>({
    plugins: [ErrorPlugin, SimpleObjectsPlugin, ValidationPlugin, TracingPlugin],
    errors: { defaultTypes: [ErrorResponse] },
    zod: {
        validationError: (err) => createError.unprocessableEntity('validationError', err.issues),
    },
    tracing: {
        default: (cfg) => isRootField(cfg),
        wrap: (resolver, _, cfg) => {
            return wrapResolver(resolver, (_, duration) => {
                console.log(
                    `${new Date()}: Executed resolver ${cfg.parentType}.${cfg.name} in ${roundUp(duration, 3)}ms`,
                );
            });
        },
    },
});
