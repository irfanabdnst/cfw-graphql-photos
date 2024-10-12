import { builder } from '@/pothos/builder';

builder.queryField('ping', (t) => t.string({ resolve: () => 'Graphql is running' }));
