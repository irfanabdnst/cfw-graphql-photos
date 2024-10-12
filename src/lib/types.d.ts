export type Env = {
    NODE_ENV: 'development' | 'production';
};

export type Context = Env;

export type SchemaType = {
    Context: Context;
    Scalars: {
        DateTime: { Output: Date; Input: Date };
        Date: { Output: Date; Input: Date };
        CUID2: { Output: string; Input: string };
        JSON: { Output: unknown; Input: unknown };
    };
};
