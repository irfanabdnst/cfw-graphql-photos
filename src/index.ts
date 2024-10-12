import { createYoga } from 'graphql-yoga';

import type { Env } from '@/lib/types';
import { schema } from '@/schema';

const yoga = createYoga<Env>({
    schema,
    context: async ({ NODE_ENV }) => {
        return { NODE_ENV };
    },
});

export default { fetch: yoga.fetch };
