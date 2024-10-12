import { DateResolver, DateTimeResolver, JSONResolver } from 'graphql-scalars';
import { z } from 'zod';

import { builder } from '@/pothos/builder';

import '@/lib/error';
import '@/schema/ping';

builder.queryType();

builder.addScalarType('DateTime', DateTimeResolver);
builder.addScalarType('Date', DateResolver);
builder.addScalarType('JSON', JSONResolver);

builder.scalarType('CUID2', {
    serialize: (c) => c,
    parseValue: (c) => z.string().cuid2().parse(c),
});

export const schema = builder.toSchema();
